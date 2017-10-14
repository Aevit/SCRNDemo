/*
 * @Author: Aevit
 * @Desc: draw a hook
 * @Date: 2017-10-10 11:02:00
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-14 17:12:03
 */
'use strict'
import {
  View,
  ART
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const { Surface, Shape, Group } = ART
// const { Surface, Shape, Group, Path } = ART

export default class Hook extends React.Component {
  /*
  hookPath (startAnimation) {
    let p = Path()
    if (!startAnimation) {
      p.path.push(0, 0, 20)
      return Path()
    }
    p.path.push(0, 0, 20)
    p.path.push(2, 20, 40)
    p.path.push(2, 40, 0)
    return p
  }
  */

  static propTypes = {
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    firstLinePath: PropTypes.string,
    secondLinePath: PropTypes.string
  };

  static defaultProps = {
    style: {
      width: 0,
      height: 0
    },
    width: 0,
    height: 0,
    strokeColor: 'black',
    strokeWidth: 2,
    firstLinePath: undefined,
    secondLinePath: undefined
  };

  _isSinglePoint (pathStr) {
    if (!pathStr) {
      return false
    }
    let str = pathStr.replace(/M |L /gi, '')
    let arr = str.split(' ')
    return arr.length === 2 && arr[0] === arr[1]
  }

  render () {
    const { strokeColor, strokeWidth, firstLinePath, secondLinePath } = this.props
    return (
      <View style={this.props.style} pointerEvents={this.props.pointerEvents || 'auto'}>
        <Surface width={this.props.width || this.props.style.width} height={this.props.height || this.props.style.height}>
          <Group>
            <Shape d={firstLinePath} stroke={strokeColor} strokeWidth={this._isSinglePoint(firstLinePath) ? 0 : strokeWidth} />
            <Shape d={secondLinePath} stroke={strokeColor} strokeWidth={this._isSinglePoint(secondLinePath) ? 0 : strokeWidth} />
          </Group>
        </Surface>
      </View>
    )
  }
}
