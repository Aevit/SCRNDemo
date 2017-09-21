/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-19 10:41:24
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-21 16:15:36
 */
'use strict'
/**
* switchScroll.js
*
* @des scrollview 及 webview 上下切换
* @author Aevit
* Created at 2017/09/19
* Copyright 2011-2017 touna.cn, Inc.
*/
'use strict'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Platform
} from 'react-native'
import React from 'react'
import { SCStyle } from '@common/styles'
import SCWebView from '../SCWebView'

const onePartHeight = SCStyle.contentHeight

class switchScroll extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {
      moveValue: new Animated.Value(0)
    }
  }

  // ----- life cycle
  componentWillMount () {}

  componentDidMount () {}

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  componentWillReceiveProps (nextProps) {}

  componentWillUpdate () {}

  componentDidUpdate () {}

  componentWillUnmount () {}

  // ----- public methods

  // ----- private methods
  _renderWebView (passScrollTopToWebView) {
    return (
      <SCWebView
        style={styles.webView}
        url={'https://www.baidu.com'}
        /* source={{ uri: 'https://www.baidu.com' }} */
        autoHeight={!passScrollTopToWebView}
        scrollToTop={
          passScrollTopToWebView
          ? () => {
            Animated.timing(this.state.moveValue, {
              toValue: 0
            }).start()
          }
          : null
        }
      />
    )
  }

  // ----- components
  render () {
    return (
      <Animated.View style={{ height: onePartHeight * 2, transform: [{ translateY: this.state.moveValue }] }}>
        <ScrollView
          style={styles.scrollView}
          onScrollEndDrag={(e) => {
            const contentSizeH = e.nativeEvent.contentSize.height
            const offsetY = e.nativeEvent.contentOffset.y
            if (offsetY - (contentSizeH - onePartHeight) >= (Platform.OS === 'ios' ? 60 : -1)) {
              Animated.timing(this.state.moveValue, {
                toValue: -onePartHeight
              }).start()
            }
          }}
        >
          <View style={styles.scrollContentBox}>
            <Text>scrollView's top</Text>
            <Text>scrollView's center</Text>
            <Text>scrollView's bottom (has paddingBottom down here)</Text>
          </View>
        </ScrollView>
        {
          Platform.OS === 'android' && Platform.Version < 21 // 21 为 5.0 系统
            ? <ScrollView style={styles.scrollView}
              onScrollEndDrag={(e) => {
                const offsetY = e.nativeEvent.contentOffset.y
                if (offsetY <= 0) {
                  Animated.timing(this.state.moveValue, {
                    toValue: 0
                  }).start()
                }
              }}>
              { this._renderWebView(false) }
            </ScrollView>
            : this._renderWebView(true)
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: onePartHeight
  },
  scrollContentBox: {
    width: SCStyle.width,
    minHeight: onePartHeight,
    height: onePartHeight + 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 100
  },
  webView: {
    // height: onePartHeight
  }
})

export default switchScroll
