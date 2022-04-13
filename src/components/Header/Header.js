import {useContext, useState} from "react";
import {Link} from "react-router-dom";

// local imports
import "./../../css/Header/header.css";
import {dataContext} from "../../App";
import UserMenu from "./UserMenu";
function Header() {
  const {data} = useContext(dataContext);
  const [menu, setMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  function toggleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="header__section">
      <Link to="/" className="logo">
        Chat App
      </Link>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          {data.username ? (
            <div className="usermenu__container">
              <p onClick={toggleMenu} className="username">
                {data.username}
                <span className="notificationcount">{notificationCount}</span>
              </p>
              {menu ? (
                <UserMenu
                  toggler={toggleMenu}
                  notificationCount={setNotificationCount}
                />
              ) : null}
            </div>
          ) : (
            <Link to="/">SignUp</Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
