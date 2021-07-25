import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import ChatPage from "./ChatPage.jsx";
import SignIn from "./SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);
  const [users, setUsers] = useState([
    { name: "SimpleOne", password: "Password1@" },
    { name: "Toto1337", password: "AVeryDifficultPassword1@" },
    { name: "HolderPlace85!", password: "Password11$" },
    { name: "Human", password: "@!1Az1!@" },
  ]);

  const [currentUser, setCurrentUser] = useState(undefined);

  const [messages, setMessages] = useState([
    {
      id: 0,
      time: 1626874479000,
      text: "Message for test",
      modified: false,
      deleted: false,
    },
  ]);

  const handleModifyMessages = (newMessages) => {
    setMessages(newMessages);
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
                msg={messages}
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
