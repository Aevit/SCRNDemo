/*
 * @Author: Aevit
 * @Desc: 样式相关
 * @Date: 2017-09-19 14:38:40
 * @Last Modified by: Aevit
 * @Last Modified time: 2017-09-19 15:11:37
 */
'use strict'

import { Dimensions, Platform, StatusBar } from 'react-native'

export const SCStyle = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  contentHeight: Dimensions.get('window').height - (Platform.OS === 'android' ? 56 + StatusBar.currentHeight : 64)
}
