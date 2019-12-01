import React from 'react'
import {Table, Icon, Divider} from 'antd'

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        const data = []

        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                id: i,
                name: `作业${i}`,
                gender: 'female',
                address: `UWT${i}号`,
                cardkey: i,
            })
        }

        this.setState({
            data,
        },()=> {
            console.log(this.state.data)
        })
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
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
            render: (text, record) => (
                <span>
                    <a>Edit</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                </span>
                ),
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

        return (
            <Table columns={columns} dataSource={this.state.data} bordered pagination={pagination} />
        )
    }
}
