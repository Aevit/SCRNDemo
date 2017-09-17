/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-17 17:41:47
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 17:52:31
 */
'use strict'

import React, { Component } from 'react'
import { Image } from 'react-native'

export default class TabBarItem extends Component {
  render () {
    return (
      <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
        style={{ tintColor: this.props.tintColor }}
      />
    )
  }
}
