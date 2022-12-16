import "./Upload.css"
import { Form, Button, message, Upload } from 'antd';
import FilesSent from "../../Assets/Files sent-amico.png";

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadFun = ()=>{
    return (
        <div className="upload-cont">
            <img alt="Files sent" src={FilesSent} className="upload-img"/>
            <Upload {...props}>
                <Button >Click to Upload</Button>
            </Upload>
            <span className="available">Available formats: mp3</span>
        </div>
    )
}

export default UploadFun;