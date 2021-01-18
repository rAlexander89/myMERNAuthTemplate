import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/spinner'

const Dashboard = ({ 
    getCurrentProfile, 
    auth: { user }, 
    profile: { profile, loading } 
}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])


    return profile && loading === null ? 
        <Spinner /> : 
        <Fragment> 
            <h1 className='large text-primary'> Dashboard</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i>{' '}
                    Welcome, { user && user.name }.
                </p>

            {profile !==null ? 
                <Fragment> has profile </Fragment> 
                : 
                <Fragment> 
                    <p> You have not set up a profile. Add some info.</p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment> 
            }

        </Fragment>

}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

}

const mSTP = state => {
    return{
        auth: state.auth,
        profile: state.profile
    }
}

export default connect(mSTP, { getCurrentProfile })(Dashboard)