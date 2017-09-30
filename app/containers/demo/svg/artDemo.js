/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-28 16:14:25
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-30 15:17:34
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
    p.path.push(0, cx + r, cy)
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1)
    return p
  }

  render () {
    const size = 100
    const storkeWidth = 2
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - storkeWidth / 2, 0, (360 * 0.9999) * this.props.fill / 100)
    return (
      <View>
        <Surface width={this.props.width || 100} height={this.props.height || 100}>
          <Group>
            <Shape d={circlePath} stroke='#000000' strokeWidth={3} />
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
      circleProgress: new Animated.Value(50)
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
