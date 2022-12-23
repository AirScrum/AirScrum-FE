import React, { useState } from "react";
import "./UserStoryCard.css";
import StoryLogo from "../../Assets/icons8-open-book-50.png";
import EffortLogo from "../../Assets/icons8-effort-50.png";
import Delete from "../../Assets/icons8-remove-24.png";
import EditIc from "../../Assets/icons8-edit-48.png";
import { Modal } from "antd";
import PopUpUserStoryDetails from "../PopUpUserStoryDetails/PopUpUserStoryDetails"

function UserStory() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  /**
   * 
   * TODO Allow passing the data through props.
   * 
   */
  return (
    <div>
      <div className="user-story-card">
        <div className="story-row">
          <div>
            <img src={StoryLogo} alt="open book" className="story-logo" />
            <h2 className="story-title">User Story Title 1</h2>
          </div>
          <div>
            <h2 className="story-id">924</h2>
          </div>
        </div>
        <br />
        <div className="story-row">
          <div>
            <img src={EffortLogo} alt="effor logo" className="story-logo" />
            <h2 className="story-title">3 story points</h2>
          </div>
          <div>
            <img src={Delete} alt="effort logo" className="story-logo-margin" />
            <img
              src={EditIc}
              alt="effort logo"
              className="story-logo-margin"
              onClick={showModal}
            />
            <Modal
              title="User Story Description"
              open={open}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{ className: "ok-btn-modal" }}
              cancelButtonProps={{ className: "cancel-btn-modal" }}
            >
              <PopUpUserStoryDetails></PopUpUserStoryDetails>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStory;
