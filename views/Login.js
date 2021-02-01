import React, {useContext, useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, Text, Button} from 'react-native-elements';
// import {ScrollView} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
      enabled
    >
      <View style={styles.appTitle}>
        <Text h4>MyApp</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.text}>
          {formToggle ? 'No account ?' : 'Already registered?'}
        </Text>
        <Button
          title={formToggle ? 'Register' : 'Login'}
          onPress={() => {
            setFormToggle(!formToggle);
          }}
        />
        {formToggle ? (
          <Card>
            <Card.Title h5>Login</Card.Title>
            <Card.Divider />
            <LoginForm navigation={navigation} />
          </Card>
        ) : (
          <Card>
            <Card.Title h5>Register</Card.Title>
            <Card.Divider />
            <RegisterForm navigation={navigation} />
          </Card>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 6,
  },
  text: {
    alignSelf: 'center',
    padding: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
