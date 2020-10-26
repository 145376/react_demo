import React, {useState, useEffect} from 'react';
import style from './index.module.scss';
import {Button, Layout, Avatar, Tabs} from 'antd';
import Business from './Business/index';
import Check from './Check/index';
import Message from './Message/index';
import Area from './Area/index';

function Home(props){
    const { Header, Sider, Content } = Layout;
    const [retract, setRetract] = useState(false);
    const [tab, setTab] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
    const [panes, setPanes] = useState([]);
    const menuList = [
        {id:1, title: '企业管理', name: "business"},
        {id:2, title: '检查管理', name: "check"},
        {id:3, title: '消息中心', name: "message"},
        {id:4, title: '地区管理', name: "area"},
    ]
    const {TabPane} = Tabs;

    return (
        <div className={style['home']}>
            <Layout className={style['container']}>
                 <Sider className={[style['sider'], retract?style['retract']:''].join(' ')}>
                     <div className={style['side-head']}>
                         {retract?'没':'没想好平台'}
                     </div>
                     <div className={style['side-body']}>
                        <div className={style['user']}>
                            <Avatar size={50} 
                            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg" 
                            ></Avatar>
                            {
                                retract?'':(<div className={style['info']}>
                                                <p>大老虎</p>
                                                <p>普通用户</p>
                                            </div>)
                            }  
                        </div>
                        <div className={style['menu']}>
                            <p>系统菜单</p>
                            <ul>
                                {
                                    menuList.map(item =>{
                                        if(retract){
                                            return (
                                                <li key={item.id}>
                                                    <span>+</span>
                                                </li>
                                            )
                                        }else{
                                            return (
                                            <li key={item.id} onClick={() => {
                                                setTab(item.name);
                                                if(panes.length === 0){
                                                    setPanes([...panes, {title: item.title, key: item.id, content: item.name}]);
                                                }else{
                                                    panes.forEach(pan_item => {
                                                        if(pan_item.key !== item.id){
                                                            setPanes([...panes, {title: item.title, key: item.id, content: item.name}]);
                                                        }
                                                    })
                                                }
                                            }}>
                                                <span>+</span>
                                                <span>{item.title}</span>
                                            </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                     </div>
                 </Sider>
                <Layout>
                    <Header className={style['header']}>
                        <div className={style['header-left']}>
                            <div onClick={() => {
                                setRetract(!retract)
                            }}>=</div>
                        </div>
                        <div className={style['header-right']}>
                            <div onClick={() => {
                                props.history.replace('/login');
                                localStorage.removeItem('isLogin');
                            }}>退出</div>
                        </div>
                    </Header>
                    <Content>
                        {
                            tab && <Tabs
                                onChange={(key) => {
                                    console.log(panes[key - 1]);
                                    setTab(panes[key - 1]['content']);
                                }}
                                activeKey={activeKey}
                                type="editable-card"
                                hideAdd
                                onEdit={(key) => {
                                    setPanes(panes.filter((item) => item.key.toString() !== key))
                                }}
                                >
                                {panes && panes.map(pane => (
                                    <TabPane tab={pane.title} key={pane.key}></TabPane>
                                ))}
                            </Tabs>
                        }
                        {
                           tab === 'business' && <Business></Business>
                        }
                        {
                           tab === 'check' && <Check></Check>
                        }
                        {
                           tab === 'message' && <Message></Message>
                        }
                        {
                           tab === 'area' && <Area></Area>
                        }
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}


export default Home