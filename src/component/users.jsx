import api from "./api";
import {useState} from "react";
import {Button, Col, Popconfirm, Row, Table, Tag} from 'antd';
import {Typography} from 'antd';
const {Text} = Typography;


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const dataSours = users.map(d => ({...d, key: d._id}))

   function title() {
    return  dataSours.length > 4 ? `${dataSours.length} человек тусанет с тобой сегодня!` : `${dataSours.length} человека тусанут с тобой сегодня!`
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
                                {q.name.toUpperCase()}
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
            sorter: (a,b) => a.rate - b.rate,
        },
        {
            dataIndex: 'dataSours',
            key: 'dataSours',
        },
        {
            dataIndex: '_id',
            render: ( id) =>
                id.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                ) : null,
        },

    ];
    const handleDelete = (id) => {
        const data = dataSours.filter(item => item._id !==id)
        setUsers(data)
    }

    return (
        <div  >
            <Row  justify="center">
                <Text  mark strong="bold">{title()}</Text>
            </Row>
            <br/>
            <Row justify="center">
                <Col >
                    <Table dataSource={dataSours} columns={columns}/>;
                </Col>

            </Row>

        </div>
    )
}


export default Users;