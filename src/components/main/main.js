import React, { Component } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import './main.less'
import home from '../home/home'
import find from '../find/find'
import chat from '../chat/chat'
import my from '../my/my'
class DiyLink extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { to, title, changeActive, index, active, icon } = this.props
    return (
      <div className={`link ${active === true ? 'active' : ''}`} onClick={() => {
        changeActive(index)
      }}>
        <Link to={to}>
          <div>
            <Icon name={icon} />
          </div>
          {title}
        </Link>
      </div>
    )
  }
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: '1'
    }
  }
  changeActive = (active) => {
    this.setState({
      active
    })
  }
  render() {
    return (
      <div className="main">
        <div className="info">
          <Switch>
            <Route path="/main/home" component={home} />
            <Route path="/main/find" component={find} />
            <Route path="/main/chat" component={chat} />
            <Route path="/main/my" component={my} />
            <Redirect to="/main/home" />
          </Switch>
        </div>
        <div className="footer">
          <DiyLink to="/main/home" title="主页" index="1" icon="home" changeActive={this.changeActive}
            active={this.state.active === '1'} />
          <DiyLink to="/main/find" index="2" title="资讯" icon="search" changeActive={this.changeActive}
            active={this.state.active === '2'} />
          <DiyLink to="/main/chat" index="3" title="微聊" icon="comment alternate" changeActive={this.changeActive}
            active={this.state.active === '3'} />
          <DiyLink to="/main/my" index="4" title="我的" icon="user outline" changeActive={this.changeActive}
            active={this.state.active === '4'} />
        </div>
      </div>
    )
  }
}
export default Main