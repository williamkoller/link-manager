import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg bg-primary text-light">
        <div className="container d-flex w-100 justify-content-betwenn">
          <div>
            <span>Back</span>
          </div>
          <div className="text-center">
            <strong>Links</strong>
          </div>
          <div>
            <strong>Exit</strong>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  )
}

export default Layout