import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  { Link, withRouter } from 'react-router-dom' 
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ profile: {profile, loading}, createProfile, getCurrentProfile, history }) => {

    const [ formData, setFormData ] = useState({
        team: '',
        email: '',
        cell: '',
        counties: '',
        leads: '',
        volume: '',
        commissions: '',
        notes: ''
    })

    useEffect(() => {
        getCurrentProfile()

        setFormData({
            team: loading || !profile.team ? '' : profile.team,
            email: loading || !profile.email ? '' : profile.email,
            cell: loading || !profile.cell ? '' : profile.cell,
            counties: loading || !profile.counties ? '' : profile.counties,
            // leads: loading || !profile.leads ? '' : profile.leads,
            // volume: loading || !profile.volume ? '' : profile.volume,
            // commissions: loading || !profile.commissions ? '' : profile.commissions,
            // notes: loading || !profile.notes ? '' : profile.notes
        })
    }, [loading])

    const { team, email, cell, counties } = formData

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
    }

    const onChange = e => setFormData({ 
        ...formData,
        [e.target.name]: e.target.value
    })

    return(

    <Fragment>
      <h1 className="large text-primary">
        Edit User Profile
      </h1>
      <small> All fields are required</small>

      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <input type="text" 
            placeholder="Team" 
            name="team" 
            value={team} 
            onChange={ e => onChange(e) } />
          <small className="form-text">
              Whose team are they on?
            </small>
        </div>
        <div className="form-group">
          <input type="text" 
            placeholder="Email" 
            name="email" 
            value={email} 
            onChange={ e => onChange(e) } />
          <small className="form-text">
              Work email over personal email preffered.
            </small>
        </div>
        <div className="form-group">
          <input type="text" 
            placeholder="Cell" 
            name="cell" 
            value={cell} 
            onChange={ e => onChange(e)} />
          <small className="form-text">
              Best cell phone number they're most likely to answer.
            </small>
        </div>
        <div className="form-group">
          <input type="text" 
            placeholder="Counties" 
            name="counties" 
            value={counties} 
            onChange={ e => onChange(e)} />
          <small className="form-text">
              What counties will they cover? Omit the state and county label. <br/>
              Example: Orange County, CA is inputted simply as Orange.</small>
        </div>
       
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mSTP = state => {
    return{
        profile: state.profile
    }
}

export default connect(mSTP, { createProfile, getCurrentProfile })(withRouter(EditProfile))

