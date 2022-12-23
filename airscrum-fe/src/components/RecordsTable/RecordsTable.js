import { Badge, Space, Table, Tag } from 'antd';
const RecordsTable = () => {
  const expandedRowRender = () => {
    const nestedColumns = [
      {
        title: 'id',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Title',
        dataIndex: 'userStoryTitle',
        key: 'userStoryTitle',
      },
      {
        title: 'Priority',
        dataIndex: 'userStoryPriority',
        key: 'userStoryPriority',
        render:(_,{priority})=>{
          var color='green'
          if(priority==='High'){
            color='volcano'
          }
          return(
            <Tag color={color} key={priority}>
            {priority.toUpperCase()}
          </Tag>
          )
        }
      },
      {
        title: 'Status',
        key: 'status',
        render: (_,{status}) => (
          <span>
            <Badge status="success" />
            <span className='ps-2'>{status}</span>
          </span>
        ),
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_,record) => (
          <Space size="middle">
            {/**
             * TODO onClick, open PopUpUserStoryModal
             */}
            <a>Edit</a>
        </Space>
        ),
      },
    ];
    const userStoriesData = [];
    for (let i = 0; i < 3; ++i) {
      userStoriesData.push({
        key: i.toString(),
        userStoryTitle: 'Login Functionality',
        priority: 'High',
        status: 'Finished',
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
      title:'id',
      dataIndex:'key',
      key:'key'
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