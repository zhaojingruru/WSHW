import React from 'react'
import { Form, Input, Select, Checkbox, Icon, Radio, Table, Divider, Modal, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            editVisible: false,
            curUser: {}
        }
    }

    componentDidMount() {
        const that = this;
        fetch('/ResidentialAccessControl/admin/user')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.onFetchData(myJson);
            });
    }

    onFetchData = (myJson) => {
        this.setState({ data: myJson.data })
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    // 显示弹框
    showEditModal = (event, record) => {
        console.log(record);
        this.setState({ curUser: record, editVisible: true })
    }


    // 隐藏弹框
    hideEditModal = () => {
        this.setState({ editVisible: false })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                width: '5%',
                dataIndex: 'id'
            },
            {
                title: 'Name',
                width: '10%',
                dataIndex: 'name'
            },
            {
                title: 'Gender',
                width: '8%',
                dataIndex: 'gender'
            },
            {
                title: 'Phone',
                width: '10%',
                dataIndex: 'phone',
            },
            {
                title: 'Email',
                width: '15%',
                dataIndex: 'email'
            },
            {
                title: 'Address',
                width: '20%',
                dataIndex: 'address'
            }, {
                title: 'CardKey',
                width: '10%',
                dataIndex: 'cardkey',
            }, {
                title: 'Action',
                width: '10%',
                dataIndex: 'action',
                render: (text, record) => {
                    return (<span>
                        <Button type="ghost" onClick={(e) => {this.showEditModal(e, record)}}>Edit</Button>
                        <Divider type="vertical" />
                        <a>Delete</a>
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
                <Modal title="Edit User" visible={this.state.editVisible} onOk={this.hideEditModal} onCancel={this.hideEditModal}>

                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem
                            id="control-input"
                            label="Name"
                            {...formItemLayout}
                            required>
                            <Input id="control-input" placeholder="Please enter your name"
                                value={this.state.curUser.name}  />
                        </FormItem>
                        <FormItem
                            id="phone-input"
                            label="Phone"
                            {...formItemLayout}
                            required>
                            <Input id="control-input" placeholder="Please enter your phone"
                                value={this.state.curUser.phone}   />
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="Email"
                            {...formItemLayout}>
                            <Input type="textarea" id="control-textarea" rows="3"
                               value={this.state.curUser.email}   />
                        </FormItem>

                        <FormItem
                            id="select"
                            label="Gender"
                            required
                            {...formItemLayout}>
                            <Select id="select" size="large" defaultValue={this.state.curUser.gender} style={{ width: 200 }} onChange={this.handleSelectChange}
                                >
                                <Option value="female">female</Option>
                                <Option value="male">male</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
