/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 16:42:35
 * @description 主入口模块
 */

import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import { Menu, Icon, Switch } from 'antd'
const SubMenu = Menu.SubMenu

// 引入Ant-Design样式 & Animate.CSS样式
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

// 引入主体样式文件
import './main.css'

// 引入单个页面（包括嵌套的子页面）
import myTable from './components/table.js'
import myForm from './components/form.js'
import Card from './components/card.js'
import Apartments from './components/apt.js'
import Account from './components/Account.js'
import Manager from './components/Manager.js'
import checkAccess from './components/checkAccess.js'
import myAnimate from './components/checkAccess.js'
import myCalendar from './components/calendar.js'
import myCard from './components/fetch.js'
import animate from "./components/checkAccess";
import login from "./components/login";

const ACTIVE = { color: 'red' }

// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            username: ''
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        this.setState({
            username: 'luozh'
        })
    }

    render() {
        return (
            <div>
                <div id="leftMenu"> 
                    <img src='src/assets/images/logo.png' width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick}
                        style={{ width: 185 }}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <Menu.Item key="1"><Link to="/myTable">Users</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/myForm">Add User</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/checkAccess">Check Access</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/Apartments">Apartments</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/Card">Card</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/Manager">Manager</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/Account">Account</Link></Menu.Item>


                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute path="login" component={login}/>
            <Route path="myTable" component={myTable} />
            <Route path="Apartments" component={Apartments} />
            <Route path="Card" component={Card} />
            <Route path="Manager" component={Manager} />
            <Route path="myForm" component={myForm} />
            <Route path="checkAccess" component={animate} />
            <Route path="Account" component={Account} />

        </Route>
    </Router>
), document.getElementById('app'));


