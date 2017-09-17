/*
 * @Author: Aevit
 * @Desc: tab
 * @Date: 2017-09-17 17:15:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 18:01:40
 */
'use strict'

import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import Home from './home'
import Me from './me'
import TabBarItem from './tabBarItem'

export const TabNav = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('../resources/images/tabbar/tabbar_home_0.png')}
          selectedImage={require('../resources/images/tabbar/tabbar_home_1.png')}
        />
      )
    })
  },
  Me: {
    screen: Me,
    navigationOptions: ({ navigation }) => ({
      title: '我',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('../resources/images/tabbar/tabbar_me_0.png')}
          selectedImage={require('../resources/images/tabbar/tabbar_me_1.png')}
        />
      )
    })
  }
}, {
  tabBarComponent: TabBarBottom,
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true
})
