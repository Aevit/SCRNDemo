/*
 * @Author: Aevit
 * @Desc: draw a circle
 * @Date: 2017-10-10 11:01:10
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-10 15:07:41
 */
'use strict'
import {
  View,
  ART
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const { Surface, Shape, Group, Path } = ART

export default class Circle extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    length: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    progress: PropTypes.number, // 0 到 1
    startDegree: PropTypes.number // 从哪一个角度开始画圆（右边的点为 0 度，默认顺时针画圆，其它角度依次增加即可）
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
    progress: 0,
    startDegree: 270 // 默认从顶部开始画圆
  };

  circlePath (cx, cy, r, startDegree, endDegree) {
    let p = Path()
    p.path.push(0, cx, cy - r) // TODO: 需要根据 startDegree 来进行计算需要 move 到哪一个点，现在先固定为顶部的点
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1) // 第一个 4 是画弧（可查看 ./node_modules/react-native/Libraries/ART/RCTConvert+ART.m 里 “ + (CGPathRef)CGPath:(id)json ” 方法）
    return p
  }

  _getProgress () {
    const { progress } = this.props
    return Math.max(0, Math.min(1, progress))
  }

  render () {
    const size = Math.min(this.props.width || this.props.style.width, this.props.height || this.props.style.height) // get the min value
    const { strokeWidth, strokeColor, startDegree } = this.props
    const progress = this._getProgress()
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - strokeWidth / 2, startDegree, startDegree + 360 * progress)
    return (
      <View style={this.props.style}>
        <Surface width={this.props.width || this.props.style.width} height={this.props.height || this.props.style.height}>
          <Group>
            <Shape d={circlePath} stroke={strokeColor} strokeWidth={progress > 0 ? strokeWidth : 0} />
          </Group>
        </Surface>
      </View>
    )
  }
}
