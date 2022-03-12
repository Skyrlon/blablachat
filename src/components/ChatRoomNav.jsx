import styled from "styled-components";
import PropTypes from "prop-types";
import AddChatRoom from "./AddChatRoom";
import ChatRoomNavItems from "./ChatRoomNavItems";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StyledChatRoomNav = styled(List)``;

const ChatRoomNav = ({ chatrooms }) => {

  return (
    <StyledChatRoomNav>
      <ListItem>
        <ListItemText>Chatrooms</ListItemText>
        <ListItemIcon>
          <AddChatRoom
            chatrooms={chatrooms}
          />
        </ListItemIcon>
      </ListItem>

      {chatrooms.map((chatroom) => (
        <ChatRoomNavItems
          key={chatroom.id}
          chatroomId={chatroom.id}
          chatroomOwnerId={chatroom.ownerID}
        />
      ))}
    </StyledChatRoomNav>
  );
};

ChatRoomNav.propTypes = {
  chatrooms: PropTypes.array,
  createChatRoom: PropTypes.func,
};

export default ChatRoomNav;
