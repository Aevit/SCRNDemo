/*
 * @Author: Aevit
 * @Desc: 导栏航添加多个按钮
 * @Date: 2017-09-17 17:15:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-18 14:43:04
 */
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import Actions from '@nav/actions'

export default class MultiNavBtn extends Component {
  _refreshRightBtn () {
    const origin = Actions.getParams(this.props.navigation)
    origin.headerRight[0].title = 'new'
    Actions.refresh(this.props.navigation, { headerRight: origin.headerRight })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Home: Welcome to React Native!
        </Text>
        <Button title={'pop'} onPress={() => { Actions.pop() }} />
        <Button title={'refresh title'} onPress={() => { Actions.refresh(this.props.navigation, { title: 'new title' }) }} />
        <Button title={'refresh right0 title'} onPress={() => { this._refreshRightBtn() }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
