/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-28 16:14:25
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-10-10 11:52:11
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

  // ----- components
  render () {
    setTimeout(() => {
      // circle
      Animated.timing(this.state.circleProgress, {
        toValue: 100,
        duration: 300
      }).start()

      // hook
      Animated.sequence([
        Animated.timing(this.state.fristLineAnimation, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.secondLineAnimation, {
          toValue: 1,
          duration: 300
        })
      ]).start()
    }, 1000)

    const firstLinePath = this.state.fristLineAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['M 0,20 L 0,20', 'M 0,20 L 20,40']
    })
    const secondLinePath = this.state.secondLineAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['M 20,40 L 20,40', 'M 20,40 L 40,0']
    })
    return (
      <View style={styles.outter}>
        <View style={styles.box}>
          <AnimatedCircle fill={this.state.circleProgress} />
          <AnimatedHook firstLinePath={firstLinePath} secondLinePath={secondLinePath} />
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
