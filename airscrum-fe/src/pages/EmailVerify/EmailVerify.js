import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../Assets/success.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./EmailVerify.css";

function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_KIA}/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setIsLoading(false);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmailUrl();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {validUrl ? (
            <div className="email-verify-container">
              <img
                src={success}
                alt="success_img"
                className="email-verify-success-img"
              />
              <h1>Email verified successfully</h1>
              <Link to="/login">
                <button className="green_btn">Login</button>
              </Link>
            </div>
          ) : (
            <h1>404 Not Found</h1>
          )}
        </>
      )}
    </div>
  );
}

export default EmailVerify;
