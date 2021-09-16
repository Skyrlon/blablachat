import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import FriendsList from "./pages/FriendsList";
import SignIn from "./pages/SignIn.jsx";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthentified, setIsAuthentified] = useState(false);

  const storeUsers = useSelector((state) => state.users);
  const storeChatrooms = useSelector((state) => state.chatrooms);

  const [users, setUsers] = useState(storeUsers);
  const [chatRooms, setChatRooms] = useState(storeChatrooms);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChatRoom, setCurrentChatRoom] = useState(chatRooms[0].id);

  const handleModifyMessages = (newMessages) => {
    dispatch({
      type: "MODIFY_MESSAGES",
      payload: { messages: newMessages, chatroomId: currentChatRoom },
    });
  };

  const handleAddUser = (signupInfos) => {
    const newUser = {
      id: users.length,
      name: signupInfos.name,
      password: signupInfos.password,
      friendsID: [],
      friendsRequest: [],
    };
    axios.post("http://localhost:3004/users", { newUser });
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthentified(true);
    setCurrentChatRoom(undefined);
  };

  const handleRemoveFriend = (friendId) => {
    const newUsers = users.map((user) => {
      if (user.id === currentUser.id)
        return {
          ...user,
          friendsID: user.friendsID.filter((friend) => friend !== friendId),
        };
      if (user.id === friendId)
        return {
          ...user,
          friendsID: user.friendsID.filter(
            (friend) => friend !== currentUser.id
          ),
        };
      return user;
    });
    setUsers(newUsers);
    setCurrentUser(newUsers.filter((user) => user.id === currentUser.id)[0]);
  };

  const handleRequestFriend = (friendIdToSendRequest) => {
    const newUsers = users.map((user) => {
      if (user.id === friendIdToSendRequest)
        return {
          ...user,
          friendsID: [...user.friendsId, friendIdToSendRequest],
        };
      return user;
    });
    setUsers(newUsers);
  };

  const handleFriendRequestAccepted = (id) => {
    const newUsers = users.map((user) => {
      if (user.id === currentUser.id)
        return {
          ...user,
          friendsRequest: user.friendRequest.filter(
            (request) => request !== id
          ),
          friendsId: [...user.friendsId, id],
        };
      if (user.id === id)
        return {
          ...user,
          friendsId: [...user.friendsId, id],
        };
      return user;
    });

    setUsers(newUsers);
    setCurrentUser(newUsers.filter((user) => user.id === currentUser.id)[0]);
  };

  const handleFriendRequestRejected = (id) => {
    const newUsers = users.map((user) => {
      if (user.id === currentUser.id)
        return {
          ...user,
          friendsRequest: user.friendRequest.filter(
            (request) => request !== id
          ),
        };
      return user;
    });
    setUsers(newUsers);
    setCurrentUser(newUsers.filter((user) => user.id === currentUser.id)[0]);
  };

  const handleCreateChatRoom = (friendsSelected) => {
    setChatRooms((prev) => [
      ...prev,
      {
        id: prev.length,
        name: `New Chatroom ${prev.length}`,
        membersID: [currentUser.id, ...friendsSelected],
        message: [],
      },
    ]);
  };

  const handleAddMember = (chatroomId, friendsSelected) => {
    const newChatrooms = chatRooms.map((chatroom) => {
      if (chatroom.id === chatroomId)
        return {
          ...chatroom,
          membersID: [...chatroom.membersID, ...friendsSelected],
        };
      return chatroom;
    });
    setChatRooms(newChatrooms);
  };

  const handleLeaveChatroom = (chatroomId) => {
    const newChatrooms = chatRooms.map((chatroom) => {
      if (chatroom.id === chatroomId)
        return {
          ...chatroom,
          membersID: chatroom.membersID.filter(
            (member) => member !== currentUser.id
          ),
        };
      return chatroom;
    });
    setChatRooms(newChatrooms);
  };

  const handleLogout = () => {
    setCurrentUser(undefined);
    setIsAuthentified(false);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      {isAuthentified && <Logout onLogoutClick={handleLogout} />}
      <Router>
        <div>
          {isAuthentified && (
            <nav>
              <ul>
                <li>
                  <Link to="/">Chat</Link>
                </li>
                <li>
                  <Link to="/friends">FriendsList</Link>
                </li>
              </ul>
            </nav>
          )}

          <Switch>
            <Route path="/sign">
              <SignIn
                users={users}
                addUser={handleAddUser}
                onSuccessfulSignIn={(user) => {
                  setCurrentUser(user);
                  setIsAuthentified(true);
                  setCurrentChatRoom(
                    chatRooms.filter((chatroom) =>
                      chatroom.membersID.includes(user.id)
                    )[0].id
                  );
                }}
              />
            </Route>
            <Route path="/friends">
              <FriendsList
                friendsID={
                  currentUser !== undefined ? currentUser.friendsID : []
                }
                users={users}
                isAuthentified={isAuthentified}
                sendRequestFriend={handleRequestFriend}
                friendsRequest={
                  currentUser !== undefined ? currentUser.friendsRequest : []
                }
                acceptFriendRequest={handleFriendRequestAccepted}
                rejectFriendRequest={handleFriendRequestRejected}
                currentUser={currentUser}
                removeFriend={handleRemoveFriend}
              />
            </Route>
            <Route path="/">
              <ChatPage
                users={users}
                chatRooms={
                  currentUser !== undefined
                    ? chatRooms.filter((chatroom) =>
                        chatroom.membersID.includes(currentUser.id)
                      )
                    : []
                }
                changeChatRoom={(id) => setCurrentChatRoom(id)}
                currentChatRoom={currentChatRoom}
                modifyMessages={handleModifyMessages}
                isAuthentified={isAuthentified}
                currentUser={currentUser}
                createChatRoom={handleCreateChatRoom}
                sendRequestFriend={handleRequestFriend}
                removeFriend={handleRemoveFriend}
                addMember={handleAddMember}
                leaveChatroom={handleLeaveChatroom}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
