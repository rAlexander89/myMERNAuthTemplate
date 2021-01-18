import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
         <ul>
           <li><Link to='/dashboard'>
              <i className='fas fa-user'></i>
              {' '}<span className='hide-sm'>Dashboard</span>
             </Link></li>
          <li>
            <Link onClick={ logout } to='/profiles'>
              <i className='fas fa-sign-out-alt'></i>
              {' '}<span className='hide-sm'>Logout</span>
            </Link>
          </li>
        </ul>
  )

  const guestLinks = (
         <ul>
          <li><Link to='/profiles'>Developers</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
  )


    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className="fas fa-code"></i> Hermes</Link>
        </h1>
        { !loading && ( <Fragment> { isAuthenticated ? authLinks : guestLinks } </Fragment> )}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mSTP = state => {
  return{
    auth: state.auth
  }
}


export default connect( mSTP, { logout })(Navbar)
