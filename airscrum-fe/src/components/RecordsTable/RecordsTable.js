import { Badge, Space, Table, Tag, Form, Button } from "antd";
import PopUpUserStoryDetail from "../PopUpUserStoryDetails/PopUpUserStoryDetails";
import { Modal } from "antd";
import { useState } from "react";
import {
  deleteMeeting,
  fetchUserStories,
  updateUserStory,
  deleteUserStory,
} from "../../network/network";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/refetchReducer";
const RecordsTable = (props) => {
  const { meetingData, token } = props;
  const [showPopUserStoryEdit, setShowPopUserStoryEdit] = useState(false);
  const [showPopUserStoryCreate, setShowPopUserStoryCreate] = useState(false);
  const [editUserStoryInput, setEditUserStoryInput] = useState({});
  const [nestedData, setNestedData] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [editUserStoryForm] = Form.useForm();
  const [createUserStoryForm] = Form.useForm();
  const [createUserStoryMeetingID, setCreateUserStoryMeetingID] =
    useState(null);
  const dispatch = useDispatch();

  // const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const modifiedData = meetingData.map((item) => ({
    ...item,
    key: item._id,
  }));
  const handleOk = async () => {
    const formValues = editUserStoryForm.getFieldsValue();
    console.log(`formValues`, formValues);
    const response = await updateUserStory(
      token,
      editUserStoryInput._id,
      formValues
    );
    console.log(`updateUserStory`, response);
    if (response.status === 200) {
      alert("Updated user story successfully!");
      dispatch(increment());
      window.location.reload();
    }
    setShowPopUserStoryEdit(false);
  };

  const handleCancel = () => {
    setShowPopUserStoryEdit(false);
  };
  const handleOkCreate = async () => {
    const createFormValues = createUserStoryForm.getFieldsValue();
    const createFormErrors = createUserStoryForm
      .getFieldsError()
      .flatMap((field) => field.errors);
    if (createFormErrors.length > 0) {
      alert(createFormErrors);
    } else {
      console.log(`el meeting ID`, createUserStoryMeetingID);
      console.log(createFormValues);
      setShowPopUserStoryCreate(false);
    }
  };
  const handleCancelCreate = () => {
    setShowPopUserStoryCreate(false);
  };

  const onCreateNewUserStory = (meetingID) => {
    console.log(meetingID);
    setCreateUserStoryMeetingID(meetingID);
    setShowPopUserStoryCreate(true);
  };

  const onEditButtonClick = (record) => {
    console.log(record);
    setEditUserStoryInput({ ...record });
    setShowPopUserStoryEdit(true);
  };
  const onDeleteUserStoryButtonClick = async (record) => {
    console.log(record);
    try {
      const response = await deleteUserStory(token, record._id);
      console.log(response);
      if (response.status === 200) {
        alert("UserStory has been removed successfully");
        dispatch(increment());
        window.location.reload();
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(`Something has gone wrong: ${error}`);
    }
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
        title: "UserStory Status",
        dataIndex: "userStoryStatus",
        key: "userStoryStatus",
      },
      {
        title: "Acceptance Criteria",
        dataIndex: "AcceptanceCriteria",
        key: "AcceptanceCriteria",
      },
      {
        title: "UserStory Effort",
        dataIndex: "userStoryEffort",
        key: "userStoryEffort",
      },
      {
        title: "UserStory Priority",
        dataIndex: "userStoryPriority",
        key: "userStoryPriority",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => onEditButtonClick(record)}>Edit</a>
            <a onClick={() => onDeleteUserStoryButtonClick(record)}>Delete</a>
          </Space>
        ),
      },
    ];
    const data = nestedData[record._id];
    return (
      <>
        <Table
          loading={isLoading[record._id] && !data}
          columns={nestedColumns}
          dataSource={nestedData[record._id]}
          pagination={false}
        />
        <Button
          style={{ paddingBottom: "36px" }}
          onClick={() => onCreateNewUserStory(record._id)}
        >
          Add new user story
        </Button>
      </>
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
        return (
          <a
            onClick={async () => {
              try {
                const response = await deleteMeeting(token, record._id);
                if (response.status === 200) {
                  alert("Deleted meeting successfully");
                  dispatch(increment());
                } else {
                  throw new Error(response.data);
                }
              } catch (error) {
                console.error(error);
                alert(`Error deleting a meeting: ${error}`);
              }
            }}
          >
            Delete
          </a>
        );
      },
    },
  ];
  const handleExpand = async (expanded, record) => {
    if (expanded) {
      setIsLoading({
        [record._id]: true,
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
              userStoryStatus: userStory?.userStoryStatus,
              AcceptanceCriteria: userStory?.AcceptanceCriteria,
              userStoryEffort: userStory?.userStoryEffort,
              userStoryPriority: userStory?.userStoryPriority,
            };
          }),
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading({
          [record._id]: false,
        });
      }
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
          isEdit={true}
          userStoryForm={editUserStoryForm}
          description={editUserStoryInput.userStoryDescription}
          storyid={editUserStoryInput._id}
          storytitle={editUserStoryInput.userStoryTitle}
          status={editUserStoryInput.userStoryStatus}
          acceptance={editUserStoryInput.AcceptanceCriteria}
          effort={editUserStoryInput.userStoryEffort}
          priority={editUserStoryInput.userStoryPriority}
        />
      </Modal>
      <Modal
        title="User Story Update"
        open={showPopUserStoryCreate}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
        okButtonProps={{ className: "ok-btn-modal" }}
        cancelButtonProps={{ className: "cancel-btn-modal" }}
      >
        <PopUpUserStoryDetail
          isEdit={false}
          userStoryForm={createUserStoryForm}
        />
      </Modal>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          onExpand: handleExpand,
        }}
        dataSource={modifiedData}
        size="large"
      />
    </>
  );
};
export default RecordsTable;
