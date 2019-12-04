import React from 'react'
import { Menu, Dropdown, Icon, message,Input,Button} from 'antd';

// 结尾组件
export default class myAnimate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: 1,
            areas:[],
            cardKey:'',
        }
    }

    componentDidMount() {
        const that = this;
        fetch('/ResidentialAccessControl/admin/area')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                const data = myJson.data;
                console.log(data,'data');
                that.changeAreas(data);
            });
    }

    changeAreas = (data) => {
        this.setState({
            areas: data
        });
    }

    clickBtn = () => {
        fetch('/ResidentialAccessControl/admin/card/'+this.state.cardKey+'/'+this.state.area)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if(myJson){
                    message.info('Welcome');
                } else {
                    message.info('sorry,you can\'t access');
                }
            });

            // message.info(`you have the access to area ${this.state.area}`);

    }

    changeKey = (e) => {
        this.setState({
            cardKey: e.target.value
        })
    }

    render() {
        const onClick = (e) => {
            message.info(`You chose ${e.item.props.name}`);
            this.setState({area: e.key})
        };

        const menu = (
            <Menu onClick={onClick}>
                {this.state.areas.map(item => (
                    <Menu.Item key={item.areaid} name={item.name}>{item.name}</Menu.Item>
                ))}
            </Menu>
        );

        return (
            <div>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">Areas<Icon type="down" /></a>
            </Dropdown>
            <Input placeholder="Enter your card key" onChange={this.changeKey} value={this.state.cardKey}/>
            <Button type="primary" onClick={this.clickBtn}>Check</Button>
            </div>
        )
    }       
}