import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Product as P} from '../screens/products';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Product = ({item}: {item: P}) => {
  return (
    <View
      className="flex-row border border-gray-200 h-36 mb-5 p-3 bg-white"
      style={{elevation: 5}}>
      <Image source={{uri: item?.imageUrl}} className="h-full w-1/4 rounded" />
      <View className="p-2 w-4/5 gap-2">
        <View>
          <Text className="text-black font-bold">{item?.name}</Text>
          <Text className="text-black font-light text-xs">
            {item?.description}
          </Text>
        </View>
        <Text className="text-red-500">${item?.price}</Text>
        <View className="flex-row">
          {[1, 1, 1, 1, 1].map((item, idx) => (
            <MaterialIcon key={idx} size={20} color={'black'} name="star" />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
