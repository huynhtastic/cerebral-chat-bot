import { StyleSheet } from 'react-native';

const iconDim = 48;

export default StyleSheet.create({
  botIcon: {
    width: iconDim,
    height: iconDim,
    borderRadius: iconDim / 2,
    marginRight: 8,
  },
  botName: {
    textAlignVertical: 'bottom',
  },
  chatFooter: {
    flexDirection: 'row',
  },
  chatHeader: {
    flexDirection: 'row',
  },
  container: { padding: 16 },
});
