import React, {createContext, useState} from 'react';

const Context = createContext({
  token: '',
  onLoad: () => {},
});

export default Context;
