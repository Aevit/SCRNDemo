/*
 * @Author: Aevit
 * @Desc: WebView 封装
 * @Date: 2017-09-19 16:17:50
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-20 18:07:47
 */
'use strict'

import {
  StyleSheet,
  View,
  WebView
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

class SCWebView extends React.Component {
  static propTypes = {
    url: PropTypes.string, // 网页链接
    boxStyle: PropTypes.object, // 最外层容器的样式（webview 样式使用 this.props.style）
    scrollToTop: PropTypes.func, // webview 在顶部继续向下拖动一定距离时的响应方法
    autoHeight: PropTypes.bool // 是否根据内容动态调整 webview 高度
  }

  static defaultProps = {
    url: '',
    boxStyle: null,
    style: { height: 0 },
    scrollToTop: null,
    autoHeight: false
  }

  constructor (props) {
    super(props)
    this.state = {
      webViewHeight: 0
    }
  }

  // ----- life cycle
  componentWillMount () { }

  componentDidMount () { }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  componentWillReceiveProps (nextProps) { }

  componentWillUpdate () { }

  componentDidUpdate () { }

  componentWillUnmount () { }

  // ----- public methods

  // ----- private methods
  _onMessage (event) {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      if (!data.type) {
        return
      }
      const params = data.params
      switch (data.type) {
        case 'scrollToTop':
          if (this.props.scrollToTop) {
            this.props.scrollToTop()
          }
          break
        case 'changeWebviewHeight':
          this.setState({
            webViewHeight: params.height
          })
          break
        default:
          break
      }
    } catch (error) {
      console.warn('webview onMessage error: ' + error.message)
    }
  }

  _injectScrollToTopJS () {
    if (!this.props.scrollToTop) {
      return ''
    }
    const onScrollToTopFunc = function () {
      var sysVersion = -1
      var _userAgent = navigator.userAgent
      if (/iPad|iPhone|iPod/.test(_userAgent) && !window.MSStream) {
        sysVersion = 0 // iOS
      } else {
        var match = _userAgent.toLowerCase().match(/android\s([0-9\\.]*)/)
        sysVersion = match ? parseFloat(match[1]) : -1
      }
      var good = !!((sysVersion === 0 || (sysVersion !== -1 && sysVersion >= 5.0)))
      if (good) {
        // 只监听 iOS 以及 android 5.0+系统（因为 android 4.x 系统的 touchmove 事件不能实时监听）
        var count = 0
        window.addEventListener('touchstart', function (event) {
          count = 0
        }, false)
        window.addEventListener('touchmove', function (event) {
          // console.log(document.body.scrollTop)
          document.body.scrollTop > 0 ? count = 0 : count++
        }, false)
        window.addEventListener('touchend', function (event) {
          if (count >= 10) {
            const action = { type: 'scrollToTop' }
            window.postMessage(JSON.stringify(action))
          }
          count = 0
        }, false)
      }
    }
    const str = '(' + String(onScrollToTopFunc) + ')();'
    return str
  }

  _injectAutoHeightJS () {
    if (!this.props.autoHeight) {
      return ''
    }
    const getHeightFunc = function () {
      let height = 0
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        height = document.documentElement.clientHeight
      } else {
        height = document.body.clientHeight
      }
      var action = { type: 'changeWebviewHeight', params: { height: height } }
      window.postMessage(JSON.stringify(action))
    }
    const str = '(' + String(getHeightFunc) + ')();'
    return str
  }

  _injectPostMsgJS () {
    // 不加这段在 iOS 上点击一些网页会报错
    const patchPostMessageFunc = function () {
      var originalPostMessage = window.postMessage
      var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
      }
      patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
      }
      window.postMessage = patchedPostMessage
    }
    const str = '(' + String(patchPostMessageFunc) + ')();'
    return str
  }

  _injectJSString () {
    var str = this._injectPostMsgJS()
    if (this.props.scrollToTop) {
      str += this._injectScrollToTopJS()
    }
    if (this.props.autoHeight) {
      str += this._injectAutoHeightJS()
    }
    return str
  }

  // ----- components
  render () {
    const jsCode = this._injectJSString()
    return (
      <View style={[styles.box, this.props.boxStyle]}>
        <WebView
          ref={web => (this._webView = web)}
          style={[styles.webView, this.props.style, { height: this.props.autoHeight ? this.state.webViewHeight : this.props.style.height }]}
          source={this.props.source || { uri: this.props.url }}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode={'always'}
          scalesPageToFit
          injectedJavaScript={(jsCode)}
          onMessage={(event) => this._onMessage(event)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1
  },
  webView: {
    flex: 1
  }
})

export default SCWebView
