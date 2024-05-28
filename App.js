import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Screens/StackNavigation/StackNavigator';

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
