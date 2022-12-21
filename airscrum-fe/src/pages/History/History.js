import { Container, Row, Col } from "react-bootstrap";

const History = () =>{
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
                    {/**TODO Add input search bar here that fetches User stories or Records with specific description */}
                </Col>
            </Row>
        </Container>
    </>
)
}

export default History;