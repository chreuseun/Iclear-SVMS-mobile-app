import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MyAvatar from './Screens/MyAvatar';
import Violation from './Screens/Violation';
import Clearance from './Screens/Clearance';
import ClassClearance from './Screens/ClassClearance';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName="MyAvatar">
      <Drawer.Screen name="MyAvatar" component={MyAvatar} />
      <Drawer.Screen name="Clearance" component={Clearance} />
      <Drawer.Screen name="Violation" component={Violation} />
      <Drawer.Screen name="ClassClearance" component={ClassClearance} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
