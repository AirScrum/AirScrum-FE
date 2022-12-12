import 'rc-footer/assets/index.css';
import Logo from "../../assets/Air_scrum-removebg-preview 1.png"
import {Container, Col, Row, Button, ListGroup, ListGroupItem} from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Footer.css"
const FooterBar = ()=>{
    var currentYear = new Date().getFullYear()
    return (
        <footer>
        <Container fluid className='footer mt-5'>
            <Row className='justify-content-center pt-3'>
                <Col sm={4} md={4} className="footer-logo">
                    <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Link to={"/"}>
                        <img
                            title='Groove Street, Home'
                            alt='Logo'
                            src={Logo}
                        >
                        </img>
                    </Link>
                    </div>
                </Col>
                <Col sm={4} md={4}>
                    <h3 className='main-text-color'>
                        Site Map
                    </h3>
                    <ListGroup className={"SiteMap-list-group"} title='SiteMap'>
                        <ListGroupItem>
                            <Link to={"/"}>
                                {"Home"}
                            </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={"/about"}>
                                {"About"}
                            </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={"/login"}>
                                {"Login"}
                            </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={"/signup"}>
                                {"Sign Up"}
                            </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Link to={"/Upload"}>
                                {"Upload"}
                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col sm={4} md={4}>
                    <h3 className='main-text-color'>
                        {"Contact Us"}
                    </h3>
                </Col>
            </Row>
            <hr></hr>
            <Row className='justify-content-center mt-2'>
                <Col sm={12} className="text-center">
                    <p>Copyright Air Scrum © {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
    )
}

export default FooterBar;