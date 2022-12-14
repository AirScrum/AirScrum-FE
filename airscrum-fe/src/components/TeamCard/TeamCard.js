import { Card } from "react-bootstrap";
import "./TeamCard.css";
const TeamCard = (props) => {
  const { name, avatar, role, job } = props;
  return (
    <Card id={name} className={"cards-default mb-5"}>
      <Card.Body>
        <h6 className={"p-3"}>{role}</h6>
        <h2>{name}</h2>
        <img src={avatar} alt="avatar" className={"avatar"}></img>
        <p>{job}</p>
      </Card.Body>
      <Card.Footer>
        
      </Card.Footer>
    </Card>
  );
};

export default TeamCard;
