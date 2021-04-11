import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UserSignUpScreen from './screens/UserSignUpScreen';
import { AppTabNavigator } from './components/AppTabNavigator'
import CustomSideBarMenu from './components/CustomSideBarMenu';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  UserSignUpScreen:{screen: UserSignUpScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);