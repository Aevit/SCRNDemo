/*
 * @Author: Aevit
 * @Desc: 引导页
 * @Date: 2017-09-17 17:15:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 20:40:51
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

export default class Guide extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Home: Welcome to React Native!
        </Text>
        <Button title={'push to login'} onPress={() => { Actions.push('Login', { 'name': 'SCRNDemo' }) }} />
        <Button title={'push to Register'} onPress={() => { Actions.push('Register', { 'name': 'SCRNDemo' }) }} />
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
