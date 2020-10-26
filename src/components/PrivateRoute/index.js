import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}){
    let isLogin = localStorage.getItem('isLogin');
    return <Route {...rest} render={(props) => isLogin?(<Component {...props}/>):(<Redirect to="/login"/>)}></Route>
}

export default PrivateRoute