jmport React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {io} from "socket.io-client";

// local modules
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import {postRequest} from "./Helpers/Request";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import NotFound from './components/NotFound'


export const dataContext = React.createContext();
let socket;
const App = () => {
  // login functionality
  if (localStorage.getItem("userSec") === undefined) {
    localStorage.setItem("userSec", JSON.stringify(""));
  }
  const [data, setData] = useState({});
  const Data = (_data) => {
    setData(_data.data);
    localStorage.setItem("userSec", JSON.stringify({token: _data.token}));
  };

  function resetData(newData) {
    setData(newData);
  }

  function logout() {
    setData({});
    localStorage.setItem("userSec", null);
    <Redirect to="/" />
  }

  // if user is logged in then connect to socket
  if (data !== null) {
    socket = io("http://localhost:5000");
    socket.on("connect", () => {
      socket.emit("userdata", {
        id: socket.id,
        email: data.email,
      });
    });
  }

  async function fetchData(token) {
    const response = await postRequest("/refreshdata", {sec: "sec"}, token);
    setData(await response.json());
  }
  useEffect(() => {
    if (
      localStorage.getItem("userSec") !== null &&
      JSON.parse(localStorage.getItem("userSec")) !== null
    ) {
      const token = JSON.parse(localStorage.getItem("userSec"));
      fetchData(token.token);
    }
  }, []);

  return (
    <Router>
      <dataContext.Provider value={{data, logout, socket, resetData}}>
        <Header />
      </dataContext.Provider>
      <Switch>
        <Route exact path="/">
          {Object.keys(data).length !== 0 ? (
            <Redirect to="/home" />
          ) : (
            <dataContext.Provider value={Data}>
              <Register />
            </dataContext.Provider>
          )}
        </Route>
        <Route path="/home">
          {Object.keys(data).length !== 0 ? (
            <dataContext.Provider value={{data, socket}}>
              <Home />
            </dataContext.Provider>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/dashboard">
          <dataContext.Provider value={data}>
            <UserDashboard />
          </dataContext.Provider>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
