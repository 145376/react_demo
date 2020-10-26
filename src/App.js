import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/index'
import './App.css';


function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <PrivateRoute path="/home" component={lazy(() => import('./pages/Home'))}></PrivateRoute>
          <Route path="/login" component={lazy(() => import('./pages/Login'))}></Route>
          <Route path="/register" component={lazy(() => import('./pages/Register'))}></Route>
        </Switch> 
      </Suspense>
    </Router>
  );
}

export default App;
