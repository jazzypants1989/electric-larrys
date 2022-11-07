import styled from "styled-components";
import {
  PhoneAndroidOutlined,
  MyLocationOutlined,
  MailOutlineRounded,
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
} from "@material-ui/icons";
import { media } from "../responsive";

const Container = styled.div`
  display: flex;
  ${media.tablet`flex-direction: column;`}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;
const Center = styled.div`
  flex: 1;
  padding: 1.5rem;
`;
const Right = styled.div`
  flex: 1;
  padding: 1.5rem;
`;
const Logo = styled.h1`
  font-weight: bold;
  text-shadow: 0px 0px 5px rgba(247, 118, 5, 1);
`;
const Desc = styled.p`
  margin: 1rem 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 35px;
  border-radius: 50%;
  background-color: #fefba8;
  margin-right: 1rem;
`;
const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f77605;
  padding-bottom: 0.5rem;
  text-shadow: 0px 0px 5px rgba(247, 118, 5, 0.5);
  letter-spacing: 1px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  margin-bottom: 0.25rem;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;
const Payment = styled.img`
  max-width: 100%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Electric Larry's</Logo>
        <Desc>
          Electric Larry's is an eclectic oddity emporium located in Carbondale,
          IL. We carry a wide variety of items including movies, music, books,
          toys, and more.
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook style={{ color: "3b5999" }} />
          </SocialIcon>
          <SocialIcon>
            <Twitter style={{ color: "55acee" }} />
          </SocialIcon>
          <SocialIcon>
            <Pinterest style={{ color: "e60023" }} />
          </SocialIcon>
          <SocialIcon>
            <Instagram style={{ color: "e4405f" }} />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Movie Mania</ListItem>
          <ListItem>Other Media</ListItem>
          <ListItem>Toys + Games</ListItem>
          <ListItem>Eclectic Oddities</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <MyLocationOutlined style={{ marginRight: "10px" }} /> 217 West Main
          Street, Carbondale, IL 62901
        </ContactItem>
        <ContactItem>
          <PhoneAndroidOutlined style={{ marginRight: "10px" }} /> (618)
          789-1144
        </ContactItem>
        <ContactItem>
          <MailOutlineRounded style={{ marginRight: "10px" }} />{" "}
          electriclarry@electriclarry.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};
export default Footer;
