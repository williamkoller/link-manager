import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Layout/Manager'
const Links = () => {
  return (
    <Layout>
      <div className='row'>
        <div className='col'>
          <h1>Links</h1>
        </div>
        <div className='col text-right align-self-bottom pt-2'>
          <Link to='/manager/links/create' className='btn btn-primary'>
            Add
          </Link>
        </div>
      </div>
      <div className='pb-2 pt-2 pl-3 pr-3 d-flex flex-row justify-content-between'>
        <div className='pr-3'>
          <img src='https://via.placeholder.com/100x100' alt='Link icon' />
        </div>
        <div className='align-self-center'>
          <span className='text-primary clearflix'>Item Label</span>
          <br />
          <span className='text-primary clearflix'>Item Url</span>
        </div>
        <div className='ml-auto p-2 clearfix'>
          <span>Edit</span>
          <br />
          <span>Delete</span>
        </div>
      </div>
    </Layout>
  )
}

export default Links
