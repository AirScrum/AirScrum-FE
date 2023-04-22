import { Container, Row, Col } from "react-bootstrap";
import { Input } from "antd";
import "./History.css";
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { fetchMeetings, fetchMeetingData } from "../../network/network";
const { Search } = Input;
const History = () => {
  document.body.style = "background: #ffffff !important;";
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meetingData, setMeetingData] = useState([]);
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();
  const refetchCount = useSelector((state) => state.refetchState.value);
  useEffect(() => {
    var token = Cookies.get("token");
    // Check if he has logged in using google
    axios
      .get(`${process.env.REACT_APP_KIA}/protected`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setUserID(res.data?.user?.id);
        dispatch(login());
        setToken(token);
      })
      .catch((err) => {
        var refreshToken = Cookies.get("refresh_token");
        axios
          .get(`${process.env.REACT_APP_KIA}/refresh`, {
            headers: {
              Authorization: refreshToken,
            },
          })
          .then((res) => {
            var newAccess = res.data.accessToken;
            var tokenTemp = "Bearer " + newAccess;
            Cookies.set("token", tokenTemp);
            setToken(newAccess);
            dispatch(login());
          })
          .catch((err) => {
            console.log(err);
            dispatch(logout());
            navigate("/login");
          });
      });
  }, []);

  useEffect(() => {
    async function fetchMeetingData() {
      if (token) {
        try {
          const response = await fetchMeetings(token);
          setIsLoading(false);
          console.log(response.data);
          setMeetingData(response.data?.meetings);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    }
    fetchMeetingData();
  }, [token, refetchCount]);

  const onSearch = async (value) => {
    setIsLoading(true);
    try {
      if (value) {
        const response = await fetchMeetingData(token, value);
        const modifiedResponse = [response.data?.meetings];
        console.log(modifiedResponse);
        setMeetingData(modifiedResponse);
      } else {
        const response = await fetchMeetings(token);
        console.log(response.data);
        setMeetingData(response.data?.meetings);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col sm={12}>
            <h2>History</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <p className="light-rubik-font">
              Access your previously uploaded records and user stories generated
              from them
            </p>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container>
            <Row>
              <Col sm={12}>
                <Search
                  placeholder="Search by record meeting ID"
                  allowClear
                  onSearch={onSearch}
                  size="large"
                />
              </Col>
            </Row>
          </Container>
          <br></br>
          <Container className="records-table-container">
            <Row>
              <Col sm={12}>
                <RecordsTable
                  token={token}
                  meetingData={meetingData}
                  userID={userID}
                ></RecordsTable>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default History;
