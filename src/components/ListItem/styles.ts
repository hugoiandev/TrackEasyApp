import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffed24',
    paddingVertical: 15,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImg: {
    marginHorizontal: 15,
    height: 70,
    width: 70,
  },
  listText: {
    fontSize: 20,
    color: '#1054DC',
  },
  trackCodeText: {
    fontSize: 16,
  },
  statusText: {
    marginTop: 5,
    fontSize: 18,
  },
  locationText: {
    fontSize: 16,
    marginTop: 5,
    color: '#1054DC',
  },
});

export default styles;
