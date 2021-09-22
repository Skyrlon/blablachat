//import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logout from "./components/Logout.jsx";
import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import FriendsList from "./pages/FriendsList";
import SignIn from "./pages/SignIn.jsx";

const App = () => {
  const [isAuthentified, setIsAuthentified] = useState(false);

  const users = useSelector((state) => state.users);

  const [userLoggedId, setUserLoggedId] = useState(undefined);

  const currentUser = useSelector((state) =>
    state.users.find((user) => user.id === userLoggedId)
  ) || {
    id: null,
    name: null,
    password: null,
    friendsID: [],
    friendsRequest: [],
  };

  /* const handleAddUser = (signupInfos) => {
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
  }; */

  const handleLogout = () => {
    setUserLoggedId(undefined);
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
                //addUser={handleAddUser}
                onSuccessfulSignIn={(userId) => {
                  setUserLoggedId(userId);
                  setIsAuthentified(true);
                }}
              />
            </Route>
            <Route path="/friends">
              <FriendsList
                friendsID={currentUser.friendsID}
                users={users}
                isAuthentified={isAuthentified}
                friendsRequest={currentUser.friendsRequest}
                currentUser={currentUser}
              />
            </Route>
            <Route path="/">
              <ChatPage
                users={users}
                isAuthentified={isAuthentified}
                currentUser={currentUser}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
