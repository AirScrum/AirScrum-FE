import "./PopUpUserStoryDetails.css";
import { Form, Input } from "antd";
const { TextArea } = Input;

const PopUpUserStoryDetail = () => {
  return (
    <div className="story-detail-container">
      <div className="header-modal">
        <span className="story-id">924</span>
        <span className="story-title">User Story Title 1</span>
      </div>
      <hr />
      <Form
        name="basicform"
        onFinishFailed={() => alert("Failed to submit")}
        onFinish={() => alert("Form Submitted")}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item label="Description" name="desc" colon="" className="popup-label">
          <TextArea
            rows={4}
            placeholder="As a user I want to be able to login to the system, by using email and password"
            maxLength={200}
            className="logo-user without-logo"
          />
        </Form.Item>

				<Form.Item label="Acceptance Criteria" name="acc-crit" colon="" className="popup-label">
          <TextArea
            rows={4}
            placeholder="If the user's login failed, the user should be shown an error message showing why it is rejected"
            maxLength={200}
            className="logo-user without-logo"
          />
        </Form.Item>

        <Form.Item
          label="Effort"
          name="effort"
          className="popup-label"
          colon=""
        >
          <Input
            placeholder="3 story points"
            className="logo-user without-logo"
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          className="popup-label"
          colon=""
        >
          <Input placeholder="High" className="logo-user without-logo" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PopUpUserStoryDetail;
