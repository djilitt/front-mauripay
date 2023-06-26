import React from 'react';
import { Link } from 'react-router-dom';

function LeftSidebar() {
  return (
    <>
      <div className="leftside-menu leftside-menu-detached">
        <div className="leftbar-user">
          <Link to="/">
            <img src="assets/images/users/avatar-3.jpg" alt="User Avatar" height="42" className="rounded-circle shadow-sm" />
            <span className="leftbar-user-name">Mauripay</span>
          </Link>
        </div>

        {/* Sidemenu */}
        <ul className="side-nav">
          <li className="side-nav-title side-nav-item">Navigation</li>
          <li className="side-nav-item">
            <Link to="/" className="side-nav-link">
            <i className="uil-home-alt"></i>
              <span> home </span>
            </Link>
          </li>
          <li className="side-nav-title side-nav-item">User</li>
          <li className="side-nav-item">
            <Link to="/login" className="side-nav-link">
              <i className="uil-user-check"></i>
              <span> login </span>
            </Link>
          </li>
          <li className="side-nav-item">
            <Link to="/retrait" className="side-nav-link">
              <i className="uil-money-withdraw"></i>
              <span> retrait </span>
            </Link>
          </li>
          <li className="side-nav-item">
            <Link to="/depot" className="side-nav-link">
              <i className="uil-money-insert"></i>
              <span> depot </span>
            </Link> 
          </li>
          <li className="side-nav-item">
          {/* uil-location-arrow */}
            <Link to="/transfert" className="side-nav-link">
              <i className="uil-location-arrow"></i>
              <span> transfert </span>
            </Link>
          </li>
          <li>
           {/* uil-location-arrow */}
           <Link to="/Code" className="side-nav-link">
              <i className="uil-location-arrow"></i>
              <span> Code </span>
            </Link>
          </li>

          
          
        </ul>

        {/* End Sidebar */}
        <div className="clearfix"></div>
        {/* Sidebar -left */}
      </div>
    </>
  );
}

export default LeftSidebar;
