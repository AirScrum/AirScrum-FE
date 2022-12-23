import { Container, Row, Col } from "react-bootstrap";
import "./About.css";
import TeamCard from "../../components/TeamCard/TeamCard";
import mazen from '../../Assets/mazen.PNG'
const About = () => {
  return (
    <>
      <Container fluid className={"airscrum-history mb-5"}>
        <Row>
          <Col sm={12}>
            <h1 className="airscrum-about-title">{`AirScrum - Scrum on the AIR!`}</h1>
            <h3 className="light-rubik-font">
              {
                "We are passionate Computer Engineering students graduating in 2023."
              }
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className={"airscrum-team"}>
        <Row>
          <Col sm={12}>
            <h3 className="airscrum-about-title">Meet the team 👋</h3>
            <blockquote className="callout quote EN rubik-font">
              Our team members are well experienced Software Engineers and Data
              Scientists. They are always open to any internship or full-time
              job vacancies. Hiring any of them will be of a great addition to
              your teams.
              <cite> - Our Team</cite>
            </blockquote>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col sm={12} md={12} lg={3}>
            <TeamCard
              role={"Software Engineering"}
              name={"Shehab Adel"}
              job="Computer Engineering student"
              avatar={"https://res.cloudinary.com/stack-info/image/upload/v1666967187/team/Shehab/Shehab.jpg"}
            />
          </Col>
          {
            <Col sm={12} md={12} lg={3}>
              <TeamCard
                role={"Data Science"}
                name={"Zyad Yakan"}
                job="Computer Engineering student"
              />
            </Col>
          }
          {
            <Col sm={12} md={12} lg={3}>
              <TeamCard
                role={"Software Engineering"}
                name={"Mazen Mahmoud"}
                job="Computer Engineering student"
                avatar={mazen}
              />
            </Col>
          }
          {
            <Col sm={12} md={12} lg={3}>
              <TeamCard
                role={"Data Science"}
                name={"Sherif Naeem"}
                job="Computer Engineering student"
              />
            </Col>
          }
        </Row>
        <Row>
          <Col sm={12}>
            <h3 className="airscrum-about-title">Contact us 🤙</h3>
            <blockquote className="callout quote EN rubik-font">
              {
                "For any issues or casual talk, you can contact anyone of the team through their Linkedin"
              }
              <span></span>
              <cite> - Our Team</cite>
            </blockquote>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
