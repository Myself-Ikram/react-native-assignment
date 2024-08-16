import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Root from '../screens/root';
import Login from '../screens/login';
import Products from '../screens/products';
import Profile from '../screens/profile';
import Home from '../screens/home';
import Quiz from '../screens/quiz';
import Result from '../screens/result';

// Navigations and there types
export type StackParamList = {
  Root: undefined;
  Login: undefined;
  Home: undefined;
  Products: undefined;
  Profile: undefined;
  Quiz: undefined;
  Result: {
    total_marks: number;
    my_marks: number;
    correct: number;
    incorrect: number;
    skipped: number;
  };
};

const Navigations = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
