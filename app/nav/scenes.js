/*
 * @Author: Aevit
 * @Desc: 导航控制器
 * @Date: 2017-09-17 18:05:35
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-29 10:58:22
 */
'use strict'

import React, { Component } from 'React'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Actions from '@nav/actions'
import { Tab } from '../tab'
import Login from '../containers/auth/login'
import Register from '../containers/auth/register'
import Guide from '../containers/guide'
import MultiNavBtn from '../containers/demo/multiNavBtn'
import SCWebView from '../containers/SCWebView'
import SwitchScroll from '../containers/demo/switchScroll'
import ArtDemo from '../containers/demo/svg/artDemo'

const DEFAULT_BACK_ICON = require('SCRNDemo/app/resources/images/back_icon_1.png')

export const Nav = StackNavigator(
  {
    Tab: {
      screen: Tab,
      navigationOptions: ({ navigation, screenProps }) => {
        Actions.init(navigation) // 将 navigation 传给 Action，让 Action 里面可以进行跳转等操作
        return {}
      }
    },
    Login: {
      screen: customNav(Login),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, 'Login') }
      }
    },
    Register: {
      screen: customNav(Register),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, 'Register') }
      }
    },
    Guide: {
      screen: customNav(Guide),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, `${params.name} Guide`) }
      }
    },
    MultiNavBtn: {
      screen: customNav(MultiNavBtn),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, 'MultiNavBtn'), headerLeft: params && params.headerLeft ? setupNavigaionBtns(params.headerLeft, false) : null, headerRight: params && params.headerRight ? setupNavigaionBtns(params.headerRight, true) : null }
      }
    },
    SCWebView: {
      screen: customNav(SCWebView),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, '') }
      }
    },
    SwitchScroll: {
      screen: customNav(SwitchScroll),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, 'SwitchScroll') }
      }
    },
    ArtDemo: {
      screen: customNav(ArtDemo),
      navigationOptions: ({ navigation, screenProps }) => {
        const params = getParams(navigation)
        return { title: getTitle(params, 'Svg') }
      }
    }
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
      swipeEnabled: false,
      animationEnabled: false
    },
    mode: 'card'
  }
)

function customNav (OriginComponent) {
  return class extends Component {
    render () {
      // this.props.navigation.state.key = OriginComponent.name
      const params = this.props.navigation ? this.props.navigation.state.params : {}
      return (<OriginComponent {...this.props} {...params} />)
    }
  }
}

/**
 * 获取外部传进来的参数
 *
 * @param {any} nav 当前 navigation
 * @returns 参数
 */
function getParams (nav) {
  if (!nav) {
    return {}
  }
  return nav.state.params
}

function getTitle (params, defaultTitle = '') {
  return (params && params.title !== undefined) ? params.title : defaultTitle
}

/**
  * 左边按钮（默认为一个返回箭头图片，默认点击为返回，可设置 isText 为 true 改为文字按钮）
  * 在 Actions 里添加 leftInfos 属性，leftInfos 可为 object {}: 只会生成一个按钮，或数组 [{}, {}]: 会生成多个按钮
  * leftInfos 内可使用以下 key 值：
  * @param onPress 按钮响应事件（图片或文字按钮都用这个），可不填，默认为 Actions.pop()
  * @param btnStyle 按钮样式，可不填（不填则使用默认样式）

  * @param isText bool, 是否文字按钮，默认为 false（默认为返回箭头），这个为 true 的话，上面的 imgStyle、source 不生效
  * @param title 按钮文字，不可为空
  * @param textStyle 按钮样式，可不填，默认会添加 {fontSize:16,color:'#ffffff'}

  * @param source 图片资源，可不填，默认为 DEFAULT_BACK_ICON
  * @param imgStyle 图片按钮样式，可不填，默认会添加 {width:20,height:20}

  *
  * 使用示例：
    const btns = [
      'back',
      {
      btnStyle: {},
      isText: true,
      title: 'left',
      textStyle: { color: 'black' },
      onPress: () => { alert('left') }
    }]
    Actions.push('MultiNavBtn', { headerLeft: btns, headerRight: btns })

    // 刷新
    Actions.refresh(this.props.navigation,
        { headerLeft: [
            { onPress: ()=>{this._onPressBack()} },
            { onPress: ()=>{ this._onPressBack(true) }, imgStyle: { width: 18, height: 18 }, source: DEFAULT_BACK_ICON }
        ] });
    // 注1：如果第一个按钮不用刷新，就写 {} 就行，如：leftInfo: [{}, {onPress: ()=>{}}]
    // 注2：如果要按钮第二个按钮不显示，置为 null 即可，如：leftInfos:[{}, null]
 *
 */
function setupNavigaionBtns (infos, isRight = true) {
  if (infos === null) {
    return null
  }
  if (infos === undefined) {
    infos = { onPress: null, imgStyle: null, source: null } // 默认出现返回按钮
    return getOneNavigationBtn(infos, 0, isRight)
  }
  let isArray = infos instanceof Array
  if (!isArray) {
    return getOneNavigationBtn(infos, 0, isRight)
  }
  let btns = infos.map((item, i) => {
    if (item === 'back') {
      infos = { onPress: null, imgStyle: null, source: null } // 默认的返回按钮
      return getOneNavigationBtn(infos, 0, isRight)
    }
    return (item ? getOneNavigationBtn(item, i, isRight) : null)
  })
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
      {btns}
    </View>
  )
}

function getOneNavigationBtn (item, i, isRight = true) {
  return (
    <TouchableOpacity key={'leftNav' + i} style={[{ height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: isRight ? 8 : 16, paddingRight: isRight ? 8 : 8 }, item.btnStyle]} onPress={item.onPress ? item.onPress : () => { Actions.pop() }}>
      {
        item.isText
          ? <Text allowFontScaling={false} style={[{ fontSize: 16, color: '#ffffff' }, item.textStyle]}>{item.title}</Text>
          : <Image resizeMode={'contain'} style={[{ width: 20, height: 20 }, item.imgStyle]} source={item.source ? item.source : DEFAULT_BACK_ICON} />
      }
    </TouchableOpacity>
  )
}
