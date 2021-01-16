import {StyleSheet, Platform, StatusBar} from 'react-native';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 8,
    marginBottom: 16,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'darkred',
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {width: 5, height: 5},
  },
  image: {
    flex: 2,
    height: 200,
    marginEnd: 8,
    borderRadius: 12,
  },
  textBox: {
    flex: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white',
  },
  text: {
    fontSize: 14,
  },
});
