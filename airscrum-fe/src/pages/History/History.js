import { Container, Row, Col } from "react-bootstrap";
import { Input } from "antd";
import "./History.css"
import RecordsTable from "../../components/RecordsTable/RecordsTable";
const { Search } = Input;
const History = () => {
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