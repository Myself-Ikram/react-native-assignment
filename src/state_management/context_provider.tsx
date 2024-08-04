import React, {ReactDOM, ReactNode, useEffect, useState} from 'react';
import TaskContext from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Provider = ({children}: {children: ReactNode}) => {
  const [token, settoken] = useState('');
  const onLoad = async () => {
    const data = await AsyncStorage.getItem('token');
    if (data) {
      settoken(data);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        onLoad,
        token,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export default Provider;
