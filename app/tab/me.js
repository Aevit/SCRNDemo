/*
 * @Author: Aevit
 * @Desc: 个人中心 tab
 * @Date: 2017-09-17 17:15:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 18:01:49
 */
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Me extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Me: Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit app/index.js{'\n'}
        </Text>
        <Text style={styles.instructions}>
          iOS:{'\n'}
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu{'\n'}
          {'\n'}
          android:{'\n'}
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
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
