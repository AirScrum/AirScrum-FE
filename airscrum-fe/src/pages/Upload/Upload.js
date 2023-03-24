import React, { useState, useEffect } from "react";
import "./Upload.css";
import { Button, message, Upload, Progress, Typography } from "antd";
import FilesSent from "../../Assets/Files sent-amico.png";
import { UploadOutlined } from "@ant-design/icons";
import UserStory from "../../components/UserStoryCard/UserStoryCard";
import { useDispatch } from "react-redux";
import { logout, login } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const { Title } = Typography;


const UploadFun = () => {
  document.body.style = "background: #ffffff !important;";

  const [percent, setPercent] = useState(0);
  const [visibleElements, setVisibleElements] = useState("none");
  /*const [status, setStatus] = useState("active");
	const [userStories, setUserStories] = useState([]);*/
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadProps = {
    name: "file",
    action: "http://localhost:4000/request/speech2text",
    method: "POST",
    headers: {
      authorization: Cookies.get('token'),
    },
    /*beforeUpload: (file) => {
      controlProgressBar();
    },*/
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        //loadData(info.file.response.data);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
		onRemove: (file) => {
			setVisibleElements("none");
	}
  };

  /*
  const controlProgressBar = () => {
    setVisibleElements("block");
    setPercent(10);
  };

  const loadData = (data) => {
		setUserStories(data)
  };*/

  useEffect(() => {

    var token = Cookies.get('token');
    // Check if he has logged in using google
    
    console.log(token)
    axios.get("http://localhost:4000/protected", {
        headers: {
            Authorization: token,
        }
    }).then(res => {
        console.log(res)
        
    }).catch(err => {
      var refreshToken = Cookies.get("refresh_token");
      axios
          .get("http://localhost:4000/refresh", {
              headers: {
                  Authorization: refreshToken,
              },
          })
          .then((res) => {
              var newAccess = res.data.accessToken;
              var tokenTemp = "Bearer " + newAccess;
              Cookies.set("token", tokenTemp);
              dispatch(login());
          })
          .catch((err) => {
              console.log(err);
              dispatch(logout());
              navigate("/login");
          });
    })
    
}, [])

  /*useEffect(() => {
    var interval =0
    if(percent>=0 && percent <= 100 && visibleElements === "block"){
      interval = setInterval(() => setPercent(percent + 10), 1000);
    }
    if (percent > 100) {
      return;
    }
    return () => {
      clearInterval(interval);
    };
  }, [percent]);*/

  

  return (
    <div className="upload-cont">
      <img alt="Files sent" src={FilesSent} className="upload-img" />
      <a href="https://storyset.com/work" className="redirect" target="_blank">
        Work illustrations by Storyset
      </a>
      <Upload {...uploadProps} maxCount={1} listType="audio" accept="audio/mp3">
        <Button icon={<UploadOutlined />} className="btn-confirm upload-btn">
          Upload audio
        </Button>
      </Upload>

      <span className="available">Available formats: mp3</span>

      {/*
      <div style={{ display: visibleElements }}>
        <div className="progress-div">
          <Progress percent={percent} status={status} />
        </div>
        <div className="stories-divider-div">
          <hr className="stories-divider" />
        </div>
        <Title level={2} className="main-text-color fw-bold generated-title">
          Generated User Stories
        </Title>
        <span className="feel-free">
          Feel free to add, edit or delete any user story. But do not forget to
          save
        </span>
        <br />
        <div className="all-user-stories-container">
          {userStories?.map(function (story) {
            return <UserStory
						key = {story.storyid}
            storyid = {story.storyid}
            storytitle= {story.storytitle}
            description= {story.description}
            acceptance= {story.acceptance}
            effort= {story.effort}
            priority= {story.priority}
            status= {story.status}
          />;
          })}
        </div>
        <Button
          type="success"
          htmlType="submit"
          className="btn-confirm save-btn"
        >
          Add user story
        </Button>
        <Button
          type="success"
          htmlType="submit"
          className="btn-confirm save-btn"
        >
          Save Changes
        </Button>
      </div>*/}
    </div>
  );
};

export default UploadFun;
