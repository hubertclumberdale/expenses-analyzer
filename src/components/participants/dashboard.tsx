import ParticipantList from "@/components/participants/participant-list";
import { useParticipantsContext } from "@/contexts/participants";
import Link from "next/link";
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import { debounce } from "lodash";

const Dashboard = () => {
  const {
    participants,
    loading,
    createParticipant,
    refreshParticipants,
    deleteParticipant,
  } = useParticipantsContext();

  const createEmptyParticipant = debounce(() => {
    createParticipant({
      name: "",
      incomes: [],
    });
  }, 500);

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>
            <Link href="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Participants</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={createEmptyParticipant}>Add a new Participant</Button>
        <hr></hr>
        <Row>
          <h4>Existing participants:</h4>
          {loading && (
            <Col className="my-3">
              <p>Loading participants...</p>
            </Col>
          )}
          <ParticipantList
            participants={participants}
            onDelete={({ participant }) => {
              deleteParticipant(participant);
              refreshParticipants();
            }}
          ></ParticipantList>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
