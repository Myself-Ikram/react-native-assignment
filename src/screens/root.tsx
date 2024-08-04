import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useContext, useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../state_management/context';
//   import Context from "../state_management/context";

type RootScreenProps = NativeStackScreenProps<StackParamList, 'Root'>;
const Root: FC<RootScreenProps> = ({navigation}) => {
  const {onLoad, token} = useContext(Context);
  const checkToken = async () => {
    const data = await AsyncStorage.getItem('token');
    if (data) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    onLoad();
    checkToken();
  }, [token]);
  return (
    <View>
      <Text>Root</Text>
    </View>
  );
};

export default Root;

const styles = StyleSheet.create({});
