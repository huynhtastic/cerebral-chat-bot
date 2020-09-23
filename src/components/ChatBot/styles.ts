import { StyleSheet } from 'react-native';

const iconDim = 48;

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eceff1' },
  botIcon: {
    width: iconDim,
    height: iconDim,
    borderRadius: iconDim / 2,
    marginRight: 8,
  },
  botName: {
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatHistory: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  chatFooter: {
    flexDirection: 'row',
  },
  chatHeader: {
    padding: 16,
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { fontSize: 24, color: '#fff000' },
  messageField: { paddingHorizontal: 16, flex: 1, backgroundColor: '#fce4ec' },
});
