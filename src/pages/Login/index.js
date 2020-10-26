import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import style from './index.module.scss';
import {Form, Input, Button, Checkbox} from 'antd';

function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false)
    const [form] = Form.useForm();
    const {validateFields} = form;

    useEffect(() => {
        console.log(remember);
    },[username, password, remember])

    return (
        <div className={style['login']}>
            <div className={style['panel']}>
                <Form 
                form={form}
                onValuesChange={(value) => {
                    value.username && setUsername(value.username);
                    value.password && setPassword(value.password);
                }} 
                initialValues={{
                    username:'',
                    password:''
                }}>
                    <Form.Item 
                    label="用户名"
                        name="username" 
                        rules={[
                        {
                            required: true,
                            message: '用户名内容不能为空'
                        }
                    ]}
                    labelCol={{
                        span:5,
                    }}
                    labelAlign="left"
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item 
                    label="密码" 
                    name="password" 
                    rules={[
                        {
                            required: true,
                            message: '用户名内容不能为空'
                        }
                    ]}
                    labelCol={{
                        span:5,
                    }}
                    labelAlign="left"
                    >
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={(e) => {
                            setRemember(e.target.checked)
                        }}>记住我</Checkbox>
                        <Link to="/register">?忘记密码</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block onClick={() => {
                            validateFields().then(res => {
                                console.log(remember);
                                if(remember){
                                    localStorage.setItem('username', username);
                                    localStorage.setItem('password', password);
                                }
                                localStorage.setItem('isLogin', true);
                                props.history.replace('/home')
                            }).catch(err => {
                                console.log(err);
                            })
                        }}>登陆</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login