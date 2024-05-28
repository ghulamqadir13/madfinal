import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import ContactScreen from './ContactScreen';
import AboutScreen from './AboutScreen';
import BookmarksScreen from './BookmarkScreen';
import HomeTabNavigator from '../TabNavigation/HomeTab';

const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation }) {
  const logout = () => {
    navigation.navigate('Login');
  };

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#D3D3D3' }} contentContainerStyle={{ backgroundColor: '#DDDDDD' }}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="BookMark" component={BookmarksScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;
