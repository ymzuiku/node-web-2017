import React from 'react'
import {Route,Switch} from 'react-router-dom'
import { Menu, Icon, Layout} from 'antd';
import SideMenu from './Layout/SideMenu'
import Headerbar from './Layout/Headerbar'
import Footbar from './Layout/Footbar'
import Census from './Census'
import Dashboard from './Dashboard'
import PositiveManage from './PositiveManage'
import PublicSpirited from './PublicSpirited'
import Query from './Query'
import ReportCenter from './ReportCenter'
import ScientificServe from './ScientificServe'
import SimpleCenter from './SimpleCenter'
import SystemManage from './SystemManage'
import { store } from '../../models/api';
const {Header, Sider, Footer, Content} = Layout

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pc:store.getState().ui.pc
    }
  }
  render() {
    let {pc} = this.state
    return (
      <div style={{ height: '100vh' }} >
        <Layout style={{height:'100%'}} >
        <Sider breakpoint='sm' >
        <SideMenu></SideMenu>
        </Sider>
        <Layout>
          <Header style={{background:'#fff', height:60, zIndex:3, boxShadow: '0px 2px 2px rgba(0,0,0,0.065)' }}>
            <Headerbar></Headerbar>
          </Header>
          <Content style={{height:"100%"}} >
          <Switch>
            <Route exact path='/main/simplecenter/*' component={Census} ></Route>
            <Route exact path='/main/dashboard/*' component={Dashboard} ></Route>
            <Route exact path='/main/positiveManage/*' component={PositiveManage} ></Route>
            <Route exact path='/main/publicSpirited/*' component={PublicSpirited} ></Route>
            <Route exact path='/main/query/*' component={Query} ></Route>
            <Route exact path='/main/reportCenter/*' component={ReportCenter} ></Route>
            <Route exact path='/main/scientificServe/*' component={ScientificServe} ></Route>
            <Route exact path='/main/simpleCenter/*' component={SimpleCenter} ></Route>
            <Route exact path='/main/systemManage/*' component={SystemManage} ></Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
      </div>
    )
  }
}

