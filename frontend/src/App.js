import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './Screens/Home'
import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import Links from './Screens/Manager/Links'
import Create from './Screens/Manager/Create'
import Edit from './Screens/Manager/Edit'
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item"><Link to="/sign-in">Sign in</Link></li>
            <li className="list-group-item"><Link to="/sign-up">Sign up</Link></li>
            <li className="list-group-item"><Link to="/manager/links/create">Create Link</Link></li>
            <li className="list-group-item"><Link to="/manager/links/edit">Edit Link</Link></li>
            <li className="list-group-item"><Link to="/manager/links">Links</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/sign-in"><SignIn /></Route>
          <Route path="/sign-up"><SignUp /></Route>
          <Route path="/manager/links/create"><Create /></Route>
          <Route path="/manager/links/edit"><Edit /></Route>
          <Route path="/manager/links"><Links /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App