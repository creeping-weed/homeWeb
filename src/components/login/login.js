import React from 'react'
import axios from 'axios'
import './login.css'
import { Input, Button } from 'semantic-ui-react'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }
  handeChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
  }
  login = async () => {
    const { uname, pwd } = this.state
    const res = await axios.post('/users/login', { uname, pwd })
    const { data, meta } = res
    if (meta.status === 200) {
      localStorage.setItem('token', data.token)
      this.props.history.push('/main/home')
    }
  }
  render() {
    return (
      <div className='login'>
        <div className="header">
          <h3>登入</h3>
        </div>
        <ul>
          <li>
            <Input
              icon='user'
              iconPosition='left'
              fluid={true}
              placeholder='请输入用户名'
              value={this.state.userName}
              onChange={this.handeChange.bind(this, 'uname')}
            />
          </li>
          <li>
            <Input
              icon='key'
              iconPosition='left'
              fluid={true}
              placeholder='请输入密码'
              type="password"
              value={this.state.password}
              onChange={(e) => {
                this.handeChange('pwd', e)
              }}
            />
          </li>
          <li>
            <Button primary fluid onClick={this.login}>点击登入</Button>
          </li>
        </ul>
      </div>
    )
  }
}
export default Login