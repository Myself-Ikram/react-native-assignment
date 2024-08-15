import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';
import {StackParamList} from '../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootScreenProps = NativeStackScreenProps<StackParamList, 'Home'>;

const Home: FC<RootScreenProps> = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center gap-5">
      <Text className="text-xl font-bold text-black">Pages</Text>
      <TouchableOpacity
        className="border border-orange-300 rounded p-3 w-1/2"
        onPress={() => navigation.navigate('Profile')}>
        <Text className=" text-orange-300">Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-orange-300 rounded p-3 w-1/2"
        onPress={() => navigation.navigate('Products')}>
        <Text className=" text-orange-300">Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-orange-300 rounded p-3 w-1/2"
        onPress={() => navigation.navigate('Quiz')}>
        <Text className=" text-orange-300">Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-orange-300 rounded p-3 w-1/2"
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          navigation.replace('Root');
        }}>
        <Text className=" text-orange-300">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
