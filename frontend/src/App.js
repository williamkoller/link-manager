import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import Links from './Screens/Manager/Links'
import Create from './Screens/Manager/Create'
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
        <Route path="/sign-in"><SignIn /></Route>
        <Route path="/sign-up"><SignUp /></Route>
        <Route path="/manager/links/create"><Create /></Route>
        <Route path="/manager/links/edit"><h1>Edit Link</h1></Route>
        <Route path="/manager/links"><Links /></Route>
        <Route path="/"><h1>Home</h1></Route>
      </Switch>
    </div>
  </BrowserRouter>
  )
}

export default App