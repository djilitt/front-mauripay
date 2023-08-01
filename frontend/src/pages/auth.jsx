import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

const Signup = () => {
    const [loginError, setLoginError] = React.useState(false); // State variable to track login error
    const URL = "http://localhost";
    const Port = 3000;
    const uri = `${URL}:${Port}`; 

    const navigate = useNavigate(); // Now, useNavigate should work here
    const onFinish = async (values) => {
        try {
          // Use fetch to send the POST request
          const response = await fetch(uri+'/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          const data = await response.json();
          localStorage.setItem('token', data);

          console.log("data",data)
          if (data==null) {
            setLoginError(true); 
            console.log("loginError",loginError)
            throw new Error('Login failed.');
            navigate('/');
          }
       if(data){
          const { token } = data;
          console.log("tokenlogin", { token } )
          // Save the token to local storage or cookies for future use
              navigate('/home');
       }
        } catch (error) {
          console.error('Error during login:', error.message);
        }
      };
    return (
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center vh-100">


                <div class="col-md-4">
                    <div class="card card-pricing">
                        <div class="card-body text-center">
                            <p class="card-pricing-plan-name fw-bold text-uppercase">Testeur</p>
                            <i class="card-pricing-icon dripicons-user text-primary m-3"></i>
                            <div className='mb-3'>
                            {loginError && (
                                    <Alert
                                        message="Login failed. Please check your credentials and try again."
                                        type="error"
                                        showIcon
                                        closable
                                        onClose={() => setLoginError(false)} // Dismiss the alert when closed
                                    />
                                    )}
                                    </div>
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
                                        name="username"
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
                                        name="password"
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
