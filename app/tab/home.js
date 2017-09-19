/*
 * @Author: Aevit
 * @Desc: 首页 tab
 * @Date: 2017-09-17 17:15:48
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-19 17:34:59
 */
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Button
} from 'react-native'
import Actions from '@nav/actions'

export default class Home extends Component {
  _gotoMultiNavBtnPage () {
    // const back = { btnStyle: {}, source: require('SCRNDemo/app/resources/images/back_icon_1.png'), imgStyle: { width: 24, height: 20 }, onPress: () => { Actions.pop() } }
    const back = 'back'
    const leftBtns = [back, {
      btnStyle: {},
      isText: true,
      title: 'left',
      textStyle: { color: 'black' },
      onPress: () => { alert('left') } // eslint-disable-line
    }]
    const rightBtns = [{
      isText: true,
      title: 'right0',
      textStyle: { color: 'black' },
      onPress: () => { alert('right_0') } // eslint-disable-line
    }, {
      isText: true,
      title: 'right1',
      textStyle: { color: 'black' },
      onPress: () => { alert('right_1') } // eslint-disable-line
    }]
    Actions.push('MultiNavBtn', { headerLeft: leftBtns, headerRight: rightBtns })
  }

  render () {
    return (
      <View style={styles.container}>
        <Button title={'push to login'} onPress={() => { Actions.push('Login') }} />
        <Button title={'push to Register'} onPress={() => { Actions.push('Register') }} />
        <Button title={'push to Guide'} onPress={() => { Actions.push('Guide', { 'name': 'SCRNDemo' }) }} />
        <Button title={'push to MultiNavBtn'} onPress={() => { this._gotoMultiNavBtnPage() }} />
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
