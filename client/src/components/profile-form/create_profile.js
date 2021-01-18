import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CreateProfile = props => {

    const [ formData, setFormData ] = useState({
        team: '',
        cell: '',
        email: '',
        locations: '',
    })

    const { team, cell, email, locations } = formData

    return(
    <Fragment>
        <h1 class="large text-primary">
        Create UserProfile
      </h1>
      <p class="lead">
        <i class="fas fa-user"></i>{' '} User Data:
      </p>

      <form>
          <div class="form-group">
            <input type="text" placeholder="Team" name="team" />
          </div>

          <div class="form-group">
            <input type="text" placeholder="cell" name="cell" />
          </div>

          <div className="form-group">
                <input 
                    type="tel" 
                    placeholder="Cell Phone" 
                    name="contact"
                    // required 
                    />
                <small>Format: 123-456-7890</small>
            </div>
      </form>
    </Fragment>
    )
}

export default CreateProfile


{/* 
CreateProfile.propTypes = {
}

export default CreateProfile */}
