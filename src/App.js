import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logout from "./Logout.jsx";

import "./App.css";
import ChatPage from "./ChatPage.jsx";
import FriendsList from "./FriendsList";
import SignIn from "./SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "SimpleOne",
      password: "Password1@",
      friendsID: [1, 2],
      friendsRequest: [3],
    },
    {
      id: 1,
      name: "Toto1337",
      password: "AVeryDifficultPassword1@",
      friendsID: [2],
      friendsRequest: [],
    },
    {
      id: 2,
      name: "HolderPlace85!",
      password: "Password11$",
      friendsID: [],
      friendsRequest: [],
    },
    {
      id: 3,
      name: "Human",
      password: "@!1Az1!@",
      friendsID: [0, 1],
      friendsRequest: [],
    },
  ]);
  const [chatRooms, setChatRooms] = useState([
    {
      id: 0,
      name: "Discussion with friends",
      membersID: [0, 1, 3],
      messages: [
        {
          id: 0,
          writerID: 0,
          time: 1626874479000,
          text: "Message for test",
          modified: false,
          deleted: false,
        },
        {
          id: 1,
          writerID: 1,
          time: 1626875479000,
          text: "Test for message",
          modified: false,
          deleted: false,
        },
      ],
    },
    {
      id: 1,
      name: "Work room",
      membersID: [0, 2],
      messages: [
        {
          id: 0,
          writerID: 0,
          time: 1626774479000,
          text: "Time to work",
          modified: false,
          deleted: false,
        },
        {
          id: 1,
          writerID: 2,
          time: 1626775579000,
          text: "Yep",
          modified: false,
          deleted: false,
        },
      ],
    },
  ]);

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
    const userToUpdateIndex = users.indexOf(
      users.filter((user) => user.id === currentUser.id)[0]
    );
    let userToUpdate = users.filter((user) => user.id === currentUser.id)[0];
    let friendsUpdated = userToUpdate.friendsID;
    friendsUpdated.splice(friendsUpdated.indexOf(id), 1);
    userToUpdate.friendsID = friendsUpdated;
    let newUsers = users;
    newUsers.splice(userToUpdateIndex, 1, userToUpdate);
    setUsers(newUsers);
    setCurrentUser(userToUpdate);
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
    const userToUpdateIndex = users.indexOf(
      users.filter((user) => user.id === currentUser.id)[0]
    );
    let userToUpdate = users.filter((user) => user.id === currentUser.id)[0];
    userToUpdate.friendsID.push(id);
    let friendsRequestUpdated = userToUpdate.friendsRequest;
    friendsRequestUpdated.splice(friendsRequestUpdated.indexOf(id), 1);
    userToUpdate.friendsRequest = friendsRequestUpdated;
    let newUsers = users;
    newUsers.splice(userToUpdateIndex, 1, userToUpdate);
    setUsers(newUsers);
    setCurrentUser(userToUpdate);
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
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
