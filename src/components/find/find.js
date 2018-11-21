import React, { Component } from 'react'
import axios from 'axios'
import { Tab } from 'semantic-ui-react'
import './find.less'
class Find extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab1: [],
      tab1Page: 0,
      tab1IsShow: true,
      tab2: [],
      tab2Page: 0,
      tab2IsShow: true
    }
  }
  getInfos = (path, options) => {
    return axios.post(path, options)
  }
  loaderMesg = async () => {
    let { tab1Page } = this.state
    tab1Page += 2
    this.setState({
      tab1Page
    })
    const res = await this.getInfos('/infos/list', {
      pagenum: tab1Page,
      pagesize: 2,
      type: 1
    })
    // console.log(res)
    const { meta, data } = res
    if (meta.status === 200) {
      const { data: tab1 } = data.list
      console.log(tab1)
      // console.log(this.state.tab1.push(tab1))
      if (tab1.length > 0) {
        this.setState({
          tab1: [...this.state.tab1, ...tab1]
        })
        console.log(this.state.tab1)
      } else {
        this.setState({
          tab1IsShow: false
        })
      }
    }
  }
  async componentDidMount() {
    const res = await this.getInfos('/infos/list', {
      pagenum: 0,
      pagesize: 2,
      type: 1
    })
    const { meta, data } = res
    if (meta.status === 200) {
      const { data: tab1 } = data.list
      this.setState({
        tab1
      })
    }
  }
  changeTab = async (e, data) => {
    console.log(data.activeIndex)
    const { activeIndex } = data
    if (activeIndex === 0) {

    } else if (activeIndex === 1) {
      const res = await this.getInfos('/infos/list', {
        pagenum: 0,
        pagesize: 2,
        type: 2
      })
      const { meta, data } = res
      if (meta.status === 200) {
        const { data: tab2 } = data.list
        this.setState({
          tab2
        })
      }
    } else {

    }
  }
  render() {
    const panes = [
      { menuItem: '资讯', render: pane1.bind(this) },
      { menuItem: '头条', render: pane2.bind(this) },
      { menuItem: '问答', render: pane3.bind(this) },
    ]
    function pane1() {
      const { tab1 } = this.state
      return (
        <Tab.Pane>
          <div className="information">
            <ul>
              {tab1.map(item => {
                return (
                  <li className="clearfix" key={item.id}>
                    <div className="img">
                      <img src={require('../../images/home.png')} alt="" />
                    </div>
                    <div className="text">
                      <h3>{item.info_title}</h3>
                      <p>$1200 1 Month</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {this.state.tab1IsShow ?
            <p style={{ textAlign: 'center' }} onClick={this.loaderMesg.bind(this, tab1)}>点击加载更多...</p> :
            <p style={{ textAlign: 'center' }}>没有更多数据了...</p>}
        </Tab.Pane>
      )
    }
    function pane2() {
      const { tab2 } = this.state
      return (
        <Tab.Pane>
          <div className="information">
            <ul>
              {tab2.map(item => {
                return (
                  <li className="clearfix" key={item.id}>
                    <div className="img">
                      <img src={require('../../images/home.png')} alt="" />
                    </div>
                    <div className="text">
                      <h3>{item.info_title}</h3>
                      <p>$1200 1 Month</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {this.state.tab2IsShow && <p style={{ textAlign: 'center' }} onClick={this.loaderMesg.bind(this, 'tab2')}>加载更多...</p>}
        </Tab.Pane>
      )
    }
    function pane3() {
      return (
        <Tab.Pane><p>问答</p></Tab.Pane>
      )
    }
    return (
      <div className="find">
        <div className="hander">
          <h3>资讯</h3>
        </div>
        <Tab panes={panes} onTabChange={this.changeTab} />
      </div>
    )
  }
}
export default Find