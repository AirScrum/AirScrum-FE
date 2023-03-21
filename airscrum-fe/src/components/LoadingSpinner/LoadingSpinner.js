import "./LoadingSpinner.css";
import myLoadingGif from "../../Assets/loading-spinner-logo.gif";

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <img src={myLoadingGif} alt="loading..." className="spinner-loading-gif" />
        </div>
    );
};

export default LoadingSpinner;
