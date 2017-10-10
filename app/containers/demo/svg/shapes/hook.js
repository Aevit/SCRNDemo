/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-10-10 11:02:00
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-10 11:55:57
 */
'use strict'
/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-28 16:14:25
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-10 10:59:53
 */
'use strict'
import {
  View,
  ART
} from 'react-native'
import React from 'react'

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

  _isAPoint (pathStr) {
    if (!pathStr) {
      return false
    }
    let str = pathStr.replace(/M |L /gi, '')
    let arr = str.split(' ')
    return arr.length === 2 && arr[0] === arr[1]
  }

  render () {
    const strokeWidth = 2
    return (
      <View>
        <Surface width={this.props.width || 200} height={this.props.height || 200}>
          <Group>
            <Shape d={this.props.firstLinePath} stroke='#000000' strokeWidth={this._isAPoint(this.props.firstLinePath) ? 0 : strokeWidth} />
            <Shape d={this.props.secondLinePath} stroke='#000000' strokeWidth={this._isAPoint(this.props.secondLinePath) ? 0 : strokeWidth} />
          </Group>
        </Surface>
      </View>
    )
  }
}
