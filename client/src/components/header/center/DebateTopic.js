import styled from "styled-components";

const StyledTopic = styled.span`
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: -0.05rem;
  
  color: #000000;
`;

function DebateTopic({ topic }) {
  return (
    <StyledTopic>{topic}</StyledTopic>
  );
}

export default DebateTopic;