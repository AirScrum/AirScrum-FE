import FlyingImage from "../../assets/Flying around the world-rafiki.svg"
import SignUpBro from "../../assets/Sign up-bro.png";
import {Container, Col, Row, Button} from "react-bootstrap"
import "./Home.css";
const Home = ()=>{
    return (
        <>
        <Container fluid className="main-sky-color-background">
            <Row>
                <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
                    <h1 className="main-text-color text-bold fw-bold">User Stories on the AIR!</h1>
                    <p className="main-secondary-color light-rubik-font">AirScrum allows Scrum team members to generate user stories using Artificial Intelligence technology immediately from scrum meetings recordings!</p>
                    <Button className="rounded-button">Get Started</Button>
                </Col>
                <Col sm={6} className="text-center">
                    <img alt="Flying Plane" src={FlyingImage}/>
                </Col>
            </Row>
        </Container>
        <Container fluid className={"my-5"}>
        <Row>
                <Col sm={6} className="text-center my-5">
                    <img alt="SignUp Bro" style={{width:"inherit"}}src={SignUpBro}/>
                </Col>
                <Col id={"GetStarted-Container-Text"} sm={6} className="px-5">
                    <h2 className="main-text-color text-bold fw-bold">Create your account now!</h2>
                    <p className="main-text-color light-rubik-font">Sign up in simple steps and access to our awesome features 🚀</p>
                    <ul className="main-text-color light-rubik-font" >
                        <li>Upload recorded meetings (.mp3 extension).</li>
                        <li>See generated user stories.</li>
                        <li>Check uploaded requests history.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;