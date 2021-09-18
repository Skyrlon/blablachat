import axios from "axios";
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

  const storeUsers = useSelector((state) => state.users);

  const [users, setUsers] = useState(storeUsers);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: null,
    password: null,
    friendsID: [],
    friendsRequest: [],
  });

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
                }}
              />
            </Route>
            <Route path="/friends">
              <FriendsList
                friendsID={currentUser.friendsID}
                users={users}
                isAuthentified={isAuthentified}
                sendRequestFriend={handleRequestFriend}
                friendsRequest={currentUser.friendsRequest}
                acceptFriendRequest={handleFriendRequestAccepted}
                rejectFriendRequest={handleFriendRequestRejected}
                currentUser={currentUser}
                removeFriend={handleRemoveFriend}
              />
            </Route>
            <Route path="/">
              <ChatPage
                users={users}
                isAuthentified={isAuthentified}
                currentUser={currentUser}
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
