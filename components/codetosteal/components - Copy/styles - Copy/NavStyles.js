import styled from "styled-components"
const { motion } = require("framer-motion")

export const OuterNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const NavStyles = styled.nav`
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-size: 1.2rem;
  }
`

export const NavItems = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  li {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-size: 1rem;
  }
  svg {
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0.5rem;
  }
`

export const CutiePie = styled(motion.span)`
  font-size: 0.6rem;
  background: red;
  color: white;
  padding: 0.2rem;
  border-radius: 50%;
  position: relative;
  top: -1rem;
  right: 1rem;
  cursor: pointer;
`

export const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
