import React, {useContext} from 'react';
import {View, Button, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {useLogin, useUser} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    checkUserAvailable,
    registerErrors,
    validateOnSend,
  } = useSignUpForm();
  const {postRegister} = useUser();
  const {postLogin} = useLogin();

  const doRegister = async () => {
    if (!validateOnSend()) {
      Alert.alert('Input validation failed');
      return;
    }
    delete inputs.confirmPassword;
    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);
      // do automatic login, store token, etc...
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (error) {
      console.log('registration error', error);
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <View>
        <FormTextInput
          autoCapitalize="none"
          placeholder="username"
          onChangeText={(txt) => handleInputChange('username', txt)}
          onEndEditing={(event) => {
            // console.log(event.nativeEvent.txt);
            checkUserAvailable(event);
            handleInputEnd('username', event.nativeEvent.text);
          }}
          errorMessage={registerErrors.username}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="password"
          onChangeText={(txt) => handleInputChange('password', txt)}
          onEndEditing={(event) =>
            handleInputEnd('password', event.nativeEvent.text)
          }
          secureTextEntry={true}
          errorMessage={registerErrors.password}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="confirm password"
          onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
          onEndEditing={(event) =>
            handleInputEnd('confirmPassword', event.nativeEvent.text)
          }
          secureTextEntry={true}
          errorMessage={registerErrors.confirmPassword}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="email"
          onChangeText={(txt) => handleInputChange('email', txt)}
          onEndEditing={(event) =>
            handleInputEnd('email', event.nativeEvent.text)
          }
          errorMessage={registerErrors.email}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="full name"
          onChangeText={(txt) => handleInputChange('full_name', txt)}
          onEndEditing={(event) =>
            handleInputEnd('full_name', event.nativeEvent.text)
          }
          errorMessage={registerErrors.full_name}
        />
        <Button title="Register!" onPress={doRegister} />
      </View>
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
