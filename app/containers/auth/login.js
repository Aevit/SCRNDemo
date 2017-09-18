/*
 * @Author: Aevit
 * @Desc: 登录页面
 * @Date: 2017-09-17 18:13:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 18:14:49
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

export default class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Login Page
        </Text>
        <Button title={'push to login'} onPress={() => { Actions.push('Login') }} />
        <Button title={'pop to top'} onPress={() => { Actions.popToTop() }} />
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
  }
})
