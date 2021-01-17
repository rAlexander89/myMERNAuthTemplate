//index.js is our root reducer

import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'


export default combineReducers({
    alert,
    auth
})