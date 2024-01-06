import { useParticipantsContext } from "@/contexts/participants";
import { Participant } from "@/types/types";
import { Form } from "react-bootstrap";

const ParticipantDropdown = ({
  onParticipantSelect,
  selectedParticipantId,
}: {
  onParticipantSelect: (participant: Participant) => void;
  selectedParticipantId?: string;
}) => {
  const { participants } = useParticipantsContext();

  const selectParticipant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const participant = participants.find(
      (participant) => participant._id?.toString() === e.target.value
    );
    if (participant) {
      onParticipantSelect(participant);
    }
  };
  return (
    <Form.Select
      onChange={selectParticipant}
      value={selectedParticipantId}
      aria-label="Default select example"
    >
      <option>Select an existing participant</option>
      {participants.map((participant) => (
        <option
          key={participant._id?.toString()}
          value={participant._id?.toString()}
        >
          {participant.name}
        </option>
      ))}
    </Form.Select>
  );
};
export default ParticipantDropdown;
