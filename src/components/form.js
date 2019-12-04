import React from 'react'
import { Form, Input, Select, Checkbox, DatePicker, Col, Radio, Button, Modal, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class myForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    // 选择select
    handleSelectChange = (value) => {
        console.log(`selected ${value}`)
    }

    // 提交表单
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', JSON.stringify(this.props.form.getFieldsValue()))
        this.props.form.resetFields()
        fetch('/ResidentialAccessControl/admin/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.form.getFieldsValue())
        });
    }


    // 显示弹框
    showModal = () => {
        this.setState({ visible: true })
    }


    // 隐藏弹框
    hideModal = () => {
        this.setState({ visible: false })
    }

    render() {
        const { getFieldProps } = this.props.form

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 6 }
        }

        const success = function () {
            message.success('操作成功!');
        }

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="Name"
                    {...formItemLayout}
                    required>
                    <Input id="control-input" placeholder="Please enter your name"
                    {...getFieldProps('name')} />
                </FormItem>
                <FormItem
                    id="phone-input"
                    label="Phone"
                    {...formItemLayout}
                    required>
                    <Input id="control-input" placeholder="Please enter your phone"
                           {...getFieldProps('phone')} />
                </FormItem>

                <FormItem
                    id="control-textarea"
                    label="email"
                    {...formItemLayout}>
                    <Input type="textarea" id="control-textarea" rows="3"
                    {...getFieldProps('email')} />
                </FormItem>

                <FormItem
                    id="select"
                    label="gender"
                    required
                    {...formItemLayout}>
                    <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }} onChange={this.handleSelectChange}
                        {...getFieldProps('gender')}>
                        <Option value="female">female</Option>
                        <Option value="male">male</Option>
                    </Select>
                </FormItem>

                {/*<FormItem*/}
                {/*    label="Checkbox 多选框"*/}
                {/*    {...formItemLayout}*/}
                {/*>*/}
                {/*    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem1')}>选项一</Checkbox>*/}
                {/*    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem2')}>选项二</Checkbox>*/}
                {/*    <Checkbox className="ant-checkbox-inline" {...getFieldProps('checkboxItem3')}>选项三</Checkbox>*/}
                {/*</FormItem>*/}

                {/*<FormItem*/}
                {/*    label="Radio 单选框"*/}
                {/*    {...formItemLayout} >*/}
                {/*    <RadioGroup defaultValue="b" {...getFieldProps('radioItem')}>*/}
                {/*        <Radio value="a">A</Radio>*/}
                {/*        <Radio value="b">B</Radio>*/}
                {/*        <Radio value="c">C</Radio>*/}
                {/*        <Radio value="d">D</Radio>*/}
                {/*    </RadioGroup>*/}
                {/*</FormItem>*/}
                <FormItem wrapperCol={{ span: 6, offset: 3 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={success}>Add</Button>
                    &nbsp;&nbsp;&nbsp;
                </FormItem>
            </Form>
        )
    }
}

myForm = Form.create()(myForm)

export default myForm