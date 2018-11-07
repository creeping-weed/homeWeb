import React, { Component } from 'react'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="home">
        <div className="footer">
          <ul>
            <li>主页</li>
            <li>资讯</li>
            <li>微聊</li>
            <li>我的</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Home