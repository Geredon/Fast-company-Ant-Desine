import api from "./api";
import React, {useEffect, useState} from "react";
import {Button, Col, Pagination, Popconfirm, Row, Table, Tag} from 'antd';
import {Typography} from 'antd';
import {StarFilled, StarOutlined} from "@ant-design/icons";


const {Text} = Typography;


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const dataSours = users.map(d => ({...d, key: d._id}))


    function title() {
        return dataSours.length > 4 ? `${dataSours.length} человек тусанет с тобой сегодня!` : `${dataSours.length} человека тусанут с тобой сегодня!`
    }

    const handleElectIcon = (b) => {
        if (b === true) {
            return <StarFilled/>
        } else {
            return <StarOutlined/>
        }
    }

    const handleElect = (id) => {
        return setUsers(dataSours.map(i => i._id === id ? {...i, bookmark: !i.bookmark} : i))
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: '_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Качества',
            key: 'qualities',
            dataIndex: 'qualities',
            render: (qualities) => (
                <>
                    {qualities.map((q) => {
                        return (
                            <Tag color={q.color} key={q._id}>
                                {q.name}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Профессия',
            key: 'profession',
            dataIndex: 'profession',
            filters: [
                {
                    text: "Доктор",
                    value: "Доктор"
                },
                {
                    text: "Официант",
                    value: "Официант"
                },
                {
                    text: "Физик",
                    value: "Физик"
                },
                {
                    text: "Инженер",
                    value: "Инженер"
                },
                {
                    text: "Актер",
                    value: "Актер"
                },
                {
                    text: "Повар",
                    value: "Повар"
                },

            ],
            onFilter: (value,item) => item.profession.name.includes(value),
            render: (profession) => <Text key={profession._id}>{profession.name}</Text>,
        },
        {
            title: 'Встретился раз',
            dataIndex: 'completedMeetings',
            key: '_id',
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: 'Оценка',
            dataIndex: 'rate',
            key: '_id',
            render: (text) => <Text>{text}</Text>,
            sorter: (a, b) => a.rate - b.rate,
        },
        {
            title: "Избранное",
            dataIndex: 'bookmark',
            key: '_id',
            render: (b, id) => <Button type='text' shape="round"
                                       onClick={() => handleElect(id._id)}>{handleElectIcon(b)}</Button>
        },
        {
            dataIndex: '_id',
            render: (id) =>
                id.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleDelete = (id) => {
        const data = dataSours.filter(item => item._id !== id)
        setUsers(data)
    }

    return (
        <div>
            <Row justify="center">
                <Text mark strong="bold">{title()}</Text>
            </Row>
            <br/>
            <Row justify="center">
                <Col>
                    <Table   dataSource={dataSours}
                             columns={columns}
                    pagination={{
                        pageSize: 5
                    }}
/>
                </Col>
            </Row>

        </div>
    )
}


export default Users;