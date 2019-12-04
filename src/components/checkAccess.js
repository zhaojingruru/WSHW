import React from 'react'
import { Menu, Dropdown, Icon, message,Input,Button} from 'antd';

// 结尾组件
export default class myAnimate extends React.Component {
    constructor(props) {
        super(props)   
    }
    state = {
        area: 1
    }

    clickBtn = () => {
        fetch('/ResidentialAccessControl/admin/card/1aazxcnmo/'+this.state.area)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                message.info(myJson);
            });

            // message.info(`you have the access to area ${this.state.area}`);

    }

    render() {
        const onClick = ({ key }) => {
            message.info(`You chose on ${key}`);
            this.setState({area: key})
        };

        const menu = (
            <Menu onClick={onClick}>
                <Menu.Item key="a">a</Menu.Item>
                <Menu.Item key="b">b</Menu.Item>
                <Menu.Item key="c">c</Menu.Item>
            </Menu>
        );

        return (
            <div>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">Areas<Icon type="down" /></a>
            </Dropdown>
            <Input placeholder="Enter your card key" />
            <Button type="primary" onClick={this.clickBtn}>Check</Button>
            </div>
        )
    }       
}