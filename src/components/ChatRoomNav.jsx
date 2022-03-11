import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import ChatRoomNavItems from "./ChatRoomNavItems";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StyledChatRoomNav = styled(List)``;

const ChatRoomNav = ({
  chatrooms,
  changeCurrentChatroom,
  currentChatroomId,
  leaveCurrentChatroom,
}) => {
  return (
    <StyledChatRoomNav>
      <ListItem>
        <ListItemText>Chatrooms</ListItemText>
        <ListItemIcon>
          <AddChatRoom
            chatrooms={chatrooms}
            changeCurrentChatroom={changeCurrentChatroom}
          />
        </ListItemIcon>
      </ListItem>

      {chatrooms.map((chatroom) => (
        <ChatRoomNavItems
          key={chatroom.id}
          chatroomId={chatroom.id}
          chatroomOwnerId={chatroom.ownerID}
          changeCurrentChatroom={changeCurrentChatroom}
          currentChatroomId={currentChatroomId}
          leaveCurrentChatroom={leaveCurrentChatroom}
        />
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatrooms: PropTypes.array,
  changeCurrentChatroom: PropTypes.func,
  currentChatroomId: PropTypes.number,
  createChatRoom: PropTypes.func,
  leaveCurrentChatroom: PropTypes.func,
};

export default ChatRoomNav;
