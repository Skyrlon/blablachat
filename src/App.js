import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import FriendsList from "./pages/FriendsList";
import SignIn from "./pages/SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);

  const storeUsers = useSelector((state) => state.users);
  const storeChatrooms = useSelector((state) => state.chatrooms);

  const [users, setUsers] = useState(storeUsers);
  const [chatRooms, setChatRooms] = useState(storeChatrooms);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChatRoom, setCurrentChatRoom] = useState(chatRooms[0].id);

  const handleModifyMessages = (newMessages) => {
    const chatRoomIndexToModify = chatRooms.findIndex(
      (room) => room.id === currentChatRoom
    );
    const chatRoomModified = {
      ...chatRooms[chatRoomIndexToModify],
      messages: newMessages,
    };
    let newChatRooms = chatRooms;
    newChatRooms.splice(chatRoomIndexToModify, 1, chatRoomModified);
    setChatRooms([...newChatRooms]);
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

  const handleRemoveFriend = (id) => {
    const usersToUpdateIndex = [currentUser.id, id];
    let usersToUpdate = users.filter(
      (user) => user.id === currentUser.id || user.id === id
    );
    usersToUpdate.forEach((user) =>
      user.id === currentUser.id
        ? user.friendsID.splice(user.friendsID.indexOf(id), 1)
        : user.friendsID.splice(user.friendsID.indexOf(currentUser.id), 1)
    );
    let newUsers = users;
    usersToUpdate.forEach((user, index) =>
      newUsers.splice(usersToUpdateIndex[index], 1, user)
    );
    setUsers(newUsers);
    setCurrentUser(
      usersToUpdate.filter((user) => user.id === currentUser.id)[0]
    );
  };

  const handleRequestFriend = (id) => {
    const userToSendRequest = users.filter((user) => user.id === id)[0];
    let friendRequestUpdated = userToSendRequest.friendsRequest;
    if (friendRequestUpdated.includes(currentUser.id)) {
      return;
    } else {
      friendRequestUpdated.push(currentUser.id);
      const userUpdated = {
        ...userToSendRequest,
        friendsRequest: friendRequestUpdated,
      };
      let newUsers = users;
      newUsers.splice(users.indexOf(userToSendRequest), 1, userUpdated);
      setUsers(newUsers);
    }
  };

  const handleFriendRequestAccepted = (id) => {
    const usersToUpdateIndex = [currentUser.id, id];
    let usersToUpdate = users.filter(
      (user) => user.id === currentUser.id || user.id === id
    );
    usersToUpdate.forEach((user) =>
      user.id === currentUser.id
        ? user.friendsID.push(id)
        : user.friendsID.push(currentUser.id)
    );
    usersToUpdate.forEach((user) =>
      user.id === currentUser.id
        ? user.friendsRequest.splice(user.friendsRequest.indexOf(id), 1)
        : ""
    );
    let newUsers = users;
    usersToUpdate.forEach((user, index) =>
      newUsers.splice(usersToUpdateIndex[index], 1, user)
    );
    setUsers(newUsers);
    setCurrentUser(
      usersToUpdate.filter((user) => user.id === currentUser.id)[0]
    );
  };

  const handleFriendRequestRejected = (id) => {
    const userToUpdateIndex = users.indexOf(
      users.filter((user) => user.id === currentUser.id)[0]
    );
    let userToUpdate = users.filter((user) => user.id === currentUser.id)[0];
    let friendsRequestUpdated = userToUpdate.friendsRequest;
    friendsRequestUpdated.splice(friendsRequestUpdated.indexOf(id), 1);
    userToUpdate.friendsRequest = friendsRequestUpdated;
    let newUsers = users;
    newUsers.splice(userToUpdateIndex, 1, userToUpdate);
    setUsers(newUsers);
    setCurrentUser(userToUpdate);
  };

  const handleCreateChatRoom = (friends) => {
    setChatRooms((prev) => [
      ...prev,
      {
        id: prev.length,
        name: `New Chatroom ${prev.length}`,
        membersID: [currentUser.id, ...friends],
        message: [],
      },
    ]);
  };

  const handleAddMember = (chatroomId, friendsId) => {
    const chatroomToUpdateIndex = chatRooms.indexOf(
      chatRooms.filter((chatroom) => chatroom.id === chatroomId)[0]
    );
    let chatroomToUpdate = chatRooms.filter(
      (chatroom) => chatroom.id === chatroomId
    )[0];
    chatroomToUpdate.membersID = chatroomToUpdate.membersID.concat(friendsId);
    let newChatrooms = chatRooms;
    newChatrooms.splice(chatroomToUpdateIndex, 1, chatroomToUpdate);
    setChatRooms(newChatrooms);
  };

  const handleLeaveChatroom = (chatroomId) => {
    const chatroomToUpdateIndex = chatRooms.indexOf(
      chatRooms.filter((chatroom) => chatroom.id === chatroomId)[0]
    );
    let chatroomToUpdate = chatRooms.filter(
      (chatroom) => chatroom.id === chatroomId
    )[0];
    chatroomToUpdate.membersID.splice(
      chatroomToUpdate.membersID.indexOf(currentUser.id),
      1
    );
    let newChatrooms = chatRooms;
    newChatrooms.splice(chatroomToUpdateIndex, 1, chatroomToUpdate);
    setChatRooms(newChatrooms);
  };

  const handleLogout = () => {
    setCurrentUser(undefined);
    setIsAuthentified(false);
  };

  useEffect(() => {}, [users, chatRooms]);

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
