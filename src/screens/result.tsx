import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useContext, useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../state_management/context';
//   import Context from "../state_management/context";

type ResultScreenProps = NativeStackScreenProps<StackParamList, 'Result'>;
const Result: FC<ResultScreenProps> = ({navigation, route}) => {
  console.log(route.params);
  console.log(route.params);

  return (
    <View>
      <Text>Result</Text>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({});
