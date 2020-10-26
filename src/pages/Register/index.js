import React, {useState, useEffect} from 'react';
import style from './index.module.scss';
import {Tabs, Breadcrumb, Button} from 'antd';
import ForWardInput from '../../components/Input';

function Register(props){
    const {TabPane} = Tabs;
    const parentRef = React.createRef();
    const [step, setStep] = useState(1);
    const [disable, setDisable] = useState(true);
    const [count, setCount] = useState(5);

    useEffect(() => {
        if(step === 3){
            let timer = setTimeout(() =>{
                setCount(count-1);
            }, 1000)
            if(count === 0){
                console.log('清除', timer);
                clearTimeout(timer);
                props.history.push('/login');
            }
        }
    }, [step, count])

    return (
        <div className={style['register']}>
            <div className={style['panel']}>
                <Tabs type="card" centered={true} tabBarGutter={0}>
                    <TabPane tab="忘记密码" key="1" className={[style['forget'], style['item']].join(' ')}>
                        <Breadcrumb>
                            <Breadcrumb.Item>发送邮箱</Breadcrumb.Item>
                            {
                                step >= 2?(<Breadcrumb.Item>
                                <a href="#">重置密码</a>
                                </Breadcrumb.Item>):''
                            }
                            {
                                step === 3?<Breadcrumb.Item>重置成功</Breadcrumb.Item>:''
                            }
                        </Breadcrumb>
                        <div className={style['form']}>
                            {
                                step===1 && (
                                    <div className={style['step1']}>
                                        <div>
                                            <p>输入账户邮箱获取验证码：</p>
                                            <ForWardInput 
                                            placeholder="请输入邮箱账号" 
                                            title="点击发送" 
                                            ref={parentRef} 
                                            disable={disable} 
                                            onChange={(e) =>{
                                                e.target.value?setDisable(false):setDisable(true);
                                            }}
                                            />
                                        </div>
                                        <div>
                                            <p>验证码:</p>
                                            <ForWardInput placeholder="请输入验证码" 
                                            style={{width:'25%'}} 
                                            ref={parentRef}  
                                            onChange={(e) =>{
                                                console.log(e.target.value);
                                            }}/>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step===2 && (
                                    <div className={style['step2']}>
                                        <div>
                                            <p>请设置你的密码:</p>
                                        <ForWardInput placeholder="请输入新的密码" ref={parentRef} onChange={(e) => {
                                                    console.log(e.target.value);    
                                        }}></ForWardInput>
                                        </div>
                                        <div>
                                            <p>再次确认:</p>
                                            <ForWardInput placeholder="确认密码" onChange={(e) => {
                                                    console.log(e.target.value);
                                        }}></ForWardInput>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step===3 && (<div className={style['step3']}>
                                    <p><span>{count}</span>秒后返回登录页</p>
                                </div>) 
                            }
                            {
                                step===3? '' : (
                                        <Button type="primary" 
                                        className={style['btn']} 
                                        onClick={() => {
                                            setStep(step+1);
                                        }}
                                    >下一步</Button>
                                ) 
                            }
                        </div>
                    </TabPane>
                    <TabPane tab="免费注册" key="2">
                        <p>免费注册</p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Register