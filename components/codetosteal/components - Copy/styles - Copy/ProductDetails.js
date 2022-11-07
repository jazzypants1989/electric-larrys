import styled from "styled-components";

export const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  transition: all 0.5s ease;
  img {
    max-width: 60vw;
    max-height: 60vh;
    object-fit: contain;
  }
`;

export const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  h3 {
    color: rebeccapurple;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: rebeccapurple;
    height: 1.5rem;
    width: 1.5rem;
  }
`;

export const Buy = styled.button`
  background: linear-gradient(90deg, #ff008c 20%, #493240 100%);
  width: 100%;
  color: pink;
  font-size: 1.5rem;
  font-weight: medium;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  transition: all 0.5s ease-in-out;
  :hover {
    background: linear-gradient(90deg, #33aa8c 0%, #99924f 80%);
    color: white;
  }
`;
