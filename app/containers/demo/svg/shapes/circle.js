/*
 * @Author: Aevit
 * @Desc: draw a circle
 * @Date: 2017-10-10 11:01:10
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-10 11:03:22
 */
'use strict'
import {
  View,
  ART
} from 'react-native'
import React from 'react'

const { Surface, Shape, Group, Path } = ART

export default class Circle extends React.Component {
  circlePath (cx, cy, r, startDegree, endDegree) {
    let p = Path()
    p.path.push(0, cx, cy - r)
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1) // 第一个 4 是画弧（可查看 ./node_modules/react-native/Libraries/ART/RCTConvert+ART.m 里 “ + (CGPathRef)CGPath:(id)json ” 方法）
    return p
  }

  render () {
    const size = 200
    const strokeWidth = 2
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - strokeWidth / 2, 270, 270 + 360 * this.props.fill / 100)
    return (
      <View>
        <Surface width={this.props.width || 300} height={this.props.height || 300}>
          <Group>
            <Shape d={circlePath} stroke='#000000' strokeWidth={strokeWidth} />
          </Group>
        </Surface>
      </View>
    )
  }
}
