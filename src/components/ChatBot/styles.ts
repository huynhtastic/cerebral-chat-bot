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
  chatHistory: { marginVertical: 16, paddingBottom: 16 },
  chatFooter: {
    flexDirection: 'row',
  },
  chatHeader: {
    flexDirection: 'row',
  },
  container: { padding: 16, flex: 1 },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { fontSize: 24, color: '#fff000' },
});
