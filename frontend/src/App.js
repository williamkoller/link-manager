import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  return (
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><Link to="/sign-in">Sign in</Link></li>
          <li><Link to="/sign-up">Sign up</Link></li>
          <li><Link to="/manager/links/create">Create Link</Link></li>
          <li><Link to="/manager/links/edit">Edit Link</Link></li>
          <li><Link to="/manager/links">Links</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/sign-in"><h1>Sign In</h1></Route>
        <Route path="/sign-up"><h1>Sign Up</h1></Route>
        <Route path="/manager/links/create"><h1>Create Link</h1></Route>
        <Route path="/manager/links/edit"><h1>Edit Link</h1></Route>
        <Route path="/manager/links"><h1>Links</h1></Route>
        <Route path="/"><h1>Home</h1></Route>
      </Switch>
    </div>
  </BrowserRouter>
  )
}

export default App