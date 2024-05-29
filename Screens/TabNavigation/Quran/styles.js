// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', 
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white', 
    marginRight: 15,
  },
  surahDetails: {
    flex: 1,
    paddingRight: 10,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white', 
  },
  englishName: {
    fontSize: 16,
    color: 'white', 
    marginTop: 5,
    marginLeft: 110,
  },
});
