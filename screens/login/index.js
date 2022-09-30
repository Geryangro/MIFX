/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import {AuthContext} from '../../utils/context';

const baseUrl = 'https://fe.dev.dxtr.asia/api';

const Login = () => {
  const [email, setEmail] = useState('user@test.io');
  const [password, setPassword] = useState('Test123.');
  const [isLoading, setIsLoading] = useState(false);
  const {signIn} = useContext(AuthContext);

  const onChangeNameHandler = paramsEmail => {
    setEmail(paramsEmail);
  };

  const onChangeEmailHandler = paramsPassword => {
    setPassword(paramsPassword);
  };

  const onSubmitFormHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      signIn(response.data.name, response.data.token);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('An error has occurred');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.wrapper}>
          {isLoading ? (
            <Text style={styles.formHeading}> Creating resource </Text>
          ) : (
            <Text style={styles.formHeading}>Login</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={onChangeNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={password}
            editable={!isLoading}
            onChangeText={onChangeEmailHandler}
          />
        </View>
        <View>
          <Button
            title="Submit"
            onPress={onSubmitFormHandler}
            style={styles.submitButton}
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252526',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHeading: {
    color: '#ffffff',
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    minWidth: 200,
    textAlignVertical: 'center',
    paddingLeft: 10,
    borderRadius: 20,
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: 'gray',
    padding: 100,
  },
});

export default Login;
