import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const Signup = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center vh-100">


                <div class="col-md-4">
                    <div class="card card-pricing">
                        <div class="card-body text-center">
                            <p class="card-pricing-plan-name fw-bold text-uppercase">Testeur</p>
                            <i class="card-pricing-icon dripicons-user text-primary m-3"></i>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Username"
                                        size="large" // Set size to "large"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        size="large" // Set size to "large"
                                    />
                                </Form.Item>
                               

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="btn btn-primary mt-4 mb-2 btn-rounded" size="large">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>

    );
};

export default Signup;
