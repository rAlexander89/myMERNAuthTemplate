import {v4 as uuid } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = ( msg, alertType, timeout = 7500 ) => dispatch => {
    const id = uuid() // this generates a random, universal id

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout)
}