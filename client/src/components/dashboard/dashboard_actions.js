import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const DashboardActions = props => {
    return (
        <div className="dash-buttons">
        <Link to='/edit-profile' className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/edit-counties" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i>Edit Counties</Link>
        <Link to="/edit-leads" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Edit Leads</Link>
      </div>
    )
}

DashboardActions.propTypes = {

}

export default DashboardActions
