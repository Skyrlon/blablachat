import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import ChatPage from "./ChatPage.jsx";
import SignIn from "./SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);
  const [users, setUsers] = useState([
    { id: 0, name: "SimpleOne", password: "Password1@" },
    { id: 1, name: "Toto1337", password: "AVeryDifficultPassword1@" },
    { id: 2, name: "HolderPlace85!", password: "Password11$" },
    { id: 3, name: "Human", password: "@!1Az1!@" },
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
  ]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChatRoom, setCurrentChatRoom] = useState(0);

  const handleModifyMessages = (newMessages) => {
    const chatRoomIndexToModify = chatRooms.findIndex(
      (room) => room.id === currentChatRoom
    );
    const chatRoomModified = {
      ...chatRooms[chatRoomIndexToModify],
      messages: newMessages,
    };
    console.log(chatRooms.splice(chatRoomIndexToModify, 1, chatRoomModified));
    setChatRooms(chatRooms.splice(chatRoomIndexToModify, 1, chatRoomModified));
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <header className="App-header">BlaBlaChat</header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <Link to="/sign">Sign In / Sign Up</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/chat">
              <ChatPage
                users={users}
                msg={
                  chatRooms[
                    chatRooms.findIndex((room) => room.id === currentChatRoom)
                  ].messages
                }
                modifyMessages={handleModifyMessages}
                isAuthentified={isAuthentified}
                currentUser={currentUser}
              />
            </Route>
            <Route path="/sign">
              <SignIn
                users={users}
                addUser={handleAddUser}
                onSuccessfulSignIn={(user) => {
                  setCurrentUser(user);
                  setIsAuthentified(true);
                }}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
