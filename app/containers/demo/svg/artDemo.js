/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-28 16:14:25
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-14 17:10:43
 */
'use strict'
import {
  StyleSheet,
  View,
  Animated
} from 'react-native'
import React from 'react'
import Circle from './shapes/circle'
import Hook from './shapes/hook'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedHook = Animated.createAnimatedComponent(Hook)
const hookBoxSize = 100

export default class svg extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor (props) {
    super(props)
    this.state = {
      circleProgress: new Animated.Value(0),
      fristLineAnimation: new Animated.Value(0),
      secondLineAnimation: new Animated.Value(0)
    }
  }

  _getHookLinePath (index) {
    const half = hookBoxSize / 2
    const middlePoint = `${half - hookBoxSize / 8},${hookBoxSize - hookBoxSize / 8}`
    if (index === 0) {
      // 第一条线
      return this.state.fristLineAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [`M 0,${half} L 0,${half}`, `M 0,${half} L ${middlePoint}`]
      })
    }
    if (index === 1) {
      // 第二条线
      return this.state.secondLineAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [`M ${middlePoint} L ${middlePoint}`, `M ${middlePoint} L ${hookBoxSize},0`]
      })
    }
  }
  // ----- components
  render () {
    setTimeout(() => {
      // circle
      Animated.timing(this.state.circleProgress, {
        toValue: 1, // TODO: 超出 1 的要限制一下
        duration: 1500
      }).start()

      // hook
      Animated.sequence([
        Animated.timing(this.state.fristLineAnimation, {
          toValue: 1,
          duration: 750
        }),
        Animated.timing(this.state.secondLineAnimation, {
          toValue: 1,
          duration: 750
        })
      ]).start()
    }, 300)

    const strokeWidth = 2
    return (
      <View style={styles.outter}>
        <View style={styles.box}>
          <AnimatedCircle
            style={{ width: 200, height: 200, backgroundColor: '#d8d8d8' }}
            progress={this.state.circleProgress}
          />
          <AnimatedHook
            style={{ width: hookBoxSize + strokeWidth, height: hookBoxSize + strokeWidth, backgroundColor: '#d8d8d8', marginTop: 20 }}
            strokeColor={'black'}
            strokeWidth={strokeWidth}
            firstLinePath={this._getHookLinePath(0)}
            secondLinePath={this._getHookLinePath(1)}
          />
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
