import React from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, Text} from 'react-native';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';
import {StatusBar} from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ImageBackground
        style={styles.img}
        source={require('./assets/cute-cat.jpg')}
      >
        <Icon style={styles.icon} name="bars" size={35} />
        <Text style={styles.text}>Cat stuff is here</Text>
      </ImageBackground>
      <List style={styles.list} />
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 200,
  },
  icon: {
    top: 8,
    left: 8,
    color: 'white',
  },
  text: {
    position: 'absolute',
    top: 16,
    backgroundColor: 'orange',
    fontSize: 36,
    color: 'black',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default App;
