
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ))

Alert.propTypes = { 
    alerts: PropTypes.func.isRequired
}

const mSTP = state => {
    return{
        alerts: state.alert

    }
}

export default connect(mSTP)(Alert)