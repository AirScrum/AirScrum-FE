import { Badge, Space, Table, Tag } from "antd";
import PopUpUserStoryDetail from "../PopUpUserStoryDetails/PopUpUserStoryDetails";
import { Modal } from "antd";
import { useState } from "react";
import { fetchUserStories } from "../../network/network";
const RecordsTable = (props) => {
  const { meetingData, token } = props;
  const [showPopUserStoryEdit, setShowPopUserStoryEdit] = useState(false);
  const [editUserStoryInput, setEditUserStoryInput] = useState({});
  const [nestedData, setNestedData] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const handleOk = () => {
    /**
     * TODO Update the user stories data using its ID.
     */
    setShowPopUserStoryEdit(false);
  };

  const handleCancel = () => {
    setShowPopUserStoryEdit(false);
  };

  const onEditButtonClick = (record) => {
    setEditUserStoryInput({ ...record });
    setShowPopUserStoryEdit(true);
  };
  const expandedRowRender = (record) => {
    const nestedColumns = [
      {
        title: "UserStory ID",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "UserStory Title",
        dataIndex: "userStoryTitle",
        key: "userStoryTitle",
      },
      {
        title: "UserStory Description",
        dataIndex: "userStoryDescription",
        key: "userStoryDescription",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => onEditButtonClick(record)}>Edit</a>
          </Space>
        ),
      },
    ];
    const data = nestedData[record._id];
    return (
      <Table
        loading={isLoading[record._id] && !data}
        columns={nestedColumns}
        dataSource={nestedData[record._id]}
        pagination={false}
      />
    );
  };
  const columns = [
    {
      title: "Meeting ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Meeting Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      render: (text, record, index) => {
        return <a>Delete</a>;
      },
    },
  ];
  const handleExpand = async (expanded, record) => {
    setIsLoading({
      [record.id]: true,
    });
    const meetingID = record._id;
    try {
      const response = await fetchUserStories(token, meetingID);
      setNestedData((state) => ({
        ...state,
        [record._id]: response.data?.data.map((userStory) => {
          return {
            _id: userStory._id,
            userStoryTitle: userStory.userStoryTitle,
            userStoryDescription: userStory.userStoryDescription,
          };
        }),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({
        [record.id]: false,
      });
    }
  };

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
          description={editUserStoryInput.userStoryDescription}
          storyid={editUserStoryInput._id}
          storytitle={editUserStoryInput.userStoryTitle}
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
          onExpand: handleExpand,
        }}
        dataSource={meetingData}
        size="large"
      />
    </>
  );
};
export default RecordsTable;
