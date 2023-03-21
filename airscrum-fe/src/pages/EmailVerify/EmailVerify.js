import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../Assets/success.png";
import './EmailVerify.css'

function EmailVerify() {
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:4000/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
			}
		};
		verifyEmailUrl();
	}, []);

	return (
		<div>
			{validUrl ? (
				<div className='email-verify-container'>
					<img src={success} alt="success_img" className='email-verify-success-img' />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className='green_btn'>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default EmailVerify;