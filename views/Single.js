import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{file.title}</Text>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        style={styles.image}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 6,
    width: '90%',
    height: '80%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
