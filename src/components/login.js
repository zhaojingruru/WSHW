import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Menu, Dropdown, Icon, message,Input,Button} from 'antd';
import './../main.css';


// 结尾组件
export default class myAnimate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            password:''
        }
    }

    componentDidMount() {

    }


    changeInput = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password:e.target.value
        })
    }

    clickLogin = () => {
        if(this.state.name === 'admin' && this.state.password === '123456') {
            this.props.history.push('/checkAccess')
        } else {
            message.info(`please check password`);
        }
    }

    render() {
        // const s = document.createElement('script');
        // const b = require('./../js/EasePack.min.js');
        // console.log(b,'bb')
        // s.type = 'text/javascript';
        // s.src = './../js/EasePack.min.js';
        // document.body.appendChild(s);
        //
        // const a = document.createElement('script');
        // a.type = 'text/javascript';
        // a.src = './../js/helloweb.js';
        // document.body.appendChild(a);
        //
        // const b = document.createElement('script');
        // b.type = 'text/javascript';
        // b.src = './../js/TweenLite.min.js';
        // document.body.appendChild(b);
        return (
            <div className='login'>
                <img className="bg_color" src="https://www.coloradorealestatediary.com/wp-content/uploads/2017/03/1110-E-Layton-Avenue-print-002-45-Front-Exterior-3889x2588-300dpi.jpg"/>
                <Input placeholder="Enter your username" onChange={this.changeInput} value={this.state.name} style={{ width: 200 }} className='user-name'/>
                <Input placeholder="Enter your password" onChange={this.changePassword} value={this.state.password} style={{ width: 200 }} className='password'/>
                <Button className='login-btn' onClick={this.clickLogin}>login</Button>
            </div>
        )
    }
}