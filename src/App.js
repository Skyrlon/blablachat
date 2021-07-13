import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import ChatPage from "./ChatPage.jsx";
import SignIn from "./SignIn.jsx";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      date: "2021-01-01",
      time: "11:11",
      text: "Message for test",
      modified: false,
      deleted: false,
    },
  ]);

  const handleModifyMessages = (newMessages) => {
    setMessages(newMessages);
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
              <ChatPage msg={messages} modifyMessages={handleModifyMessages} />
            </Route>
            <Route path="/sign">
              <SignIn />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
