import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Menu, Dropdown, Icon, message,Input,Button} from 'antd';
import './../main.css';

// 结尾组件
class myAnimate extends React.Component {
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
        const mapStyles = {
            width: '500px',
            height: '500px',
            margin: '20px',
        };
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
                <a className="ant-dropdown-link title">Areas<Icon type="down" /></a>
            </Dropdown>
            <Input placeholder="Enter your card key" onChange={this.changeKey} value={this.state.cardKey} style={{ width: 200 }} className="checkInput"/>
            <Button type="primary" onClick={this.clickBtn} className="checkBtn">Check</Button>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                />            </div>
        )
    }       
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVABrP0U723hgb0pnHZk1z85S5RiQlPVQ'
})(myAnimate);