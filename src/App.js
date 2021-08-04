import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import ChatPage from "./ChatPage.jsx";
import FriendsList from "./FriendsList";
import SignIn from "./SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);
  const [users, setUsers] = useState([
    { id: 0, name: "SimpleOne", password: "Password1@", friendsID: [1, 2] },
    {
      id: 1,
      name: "Toto1337",
      password: "AVeryDifficultPassword1@",
      friendsID: [2],
    },
    { id: 2, name: "HolderPlace85!", password: "Password11$", friendsID: [] },
    { id: 3, name: "Human", password: "@!1Az1!@", friendsID: [0, 1] },
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
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <Router>
        <div>
          {isAuthentified && (
            <nav>
              <ul>
                <li>
                  <Link to="/">Chat</Link>
                </li>
                <li>
                  <Link to="/friendslist">FriendsList</Link>
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
            <Route path="/">
              <ChatPage
                users={users}
                chatRooms={
                  currentUser !== undefined
                    ? chatRooms.filter((chatroom) =>
                        chatroom.membersID.includes(currentUser.id)
                      )
                    : ""
                }
                changeChatRoom={(id) => setCurrentChatRoom(id)}
                msg={
                  currentUser !== undefined
                    ? chatRooms.filter(
                        (chatroom) =>
                          chatroom.membersID.includes(currentUser.id) &&
                          chatroom.id === currentChatRoom
                      )[0].messages
                    : ""
                }
                modifyMessages={handleModifyMessages}
                isAuthentified={isAuthentified}
                currentUser={currentUser}
              />
            </Route>
            <Route path="/friendslist">
              <FriendsList
                friendsID={
                  currentUser !== undefined ? currentUser.friendsID : ""
                }
                users={users}
                isAuthentified={isAuthentified}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
