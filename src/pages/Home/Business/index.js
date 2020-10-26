import React, {useState} from 'react';
import style from './index.module.scss';
import {Button, Table} from 'antd';

function Business(){
    const [selectionType, setSelectionType] = useState('checkbox');
    const columns = [
        {
            title: '企业名称',
            dataIndex: 'name',
            render: text => <p>{text}</p>,
            align: 'center'
        },
        {
            title: '地址',
            dataIndex: 'address',
            render: text => <p>{text}</p>,
            align: 'center'
        },
        {
            title: '经营状态',
            dataIndex: 'state',
            render: text => <p>{text}</p>,
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'state',
            render: text => (
                <>
                    <Button type="primary" size="small" style={{marginRight:'8px'}}>编辑</Button>
                    <Button type="danger" size="small">删除</Button>
                </>
            ),
            align: 'center'
        }
    ]
    const data = [
        {
            key: '1',
            name: '测试企业1',
            address: '中山路6号',
            state: '营业'
        },
        {
            key: '2',
            name: '测试企业2',
            address: '中山路6号',
            state: '营业'
        },
        {
            key: '3',
            name: '测试企业3',
            address: '中山路6号',
            state: '营业'
        },
        {
            key: '4',
            name: '测试企业4',
            address: '中山路6号',
            state: '营业'
        }
    ]
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }
    return (
        <div className={style['business']}>
            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Business;