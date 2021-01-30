import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  console.log('ili', isLoggedIn);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
        navigation.navigate('Home');
      } catch (error) {
        console.log('token check failed', error.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <LoginForm
              navigation={navigation}
              style={styles.smallSpace}
              titleStyle={styles.title}
              inputStyle={styles.input}
              buttonColor={'purple'}
            />
            <RegisterForm
              navigation={navigation}
              titleStyle={styles.title}
              inputStyle={styles.input}
              buttonColor={'purple'}
            />
            <StatusBar style="auto" backgroundColor="purple" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  smallSpace: {
    marginBottom: 30,
  },
  keyboard: {
    flex: 1,
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  inner: {
    padding: '16%',
  },
  title: {
    fontSize: 24,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
