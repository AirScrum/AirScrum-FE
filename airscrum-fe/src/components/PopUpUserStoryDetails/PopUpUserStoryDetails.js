import "./PopUpUserStoryDetails.css";
import { Form, Input, Modal } from "antd";
const { TextArea } = Input;
const PopUpUserStoryDetail = (props) => {
  const {
    storyid,
    storytitle,
    description,
    status,
    acceptance,
    effort,
    priority,
    userStoryForm,
    isEdit,
  } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="story-detail-container">
      <Form
        form={userStoryForm}
        name="userStoryForm"
        onFinishFailed={() => alert("Failed to submit")}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <div className="header-modal">
          {isEdit ? <span className="story-id">{storyid}</span> : <></>}
          <Form.Item
            name="userStoryTitle"
            colon=""
            initialValue={storytitle}
            rules={[
              { required: true, message: "Please enter user story title!" },
            ]}
            requiredMark={true}
          >
            <Input
              placeholder="User story title"
              className="logo-user without-logo story-title wrap-width"
            />
          </Form.Item>
        </div>
        <hr />
        <Form.Item
          label="Description"
          name="userStoryDescription"
          colon=""
          className="popup-label"
          initialValue={description}
          rules={[
            { required: true, message: "Please enter user story description!" },
          ]}
          requiredMark={true}
        >
          <TextArea
            rows={4}
            placeholder="As a user I want to be able to login to the system, by using email and password"
            maxLength={200}
            className="logo-user without-logo"
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="userStoryStatus"
          className="popup-label"
          colon=""
          initialValue={status}
        >
          <Input placeholder="To do" className="logo-user without-logo" />
        </Form.Item>
        <Form.Item
          label="Acceptance Criteria"
          name="AcceptanceCriteria"
          colon=""
          className="popup-label"
          initialValue={acceptance}
        >
          <TextArea
            rows={4}
            placeholder="If the user's login failed, the user should be shown an error message showing why it is rejected"
            maxLength={200}
            className="logo-user without-logo"
          />
        </Form.Item>
        <Form.Item
          label="Effort"
          name="userStoryEffort"
          className="popup-label"
          colon=""
          initialValue={effort}
        >
          <Input
            placeholder="3 story points"
            className="logo-user without-logo"
          />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="userStoryPriority"
          className="popup-label"
          colon=""
          initialValue={priority}
        >
          <Input placeholder="High" className="logo-user without-logo" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PopUpUserStoryDetail;
