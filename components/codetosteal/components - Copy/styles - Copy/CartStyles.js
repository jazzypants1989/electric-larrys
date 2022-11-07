import styled from "styled-components"

const { motion } = require("framer-motion")

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`

export const CartStyle = styled(motion.div)`
  max-width: 33vw;
  min-width: 300px;
  background: linear-gradient(90deg, #cc008c 0%, #993240 100%);
  overflow-y: scroll;
  position: relative;
`

export const Card = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 0.2rem;
  margin: 5%;
  padding: 0.2rem;
  background: linear-gradient(90deg, #a20080 0%, #a93240 100%);
  color: pink;
  width: 90%;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`

export const CardInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 50%;
  p {
    font-size: 1rem;
  }
  svg {
    font-size: 1rem;
    margin-top: 0.2rem;
    cursor: pointer;
  }
  span {
    font-weight: 600;
  }
`

export const CardButton = styled(motion.button)`
  background: inherit;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: pink;
  padding: 0.25rem;
  width: fit-content;
`

export const TotalPrice = styled(motion.span)`
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  color: pink;
  margin: 0.5rem;
`

export const EmptyStyle = styled(motion.div)`
  color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: fit-content;
  margin-top: 25vh;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  svg {
    font-size: 10rem;
    color: #aa88ff;
  }
`

export const BuyCart = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`

export const BuyButton = styled(motion.button)`
  background: hotpink;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  :hover {
    background: #ff00ff;
  }
`

export const Cards = styled(motion.div)``
