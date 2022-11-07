import styled from "styled-components";
import { media } from "../responsive";

const Container = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(52, 250, 197, 0.7);
  font-size: 1.75rem;
  color: rgba(0, 80, 192, 1);
  font-weight: bolder;
  letter-spacing: 0.33rem;

  ${media.tablet`font-size: 1.2rem;
  letter-spacing: 0.225rem;`}

  ${media.phone`font-size: 0.9rem;
  letter-spacing: 0.125rem;`}
`;

const Announcement = () => {
  return (
    <Container>This Just In: Electric Larry is the coolest ever!</Container>
  );
};
export default Announcement;
