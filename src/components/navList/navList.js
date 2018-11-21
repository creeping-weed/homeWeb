import React, { Component } from 'react'
// import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import { Icon, Tab, Grid, Form, Button } from 'semantic-ui-react'
import './navList.less'
class NavList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      hander: ''
    }
  }
  componentDidMount() {
    const { id } = this.state
    let hander = ''
    switch (id) {
      case '1':
        hander = '二手房'
        break;
      case '7':
        hander = '贷款利率计算'
        break;
      default:
        hander = '这是标题'
    }
    this.setState({
      hander
    })
  }
  render() {
    // 获取到动态的路由参数，然后根据参数的不同，显示不同的页面
    console.log(this.state.id)
    const { id } = this.state
    let template = ''
    if (id === '1') {

    } else if (id === '2') {

    } else if (id === '3') {

    } else if (id === '4') {

    } else if (id === '5') {

    } else if (id === '6') {

    } else if (id === '7') {
      const panes = [
        { menuItem: '公积金贷款', render: Pane1 },
        { menuItem: '商业贷款', render: () => <Tab.Pane><p>商业贷款</p></Tab.Pane> },
        { menuItem: '组合贷款', render: () => <Tab.Pane><p>组合贷款</p></Tab.Pane> },
      ]
      template = (<div className="computed">
        <Tab panes={panes} className="tab" />
      </div>)
      function Pane1() {
        const option1 = [
          { key: 'm', text: '按房间总额', value: 'male' },
          { key: 'f', text: '按贷款总额', value: 'female' },
        ]
        const option2 = [
          { key: 'a', text: '1', value: 'year' },
          { key: 'b', text: '2', value: 'year' },
        ]
        const option3 = [
          { key: 'a', text: '基准利率(3.25%)', value: 'a' },
          { key: 'b', text: '基准利率9.5折', value: 'b' }
        ]
        function getOption() {
          return {
            title: {
              text: '还款总额构成',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['本金', '利息']
            },
            series: [
              {
                name: '详情',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  { value: 335, name: '本金' },
                  { value: 100, name: '利息' }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }
        return (
          <Tab.Pane>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <p>贷款方式</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Form.Select fluid options={option1} placeholder='选择贷款方式' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <p>贷款总额</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Form.Input fluid placeholder='贷款总额' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <p>贷款年限</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Form.Select fluid options={option2} placeholder='选择贷款年限' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <p>贷款利率</p>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Form.Select fluid options={option3} placeholder='请选择利率' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button primary fluid>计算</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="webset">
              <ReactEcharts option={getOption()} />
            </div>
          </Tab.Pane>
        )
      }
    } else {

    }
    return (
      <div className="navList">
        <Hander {...this.props} hander={this.state.hander} />
        {template}
      </div>
    )
  }
}
// 自定义hander组件
function Hander(props) {
  return (
    <div className="hander">
      <Icon disabled name='chevron left' onClick={props.history.goBack} />
      <h3>{props.hander}</h3>
    </div>
  )
}
export default NavList