import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackParamList} from '../navigation/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SERVER} from '../../config';
import Context from '../state_management/context';

type RootScreenProps = NativeStackScreenProps<StackParamList, 'Products'>;

export type Product = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

const Products: FC<RootScreenProps> = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const {token} = useContext(Context);
  const getProducts = async () => {
    await fetch(`${SERVER}/api/product?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProducts();
  }, [pageNumber]);
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View>
        <View className=" h-20 px-3 flex-row items-center justify-between">
          <View className="flex-row gap-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcon
                name="keyboard-arrow-left"
                color={'black'}
                size={33}
              />
            </TouchableOpacity>
            <Text className="text-black text-2xl font-light">MAGENATIVE</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcon name="headphones" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Search */}
      <View className="mx-2 bg-gray-100 flex-row rounded">
        <TextInput
          placeholder="Search"
          placeholderTextColor={'black'}
          className="w-5/6 px-2 "
        />
        <TouchableOpacity className="w-1/6 items-center justify-center border border-slate-300">
          <MaterialIcon name="search" size={20} />
        </TouchableOpacity>
      </View>
      {/* Filters */}
      <View className="flex-row p-2">
        <TouchableOpacity className="w-2/5 flex-row items-center justify-center">
          <MaterialIcon name="filter-list" size={20} />
          <Text className="text-lg">FILTERS</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-2/5  flex-row items-center justify-center">
          <MaterialIcon name="keyboard-double-arrow-up" size={20} />
          <Text className="text-lg">SORT BY</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-1/5 items-center justify-center">
          <MaterialIcon name="grid-view" size={25} />
        </TouchableOpacity>
      </View>
      {/* List View */}
      {products?.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-bold">No data</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item?.name}
          className="p-2"
          renderItem={({item}) => (
            <View
              className="flex-row border border-gray-200 h-36 mb-5 p-3 bg-white"
              style={{elevation: 5}}>
              <Image
                source={{uri: item?.imageUrl}}
                className="h-full w-1/4 rounded"
              />
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
                    <MaterialIcon
                      key={idx}
                      size={20}
                      color={'black'}
                      name="star"
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        />
      )}
      {/* Pagination */}
      <View className="flex-row">
        <TouchableOpacity
          disabled={pageNumber === 1}
          className={`border border-gray-300 w-1/2 p-5 items-center  ${
            pageNumber === 1 && 'opacity-25'
          }`}
          onPress={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}>
          <Text className="text-black">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={products?.length === 0}
          className={`w-1/2 border border-gray-300 p-5 items-center ${
            products?.length === 0 && 'opacity-25'
          }`}
          onPress={() => setPageNumber(pageNumber + 1)}>
          <Text className="text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
