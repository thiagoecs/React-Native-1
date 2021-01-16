import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../utils/GlobalStyles';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={GlobalStyles.item}>
      <Image
        style={GlobalStyles.image}
        source={{uri: singleMedia.thumbnails.w160}}
      />
      <View style={GlobalStyles.textBox}>
        <Text style={GlobalStyles.title}>{singleMedia.title}</Text>
        <Text style={GlobalStyles.text}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
