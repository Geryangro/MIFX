/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useMemo, useReducer, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screen
import Login from './screens/login';
import HomeScreen from './screens/home';

import {AuthContext} from './utils/context';
import {initialState, loginReducer} from './utils/reducer';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (email, token) => {
        try {
          await AsyncStorage.setItem('usertoken', token);
          dispatch({type: 'LOGIN', email: email, token: token});
        } catch (err) {
          console.log(err);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('usertoken');
          dispatch({type: 'LOGOUT'});
        } catch (err) {
          console.log(err);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('usertoken');
      } catch (err) {
        console.log(err);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.token === null ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={() => ({
                header: () => null,
              })}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={() => ({
                header: () => null,
              })}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
