import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../Actions/AccountActions'

const SignUp = (props) => {
  const { signUp, account } = props
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new window.FormData(e.target)
    const data = Object.fromEntries(formData)

    signUp(data)
  }

  if (account) {
    return <Redirect to='/manager/links' />
  }

  return (
    <div key={signUp} className='container h-100 pt-5'>
      <h1>Sign Up</h1>
      <div className='d-flex flex-column h-100'>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor=''>E-mail</label>
            <input type='text' className='form-control' name='email' required />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Password Confirmation</label>
            <input
              type='password'
              className='form-control'
              name='passwordConfirmation'
              required
            />
          </div>
          <div>
            <button className='btn btn-primary btn-round'>Submit</button>
          </div>
        </form>
        <div className='container text-center fixed-bottom pb-5'>
          <div className='text-muted'>Already have an Account?</div>
          <Link to='/sign-in'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}

const mapstateToProps = (state) => {
  return { account: state.account.account }
}

export default connect(mapstateToProps, { signUp })(SignUp)
