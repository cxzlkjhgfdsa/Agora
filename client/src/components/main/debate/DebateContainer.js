import styled from "styled-components";

function DebateContainer(props) {



    return (
        <StyledDebateContainer>
            
        </StyledDebateContainer>
    )
}

export default DebateContainer;

const StyledDebateContainer = styled.div`
    height: ${(props) => props.height};
    background-color: ${(props) => props.bgColor};
`