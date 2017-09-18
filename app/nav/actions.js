/*
 * @Author: Aevit
 * @Desc:
 * @Date: 2017-09-17 18:18:35
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-18 15:04:26
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

  popToTop () {
    if (!this.navigation) {
      return
    }
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Tab' })
      ]
    })
    this.navigation.dispatch(resetAction)
  }

  refresh (nav, params) {
    if (!nav || !nav.setParams || typeof nav.setParams !== 'function' || !params) {
      return
    }
    nav.setParams(params)
  }

  getParams (navigation) {
    if (!navigation) {
      return {}
    }
    return navigation.state.params
  }
}

export default new Actions()
