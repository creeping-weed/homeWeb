import React, { Component } from 'react'
import axios from 'axios'
import './css/reset.css'
import './App.css'
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
// axios的配置
axios.defaults.baseURL = 'http://localhost:8086'
// 添加一个响应拦截器
axios.interceptors.response.use(res => {
  return res.data
}, error => {
  return Promise.reject(error)
})
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Redirect to={localStorage.getItem('token') ? '/home' : '/login'} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
