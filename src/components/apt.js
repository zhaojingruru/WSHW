import React from 'react'
import { Form, Input, Select, Checkbox, Icon, Radio, Table, Divider, Modal, Button, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class Apartments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            editVisible: false,
            curUser: {},
            addCardVisible: false,
            newCardKey: ""
        }
    }

    componentDidMount() {
        const that = this;
        this.fetchData('successfully loaded')
    }

    fetchData = (msg) => {
        fetch('/apartment')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ data: myJson.data })
                message.success(msg);
            });
    }



    // 显示弹框
    showEditModal = (event, record) => {
        console.log(record)
        this.setState({ curUser: record, editVisible: true })
    }

    showAddCardModal = (event, record) => {

        if (record.cardkey != null) {
            message.error("The user already has a card")
        } else {
            this.setState({ curUser: record, addCardVisible: true })
        }
    }

    // 隐藏弹框
    hideEditModal = () => {
        this.setState({ editVisible: false })
    }

    // 隐藏弹框
    hideAddCardModal = () => {
        this.setState({ addCardVisible: false })
    }


    handleOk = () => {
        message.success('Successfully Modified');
        this.hideEditModal();
        const uploadObj = {};
        uploadObj['id'] = this.state.curUser['id'];
        uploadObj['name'] = this.state.curUser['name'];
        uploadObj['phone'] = this.state.curUser['phone'];
        uploadObj['email'] = this.state.curUser['email'];
        uploadObj['gender'] = this.state.curUser['gender'];

        fetch('/ResidentialAccessControl/admin/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadObj)
        }).then(() => {
            this.fetchData("Successfully edited")
        })
    }

    handleInputChange = (event, property) => {
        this.setState({curUser: {...this.state.curUser, [property]: event.target.value}})
    }

    handleCardKeyChange = (event, property) => {
        this.setState({newCardKey: event.target.value})
    }

    handleAddCardOk = (event, property) => {
        fetch('/ResidentialAccessControl/admin/card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "cardkey": this.state.newCardKey,
                "userid" : this.state.curUser.id
            })
        }).then(() => {
            this.setState({newCardKey: ""})
            this.fetchData("Successfully add cardkey");
        })
        this.hideAddCardModal();
    }

    render() {
        const { getFieldProps } = this.props.form

        const columns = [
            {
                title: 'ID',
                width: '5%',
                dataIndex: 'aptid'
            },
            {
                title: 'Status',
                width: '10%',
                dataIndex: 'status'
            },

            {
                title: 'RID',
                width: '10%',
                dataIndex: 'rid',
            },
            {
                title: 'Rent',
                width: '10%',
                dataIndex: 'monthlyRent'
            }, {
                title: 'Area',
                width: '10%',
                dataIndex: 'area',
            }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        }

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} bordered pagination={pagination} />
            </div>
        )
    }
}
export default Form.create()(Apartments)
