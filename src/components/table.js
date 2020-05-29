import React from 'react'
import { Form, Input, Select, Checkbox, Icon, Radio, Table, Divider, Modal, Button, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class myTable extends React.Component {
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
        fetch('/ResidentialAccessControl/admin/resident')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ data: myJson.data })
                message.success(msg);
            });
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }
    handleDelete = (event, record) => {
        fetch('/ResidentialAccessControl/admin/resident/' + record.id, {
            method: 'DELETE'
        }).then(()=>{
            this.fetchData('Successfully Deleted')});
    }

    handleReportLoss = (event, record) => {
        if (record.cardkey == null) {
            message.error("The user do not have any card.")
        } else {
            fetch('/ResidentialAccessControl/admin/card/' + record.cardkey + '/' + record.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                this.fetchData("Successfully report the loss")
            })
        }
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

        fetch('/ResidentialAccessControl/admin/resident', {
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
                title: 'RID',
                width: '5%',
                dataIndex: "RID"
            },
            {
                title: 'AccountID',
                width: '5%',
                dataIndex: "AccountID"
            },
            {
                title: 'Name',
                width: '10%',
                dataIndex: 'name'
            },
            {
                title: 'Phone',
                width: '10%',
                dataIndex: 'phone',
            },
            {
                title: 'Email',
                width: '10%',
                dataIndex: 'email'
            }, {
                title: 'CardKey',
                width: '10%',
                dataIndex: 'cardkey',
            }, {
                title: 'Action',
                width: '30%',
                dataIndex: 'action',
                render: (text, record) => {
                    return (<span>
                        <Button type="ghost" onClick={(e) => {this.showEditModal(e, record)}}>Edit</Button>
                        <Divider type="vertical" />
                        <Button type="ghost" onClick={(e) => {this.handleDelete(e, record)}}>Delete</Button>
                        <Divider type="vertical" />
                        <Button type="ghost" onClick={(e) => {this.handleReportLoss(e, record)}} style={{display:record.cardkey!=null}}>Report Loss</Button>
                        <Divider type="vertical" />
                        <Button type="ghost" onClick={(e) => {this.showAddCardModal(e, record)}} style={{display:record.cardkey==null}}>Add card</Button>
                    </span>
                    )
                }
                ,
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
                <Modal title="Edit User" visible={this.state.editVisible} onOk={this.handleOk} onCancel={this.hideEditModal}>

                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem
                            id="control-input"
                            label="Name"
                            {...formItemLayout}
                            required>
                            <Input id="control-input" placeholder="Please enter your name"
                                {...getFieldProps('name')} value={this.state.curUser.name} onChange={(event) => {this.handleInputChange(event, 'name')}}/>
                        </FormItem>
                        <FormItem
                            id="phone-input"
                            label="Phone"
                            {...formItemLayout}
                            required>
                            <Input id="control-input" placeholder="Please enter your phone"
                                {...getFieldProps('phone')} value={this.state.curUser.phone}  onChange={(event) => {this.handleInputChange(event, 'phone')}}/>
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="Email"
                            {...formItemLayout}>
                            <Input type="textarea" id="control-textarea" rows="3"
                               {...getFieldProps('email')} value={this.state.curUser.email}  onChange={(event) => {this.handleInputChange(event, 'email')}}/>
                        </FormItem>

                        <FormItem
                            id="select"
                            label="Gender"
                            required
                            {...formItemLayout}>
                            <Select 
                            id="select" 
                            key={JSON.stringify(this.state.curUser)} 
                            defaultValue={this.state.curUser.gender} 
                            style={{ width: 200 }}  
                            onChange={(event) => {this.handleInputChange(event, 'gender')}}
                                {...getFieldProps('gender')}>
                                <Option value="female">female</Option>
                                <Option value="male">male</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="Add card" visible={this.state.addCardVisible} onOk={this.handleAddCardOk} onCancel={this.hideAddCardModal}>
                <Input id="control-input" 
                        placeholder="Please enter the new cardkey"
                        value={this.state.newCardKey} 
                        onChange={(event) => {this.handleCardKeyChange(event)}}/>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(myTable)
