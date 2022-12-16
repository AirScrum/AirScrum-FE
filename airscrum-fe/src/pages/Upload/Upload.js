import React, { useState } from 'react';
import "./Upload.css"
import { Button, message, Upload , Progress, Typography } from 'antd';
import FilesSent from "../../Assets/Files sent-amico.png";
import { UploadOutlined } from '@ant-design/icons';
import UserStory from "../../components/UserStoryCard/UserStoryCard";
const { Title } = Typography;

const UploadFun = ()=>{

    const [fileList, setFileList] = useState([]);
    const [mode, setMode] = useState(false);
	const [percent,setPercent] = useState(30);
	const [status,setStatus] = useState("active");

    const uploadProps = {
        multiple: mode,
        fileList,
        beforeUpload: (file, filesArray) => {
            let count = 0;
            let files = filesArray.filter((file) => {
                const isPNG = file.type === 'image/png';
                !isPNG && count++;
                return isPNG;
            });

            if (count > 0) {
                setFileList([]);
                message.error(`${count} Files Not Uploaded. Please Upload mp3 File`);
                return false;
            }

            // If Mode Is Multiple, Simply Store All Files
            if (mode) {
                setFileList(files);
            } else {
                setFileList((prev) => {
                    let newFiles = [...prev];
                    newFiles.push(file);
                    return newFiles;
                });
            }
            return true;

            // Using Promise
            // return new Promise((resolve, reject) => {
            //  // If Not PNG, Reject The Promise
            //  if (!isPNG) return reject(false);

            //  // Else Set The FileList & Send The File
            //  setFileList([file]);
            //  resolve(file);
            // });
        },
        onRemove: (file) => {
            setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
        }
    };

    console.log(fileList);
    return (
        <div className="upload-cont">
            <img alt="Files sent" src={FilesSent} className="upload-img"/>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined/>} className="btn-confirm upload-btn" >Upload audio</Button>
            </Upload>
            <span className="available">Available formats: mp3</span>
			<div className='progress-div'>
				<Progress percent={percent} status={status} />
			</div>
			<div className='stories-divider-div'>
				< hr className='stories-divider'/>
			</div>
			<Title level={2} className="main-text-color fw-bold generated-title">Generated User Stories</Title>
			<span className="feel-free">Feel free to add, edit or delete any user story. But do not forget to save</span>
            <br/>
            <div className='all-user-stories-container'>
                <UserStory/>
                <UserStory/>
                <UserStory/>
                <UserStory/>
                <UserStory/>
                <UserStory/>
            </div>
			<Button type="success" htmlType="submit" className="btn-confirm save-btn">
                Save Changes
            </Button>
        </div>
    )
}

export default UploadFun;