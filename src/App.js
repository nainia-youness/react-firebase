import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import HomePage from './Components/HomePage'
import Welcome from './Components/Welcome'
import ForgetPassword from './Components/ForgetPassword'
import {BrowserRouter,Route,Switch} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path="/" component={HomePage} exact/>
          <Route path="/welcome" component={Welcome} exact/>
          <Route path="/forgetpassword" component={ForgetPassword} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
