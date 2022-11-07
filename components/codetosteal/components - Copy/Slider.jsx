import { useState } from "react";
import styled from "styled-components";
import { ArrowLeftTwoTone, ArrowRightTwoTone } from "@material-ui/icons";
import { sliderItems } from "../data";
import { media } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${media.tablet`height: 50vh;
  `}

  ${media.phone`height: 40vh;
  align-items: center;
  `}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;

  ${media.tablet`height: 50vh;
  `}
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #${(props) => props.bg};

  ${media.tablet`height: 50vh;
  `}
`;

const ImgContainer = styled.div`
  height: 100%;
  margin: 1.5rem;
  background-color: transparent;

  ${media.tablet`margin: auto;`}
`;

const Image = styled.img`
  flex: 1;
  height: 80%;
  width: 80%;
  background-color: transparent;
  padding-left: 5vw;
  padding-top: 5vw;

  ${media.tablet`
  max-width: 60%;
  max-height: 80%;
  margin: auto;
  position: relative;
  top: 5%;
  left: 13%;
  `}

  ${media.phone`
  max-width: 50%;
  max-height: 70%;
  left: 20%;
  `}
`;

const InfoContainer = styled.div`
  flex: 1;
  background-color: transparent;
  padding-top: 2vw;
  padding-right: 10vw;

  ${media.tablet`
  width: 100%;
  position: relative;
  top: 5%;
  right: 2%;
  `}

  ${media.phone`
  gap: 0.1rem;
  top: 0%;
  right: 10%;
  `}
`;

const Title = styled.h1`
  font-size: 3rem;
  background-color: transparent;

  ${media.tablet`font-size: 1.75rem;
    `}

  ${media.phone`font-size: 1.1rem;
    `}
`;

const Description = styled.p`
  margin: 1rem 0;
  flex: 1;
  font-size: 2rem;
  font-weight: bold;
  background-color: transparent;

  ${media.tablet`font-size: 1.25rem;
  margin: 0.5rem 0;
  `}

  ${media.phone`font-size: 0.7rem;
  margin: 0.25rem 0;
  `}
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1.25rem;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid rgba(247, 118, 5, 1);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: rgba(247, 118, 5, 1);
    color: white;
  }

  ${media.tablet`font-size: 1rem;
  margin: 0 0.5rem 0 0.5rem;
  padding: 0.5rem;
  `}

  ${media.phone`font-size: 0.6rem;
  margin: 0 0.25rem 0 0.25rem;
  padding: 0.25rem;
  `}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #34fac5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftTwoTone style={{ backgroundColor: "#34fac5" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>WHAT A DEAL!</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightTwoTone style={{ backgroundColor: "#34fac5" }} />
      </Arrow>
    </Container>
  );
};
export default Slider;
