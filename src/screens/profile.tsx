import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/navigation';
import {SERVER} from '../../config';
import Context from '../state_management/context';
import {Dropdown} from 'react-native-element-dropdown';

type RootScreenProps = NativeStackScreenProps<StackParamList, 'Profile'>;

const countryDropdown = [
  {label: 'India', value: 'India'},
  {label: 'China', value: 'China'},
  {label: 'America', value: 'America'},
];
const Profile: FC<RootScreenProps> = ({navigation}) => {
  const {token} = useContext(Context);
  const [user, setUser] = useState({
    name: '',
    email: '',
    pincode: '',
    city: '',
    country: '',
    id: '',
  });
  const getUser = async () => {
    await fetch(`${SERVER}/api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = (key: string, val: string) => {
    setUser({...user, [key]: val});
  };
  const handleUpdate = async () => {
    await fetch(`${SERVER}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        Alert.alert('Successfully updated!');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Failed to update!');
      });
  };
  return (
    <View className="flex-1">
      <View className="bg-red-400 h-1/5">
        {/* Header */}
        <View className="p-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCIcon name="arrow-left" size={25} />
          </TouchableOpacity>
          <Text className="font-bold text-lg">Edit Profile</Text>
          <TouchableOpacity>
            <MaterialCIcon name="share-variant" size={25} />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <View
          className=" items-center mt-5 bg-white self-center p-2 rounded-full"
          style={{height: 130, width: 130}}>
          <Image
            source={require('../../assets/profile.png')}
            style={{height: 100, width: 100}}
          />
        </View>
      </View>
      {/* form */}
      <ScrollView className="px-10 gap-5 mt-10">
        <View className="">
          <Text className="text-black font-bold">Username</Text>
          <TextInput
            className="border border-gray-400 rounded-xl text-black px-2"
            value={user?.name}
            onChangeText={txt => handleChange('name', txt)}
          />
        </View>
        <View className="">
          <Text className="text-black font-bold">Email I'd</Text>
          <TextInput
            className="border border-gray-400 rounded-xl  text-black px-2"
            value={user?.email}
            onChangeText={txt => handleChange('email', txt)}
          />
        </View>
        <View className="">
          <Text className="text-black font-bold">PinCode</Text>
          <TextInput
            className="border border-gray-400 rounded-xl text-black  px-2"
            value={String(user?.pincode)}
            onChangeText={txt => handleChange('pincode', txt)}
          />
        </View>
        <View className="">
          <Text className="text-black font-bold">City</Text>
          <TextInput
            className="border border-gray-400 rounded-xl  text-black px-2"
            value={user?.city}
            onChangeText={txt => handleChange('city', txt)}
          />
        </View>
        <View className="">
          <Text className="text-black font-bold">Country</Text>
          {/* <TextInput
            className="border border-gray-400 rounded-xl  text-black px-2"
            value={user?.country}
            onChangeText={txt => handleChange('country', txt)}
          /> */}
          <View className="p-3 border border-gray-400 rounded-xl">
            <Dropdown
              selectedTextStyle={{color: 'black'}}
              data={countryDropdown}
              labelField="label"
              valueField="value"
              value={countryDropdown.find(i => i?.value === user?.country)}
              onChange={item => handleChange('country', item?.value)}
              renderItem={item => (
                <View className="p-2">
                  <Text>{item?.value}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      {/* button */}
      {user?.email !== '' && (
        <View className="mt-5 p-5">
          <TouchableOpacity
            className="bg-black px-5 py-3 rounded-xl items-center"
            onPress={handleUpdate}>
            <Text className="text-lg text-white font-bold">Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
