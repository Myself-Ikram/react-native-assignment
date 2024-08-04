import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER} from '../../config';
import {StackParamList} from '../navigation/navigation';

type RootScreenProps = NativeStackScreenProps<StackParamList, 'Login'>;

const Login: FC<RootScreenProps> = ({navigation}) => {
  const [cred, setCred] = useState({
    email: '',
    password: '',
    hide: true,
  });
  const handleChange = (key: string, value: string) => {
    setCred({...cred, [key]: value});
  };

  const handleSubmit = async () => {
    await fetch(`${SERVER}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: cred.email.trim(),
        password: cred.password.trim(),
      }),
    })
      .then(res => res.json())
      .then(async data => {
        if (data?.token) {
          await AsyncStorage.setItem('token', data?.token);
          navigation.replace('Home');
        } else {
          Alert.alert('Invalid Credentials!');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Try Again!');
      });
  };
  return (
    <View className="flex-1 bg-white">
      {/* Image */}
      <View className="h-2/5 justify-center items-center">
        <Image
          className=" h-5/6 w-5/6"
          source={require('../../assets/image.png')}
        />
      </View>
      {/* Login */}
      <View className="h-3/5">
        <View className="p-10 gap-5">
          {/* Email */}
          <View className="bg-gray-100 px-5">
            <TextInput
              placeholder="Enter email"
              placeholderTextColor={'black'}
              className="rounded text-black"
              onChangeText={txt => handleChange('email', txt)}
            />
          </View>
          {/* Password */}
          <View className="bg-gray-100 flex-row items-center justify-between px-5">
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={'black'}
              className="rounded text-black"
              secureTextEntry={!cred.hide}
              onChangeText={txt => handleChange('password', txt)}
            />
            <TouchableOpacity
              onPress={() => setCred({...cred, hide: !cred.hide})}>
              <MaterialCIcon
                name={cred.hide ? 'eye' : 'eye-off'}
                size={20}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          {/* Forgot */}
          <TouchableOpacity>
            <Text className=" text-blue-400 self-end">Forgot Password?</Text>
          </TouchableOpacity>
          {/* Button */}
          <TouchableOpacity
            disabled={cred.email === '' || cred.password === ''}
            className={` bg-orange-300 p-4 rounded items-center ${
              (cred.email === '' || cred.password === '') && 'opacity-40'
            }`}
            onPress={handleSubmit}>
            <Text className="font-bold">Login</Text>
          </TouchableOpacity>
          {/* Other btns */}
          <View className="flex-row justify-around">
            {['facebook', 'apple', 'google'].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                className="border border-orange-300 rounded p-3">
                <MaterialCIcon name={item} color={'orange'} size={30} />
              </TouchableOpacity>
            ))}
          </View>
          {/* Account */}
          <View className="flex-row items-center justify-center">
            <Text className=" text-black">Don't have an account?</Text>
            <TouchableOpacity>
              <Text className="text-orange-300"> Register Now!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
