/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-17 18:18:35
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-17 21:36:35
 */
'use strict'

import { NavigationActions } from 'react-navigation'

class Actions {
  init (navigation) {
    this.navigation = navigation
  }

  push (className, params) {
    if (!this.navigation || !className) {
      return
    }
    this.navigation.navigate(className, params)
  }

  pop () {
    if (!this.navigation) {
      return
    }
    this.navigation.goBack(null)
  }

  refresh (key, params) {
    if (!this.navigation || !key || !params) {
      return
    }
    const setParamsAction = NavigationActions.setParams({
      key: key,
      params: params
    })
    this.navigation.dispatch(setParamsAction)
  }

  getParams (navigation) {
    if (!navigation) {
      return {}
    }
    return navigation.state.params
  }
}

export default new Actions()
