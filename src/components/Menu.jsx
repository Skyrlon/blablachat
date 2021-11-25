import { useRef } from "react";
import styled from "styled-components";
import ClickOutsideListener from "./ClickOutsideListener";

const StyledMenu = styled.div`
  position: absolute;
  top: ${(props) => props.posY}px;
  left: ${(props) => props.posX}px;
  border: 1px solid black;
  background-color: lightblue;
  z-index: 100;
`;

const Menu = ({ children, positionData, clickedOutside }) => {
  const menuRef = useRef(null);

  const positionX =
    parseInt(positionData.pageX) -
    parseInt(positionData.target.getBoundingClientRect().x);

  const positionY =
    parseInt(positionData.pageY) -
    parseInt(positionData.target.getBoundingClientRect().y);

  return (
    <ClickOutsideListener nodeRef={menuRef} clickedOutside={clickedOutside}>
      <StyledMenu posX={positionX} posY={positionY} ref={menuRef}>
        {children}
      </StyledMenu>
    </ClickOutsideListener>
  );
};

export default Menu;
