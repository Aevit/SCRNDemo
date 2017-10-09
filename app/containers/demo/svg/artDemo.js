/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-28 16:14:25
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-09 18:12:50
 */
'use strict'
import {
  StyleSheet,
  View,
  ART,
  Animated
} from 'react-native'
import React from 'react'
const { Surface, Shape, Group, Path } = ART

class Circle extends React.Component {
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

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default class svg extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor (props) {
    super(props)
    this.state = {
      circleProgress: new Animated.Value(0)
    }
  }

  // ----- components
  render () {
    setTimeout(() => {
      Animated.timing(this.state.circleProgress, {
        toValue: 100,
        duration: 300
      }).start()
    }, 1000)

    return (
      <View style={styles.outter}>
        <View style={styles.box}>
          <AnimatedCircle fill={this.state.circleProgress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
