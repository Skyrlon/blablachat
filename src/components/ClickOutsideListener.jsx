import { useEffect } from "react";

const ClickOutsideListener = ({ nodeRef, clickedOutside, children }) => {
  const handleMouseDown = (e) => {
    if (nodeRef.current && nodeRef.current !== e.target) {
      clickedOutside();
    }
  };

  useEffect(
    () => {
      document.addEventListener("mousedown", handleMouseDown);
      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
      };
    }, // eslint-disable-next-line
    [nodeRef]
  );

  return <>{children}</>;
};

export default ClickOutsideListener;
