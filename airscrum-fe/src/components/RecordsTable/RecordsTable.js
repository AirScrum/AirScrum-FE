import { Badge, Space, Table, Tag } from 'antd';
import PopUpUserStoryDetail from '../PopUpUserStoryDetails/PopUpUserStoryDetails';
import { Modal } from "antd";
import { useState } from 'react';
const RecordsTable = () => {
  const [showPopUserStoryEdit, setShowPopUserStoryEdit] = useState(false)
  const [editUserStoryInput, setEditUserStoryInput] = useState({})

  const handleOk = () => {
    /**
     * TODO Update the user stories data using its ID.
     */
    setShowPopUserStoryEdit(false)
  };

  const handleCancel = () => {
    setShowPopUserStoryEdit(false);
  };

  const onEditButtonClick = (record) => {
    setEditUserStoryInput({ ...record })
    setShowPopUserStoryEdit(true)

  }
  const expandedRowRender = () => {
    const nestedColumns = [
      {
        title: 'id',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        render: (_, { priority }) => {
          var color = 'green'
          if (priority === 'High') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={priority}>
              {priority.toUpperCase()}
            </Tag>
          )
        }
      },
      {
        title: 'Status',
        key: 'status',
        render: (_, { status }) => (
          <span>
            <Badge status="success" />
            <span className='ps-2'>{status}</span>
          </span>
        ),
      },
      {
        title: 'Effort',
        dataIndex: 'effort',
        key: 'effort'
      },
      {
        title: 'Acceptance Criteria',
        dataIndex: 'criteria',
        key: 'criteria',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={()=>onEditButtonClick(record)}>Edit</a>
          </Space>
        ),
      },
    ];
    const userStoriesData = [];
    for (let i = 0; i < 3; ++i) {
      userStoriesData.push({
        key: i.toString(),
        title: 'Login Functionality',
        priority: 'High',
        status: 'Finished',
        description:'As I user, I want to be able to login',
        criteria:'Logged in to the system',
        effort:'3 User Story points'
      });
    }
    return <Table columns={nestedColumns} dataSource={userStoriesData} pagination={false} />;
  };
  const columns = [
    {
      /**
       * TODO Either change this to id or keep it
       * Make sure how it is retrieved from the server.
       */
      title: 'id',
      dataIndex: 'key',
      key: 'key'
    }
    ,
    {
      title: 'Meeting Date',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
    },
    {
      title: 'Meeting Title',
      dataIndex: 'meetingTitle',
      key: 'meetingTitle',
    },
    {
      title: 'Number of user stories',
      dataIndex: 'userStoriesCount',
      key: 'userStoriesCount',
    },
    {
      title: 'Owner',
      dataIndex: 'user',
      key: 'user',
    }
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    /**
     * TODO Pass the data to the column (RecordsColumn)
     * in this format.
     */
    data.push({
      key: i.toString(),
      dataIndex: new Date().toISOString(),
      meetingTitle: 'First meeting ever',
      userStoriesCount: 28,
      user: 'Shehab',
    });
  }
  return (
    <>
      <Modal
        title="User Story Update"
        open={showPopUserStoryEdit}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "ok-btn-modal" }}
        cancelButtonProps={{ className: "cancel-btn-modal" }}
      >
        <PopUpUserStoryDetail
          description={editUserStoryInput.description}
          storyid={editUserStoryInput.id}
          storytitle={editUserStoryInput.title}
          status={editUserStoryInput.status}
          acceptance={editUserStoryInput.criteria}
          effort={editUserStoryInput.effort}
          priority={editUserStoryInput.priority}
        />
      </Modal>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,

        }}
        dataSource={data}
        size="large"
      />
    </>
  );
};
export default RecordsTable;