import { Container, Row, Col } from "react-bootstrap";
import { Input } from "antd";
import "./History.css"
import RecordsTable from "../../components/RecordsTable/RecordsTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const { Search } = Input;
const History = () => {

    document.body.style = 'background: #ffffff !important;';
    const dispatch = useDispatch();
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        var token = Cookies.get('token');
        // Check if he has logged in using google
        
        //console.log(token)
        setToken(token);
        axios.get("http://localhost:4000/protected", {
            headers: {
                Authorization: token,
            }
        }).then(res => {
            console.log(res)
            
        }).catch(err => {
            console.log(err)
            dispatch(logout())
            navigate('/login')
        })
        
    }, [])

    useEffect(() => {

        if(token){
            axios
            .get("http://localhost:4000/history", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    
    }, [token]);
    
    const onSearch = ()=>{
        /**
         * TODO make GET request on the User Management Service
         * on the Search endpoint
         */
    }
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
                        <p className="light-rubik-font">Access your previously uploaded records and user stories generated from them</p>
                    </Col>
                </Row>
            </Container>
            <hr></hr>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Search
                            placeholder="Search by record meeting title, date, or anything else!"
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
                        <RecordsTable></RecordsTable>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default History;