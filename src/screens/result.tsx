import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PieChart from 'react-native-pie-chart';

type ResultScreenProps = NativeStackScreenProps<StackParamList, 'Result'>;
const Result: FC<ResultScreenProps> = ({navigation, route}) => {
  const widthAndHeight = 250;
  const {correct, incorrect, skipped, total_marks, my_marks} = route.params;
  const series = [correct, incorrect, skipped];
  const sliceColor = ['#2ecc71', '#e74c3c', '#3498db'];
  return (
    <View className="flex-1 gap-y-5">
      {/* Header */}
      <View className="bg-red-400 h-16 flex-row items-center px-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcon name="arrow-back" size={25} />
        </TouchableOpacity>
        <View className=" px-5">
          <Text className="text-lg">Test Result</Text>
        </View>
      </View>
      {/* Body */}
      <View className="gap-y-3">
        <View className="gap">
          <Text className="text-2xl font-bold text-center">Your Score</Text>
          <PieChart
            style={{alignSelf: 'center'}}
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
          />
        </View>
        {/* Overview */}
        <View className="flex-row justify-center">
          <View className="p-3 border">
            <Text
              className={`${
                100 * (my_marks / total_marks) > 50
                  ? 'text-green-300'
                  : 'text-red-400'
              }`}>
              {my_marks}
            </Text>
          </View>
          <View className="p-3 border">
            <Text className="font-bold">{total_marks}</Text>
          </View>
        </View>
        <View className="px-5">
          <View className="flex-row justify-around bg-red-00 p-2 border">
            <Text className="font-bold">
              Correct (
              <View
                className="h-2 w-2 bg-green-400"
                style={{backgroundColor: '#2ecc71'}}></View>
              )
            </Text>
            <Text className="font-bold">
              Incorrect (
              <View
                className="h-2 w-2 bg-green-400"
                style={{backgroundColor: '#e74c3c'}}></View>
              )
            </Text>
            <Text className="font-bold">
              Skipped (
              <View
                className="h-2 w-2 bg-green-400"
                style={{backgroundColor: '#3498db'}}></View>
              )
            </Text>
          </View>
          <View className="flex-row justify-around p-3 border">
            <Text>{correct}</Text>
            <Text>{incorrect}</Text>
            <Text>{skipped}</Text>
          </View>
        </View>
      </View>
      {/* Bottom btns */}
      <View className="flex-row h-16 justify-around">
        <TouchableOpacity
          className="bg-red-400 w-40 items-center justify-center rounded"
          style={{elevation: 10}}>
          <MaterialIcon name="pageview" size={20} />
          <Text>Review Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{elevation: 10}}
          className="bg-red-400 w-40 items-center justify-center rounded"
          onPress={() => navigation.replace('Quiz')}>
          <MaterialIcon name="autorenew" size={20} />
          <Text>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({});
