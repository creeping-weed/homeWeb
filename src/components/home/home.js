import React, { Component } from 'react'
import { Input, Grid, Icon, Button, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import './home.less'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      nav: [],
      info: [],
      question: [],
      house: [],
      active: true
    }
  }
  go(name) {
    console.log(name)
    this.props.history.push('/main/menu/' + name)
  }
  // 获取轮播图数据  
  async getSwipeImage() {
    const res = await axios.post('/homes/swipe')
    const { data, meta } = res
    if (meta.status === 200) {
      this.setState({
        images: data.list
      })
    }
  }
  // 获取导航栏数据
  async getNavigate() {
    const res = await axios.post('homes/menu')
    const { data, meta } = res
    if (meta.status === 200) {
      const nav = data.list.map(item => {
        item.bgColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        return item
      })
      this.setState({
        nav
      })
    }
  }
  // 获取信息（info）数据
  async getInfo() {
    const res = await axios.post('/homes/info')
    const { data, meta } = res
    if (meta.status === 200) {
      this.setState({
        info: data.list
      })
    }
  }
  // 获取question部分的数据
  async getQuestion() {
    const res = await axios.post('/homes/faq')
    const { data, meta } = res
    if (meta.status === 200) {
      this.setState({
        question: data.list
      })
    }
  }
  // 获取房屋信息数据
  async getHouse() {
    const res = await axios.post('/homes/house')
    const { data, meta } = res
    // console.log(res)
    if (meta.status === 200) {
      data.list.pop()
      const arr1 = []
      const arr2 = []
      const arr3 = []
      data.list.forEach(item => {
        // console.log(item)
        if (item.home_type === 1) {
          item.title = '最新开盘'
          arr1.push(item)
        } else if (item.home_type === 2) {
          item.title = '二手精选'
          arr2.push(item)
        } else {
          item.title = '组一个家'
          arr3.push(item)
        }
      })
      const house = [arr1, arr2, arr3]
      this.setState({
        house,
        active: false
      })
    }
  }
  componentDidMount() {
    this.getSwipeImage()
    this.getNavigate()
    this.getInfo()
    this.getQuestion()
    this.getHouse()
    console.log(this.props)
  }
  render() {
    return (
      <div className="home">
        <div className="search">
          <Input icon='search' placeholder='搜房源...' iconPosition='left' fluid />
        </div>
        <div className="content">
          <div className="swipe">
            <ImageGallery items={this.state.images} showThumbnails={false} autoPlay />
          </div>
          <div className="navigate">
            <Grid columns={4} divided>
              <Grid.Row>
                {this.state.nav.slice(0, 4).map(item => {
                  return (
                    <Grid.Column key={item.id} onClick={(e) => {
                      this.go(item.id, e)
                    }}>
                      <div className="icon" style={{ backgroundColor: item.bgColor }}>
                        <Icon disabled name='home' />
                      </div>
                      <p>{item.menu_name}</p>
                    </Grid.Column>
                  )
                })}
              </Grid.Row>
              <Grid.Row>
                {this.state.nav.slice(4).map(item => {
                  return (
                    <Grid.Column key={item.id} onClick={this.go.bind(this, item.id)}>
                      <div className="icon" style={{ backgroundColor: item.bgColor }}>
                        <Icon disabled name='home' />
                      </div>
                      <p>{item.menu_name}</p>
                    </Grid.Column>
                  )
                })}
              </Grid.Row>
            </Grid>
          </div>
          <div className="info clearfix">
            <div className="img">
              <img src={require('../../images/zixun.png')} alt="" />
            </div>
            <div className="message">
              {this.state.info.map(item => {
                return (
                  <p key={item.id}><span>限购 ·</span>{item.info_title}</p>
                )
              })}
            </div>
            <div className="right">
              <Icon name='chevron right' />
            </div>
          </div>
          <div className="ques">
            <h3>好客问答</h3>
            <div className="info">
              <ul>
                {this.state.question.map(item => {
                  return (
                    <li key={item.question_id}>
                      <div className="top">
                        <p><Icon name='question circle' color='teal' />{item.question_name}</p>
                      </div>
                      <div className="down">
                        {item.question_tag.split(',').map((v, i) => {
                          return (
                            <Button basic color='teal' size='tiny' key={i}>{v}</Button>
                          )
                        })}
                        <span>{item.atime} · <Icon name='comment alternate outline' />{item.qnum}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="house">
            <ul>
              {this.state.house.map((v, i) => {
                return (
                  <li key={i}>
                    <h3>{v[0].title}</h3>
                    <div className="info1">
                      <ul>
                        {v.map(item => {
                          return (
                            <li className="clearfix" key={item.id}>
                              <div className="left">
                                <img src={require('../../images/home.png')} alt="" />
                              </div>
                              <div className="right">
                                <h4>{item.home_name}</h4>
                                <p className="desc">{item.home_desc}</p>
                                {item.home_tags.split(',').map((value, index) => {
                                  return (
                                    <Button basic color='teal' size='tiny' key={index}>{value}</Button>
                                  )
                                })}
                                <p className="price">{item.home_price}</p>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <Dimmer active={this.state.active}>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    )
  }
}
export default Home