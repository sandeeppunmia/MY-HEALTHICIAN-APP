import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BpScreen from '../screens/BpScreen';
import SugarScreen from '../screens/SugarScreen';

export const AppTabNavigator = createBottomTabNavigator({
    BpScreen : {
        screen: BpScreen,
       navigationOptions :{
          tabBarIcon : <Image source={require("../assets/bp.jpg")} style={{width:30, height:30}}/>,
          tabBarLabel : "Blood Screen",
        }
      }, 
      SugarScreen: {
        screen: SugarScreen,
       navigationOptions :{
          tabBarIcon : <Image source={require("../assets/sugar.jpg")} style={{width:30, height:30}}/>,
          tabBarLabel : "Sugar",
        }
      }
});