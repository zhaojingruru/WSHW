import React from 'react'
import { Form, Input, Select, Checkbox, Icon, Radio, Table, Divider, Modal, Button, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class Manager extends React.Component {
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
        fetch('/manager')
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
                title: 'ManagerID',
                width: '15%',
                dataIndex: 'ManagerID'
            },
            {
                title: 'Name',
                width: '10%',
                dataIndex: 'Name'
            },
            {
                title: 'Phone',
                width: '10%',
                dataIndex: 'Phone'
            },
            {
                title: 'Email',
                width: '10%',
                dataIndex: 'Email'
            },
            {
                title: 'AccountID',
                width: '10%',
                dataIndex: 'AccountID'
            }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        }

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} bordered />
            </div>
        )
    }
}
export default Form.create()(Manager)
