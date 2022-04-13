import {useContext} from "react";
import {Link} from "react-router-dom";
import "./../../css/Header/UserMenu.css";

import {dataContext} from "./../../App";
import Notifications from "./Notifications";

function UserMenu({toggler, notificationCount}) {
  const {logout} = useContext(dataContext);

  return (
    <div className="usermenu">
      <div className="userheader">
        <span onClick={toggler}>❌</span>
      </div>
      <Notifications notificationCount={notificationCount} />
      <hr />
      <div className="usermenu__content">
        <Link to="/dashboard" className="accountsettings">
          Account Settings
        </Link>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
