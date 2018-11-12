import React, { Component } from 'react'
import { Input, Grid, Icon } from 'semantic-ui-react'
import axios from 'axios'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import './home.less'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      nav: []
    }
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
    // console.log(localStorage.getItem('token'))
    const res = await axios.post('homes/menu')
    // console.log(res)
    const { data, meta } = res
    if (meta.status === 200) {
      const nav = data.list.map(item => {
        item.bgColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        return item
      })
      // console.log(nav)
      this.setState({
        nav
      })
    }
  }
  componentDidMount() {
    this.getSwipeImage()
    this.getNavigate()
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
                    <Grid.Column key={item.id}>
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
                    <Grid.Column key={item.id}>
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
        </div>
      </div>
    )
  }
}
export default Home