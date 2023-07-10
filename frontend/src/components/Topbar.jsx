import React from 'react';
import { Link } from 'react-router-dom';

function Topbar() {
  return (
    <>  
      <div className="navbar-custom topnav-navbar topnav-navbar-light">
        <div className="container-fluid">
          <Link to="/" className="topnav-logo">
            <span className="topnav-logo-lg">
            <img
                src="assets/images/users/unitt.png"
                alt=""
                height="0"
                width="0"
            />
            
                        
            </span>
            <span className="topnav-logo-sm">
              <img src="assets/images/logo_sm.png" alt="logo" height="16" />
            </span>
          </Link>
          <ul className="list-unstyled topbar-menu float-end mb-0">
            <li className="notification-list">
              <Link to="#" className="nav-link end-bar-toggle">
                <i className="dripicons-gear noti-icon"></i>
              </Link>
            </li>
            <li className="dropdown notification-list">
              <Link
                to="#"
                className="nav-link dropdown-toggle nav-user arrow-none me-0"
                data-bs-toggle="dropdown"
                id="topbar-userdrop"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="account-user-avatar">
                  <img
                    src="assets/images/users/avatar-3.jpg"
                    alt=""
                    className="rounded-circle"
                  />
                </span>
                <span>
                  <span className="account-user-name">Mauripay</span>
                  <span className="account-position">Founder</span>
                </span>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
                aria-labelledby="topbar-userdrop"
              >
                {/* item */}
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                {/* item */}
                <Link to="#" className="dropdown-item notify-item">
                  <i className="mdi mdi-account-circle me-1"></i>
                  <span>My Account</span>
                </Link>
                {/* item */}
                <Link to="#" className="dropdown-item notify-item">
                  <i className="mdi mdi-account-edit me-1"></i>
                  <span>Settings</span>
                </Link>
                {/* item */}
                <Link to="#" className="dropdown-item notify-item">
                  <i className="mdi mdi-lifebuoy me-1"></i>
                  <span>Support</span>
                </Link>
                {/* item */}
                <Link to="#" className="dropdown-item notify-item">
                  <i className="mdi mdi-lock-outline me-1"></i>
                  <span>Lock Screen</span>
                </Link>
                {/* item */}
                <Link to="#" className="dropdown-item notify-item">
                  <i className="mdi mdi-logout me-1"></i>
                  <span>Logout</span>
                </Link>
              </div>
            </li>
          </ul>
          <a className="button-menu-mobile disable-btn">
            <div className="lines">
            <span></span>
            <span></span>
            <span></span>
            </div>
          </a>

          {/* <Link to="#" className="button-menu-mobile disable-btn">
            <div className="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Link> */}
          <div className="app-search dropdown">
            <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
              <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
              </div>
              <Link to="#" className="dropdown-item notify-item">
                <i className="uil-notes font-16 me-1"></i>
                <span>Analytics Report</span>
              </Link>
              <Link to="#" className="dropdown-item notify-item">
                <i className="uil-life-ring font-16 me-1"></i>
                <span>How can I help you?</span>
              </Link>
              <Link to="#" className="dropdown-item notify-item">
                <i className="uil-cog font-16 me-1"></i>
                <span>User profile settings</span>
              </Link>
              <div className="dropdown-header noti-title">
                <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
              </div>
              <div className="notification-list">
                <Link to="#" className="dropdown-item notify-item">
                  <div className="d-flex">
                    <img
                      className="d-flex me-2 rounded-circle"
                      src="assets/images/users/avatar-2.jpg"
                      alt=""
                      height="32"
                    />
                    <div className="w-100">
                      <h5 className="m-0 font-14">Erwin Brown</h5>
                      <span className="font-12 mb-0">UI Designer</span>
                    </div>
                  </div>
                </Link>
                <Link to="#" className="dropdown-item notify-item">
                  <div className="d-flex">
                    <img
                      className="d-flex me-2 rounded-circle"
                      src="assets/images/users/avatar-5.jpg"
                      alt=""
                      height="32"
                    />
                    <div className="w-100">
                      <h5 className="m-0 font-14">Jacob Deo</h5>
                      <span className="font-12 mb-0">Developer</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="end-bar">
        <div className="rightbar-title">
          <Link to="#" className="end-bar-toggle float-end">
            <i className="dripicons-cross noti-icon"></i>
          </Link>
          <h5 className="m-0">Settings</h5>
        </div>
        <div className="rightbar-content h-100" data-simplebar="">
          <div className="p-3">
            <div className="alert alert-warning" role="alert">
              <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
            </div>
            <h5 className="mt-3">Color Scheme</h5>
            <hr className="mt-1" />
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="color-scheme-mode"
                value="light"
                id="light-mode-check"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="light-mode-check">
                Light Mode
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="color-scheme-mode"
                value="dark"
                id="dark-mode-check"
              />
              <label className="form-check-label" htmlFor="dark-mode-check">
                Dark Mode
              </label>
            </div>
            <h5 className="mt-4">Width</h5>
            <hr className="mt-1" />
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="width"
                value="fluid"
                id="fluid-check"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="fluid-check">
                Fluid
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="width"
                value="boxed"
                id="boxed-check"
              />
              <label className="form-check-label" htmlFor="boxed-check">
                Boxed
              </label>
            </div>
            <h5 className="mt-4">Left Sidebar</h5>
            <hr className="mt-1" />
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="theme"
                value="default"
                id="default-check"
              />
              <label className="form-check-label" htmlFor="default-check">
                Default
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="theme"
                value="light"
                id="light-check"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="light-check">
                Light
              </label>
            </div>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="theme"
                value="dark"
                id="dark-check"
              />
              <label className="form-check-label" htmlFor="dark-check">
                Dark
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="compact"
                value="fixed"
                id="fixed-check"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="fixed-check">
                Fixed
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="compact"
                value="condensed"
                id="condensed-check"
              />
              <label className="form-check-label" htmlFor="condensed-check">
                Condensed
              </label>
            </div>
            <div className="form-check form-switch mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="compact"
                value="scrollable"
                id="scrollable-check"
              />
              <label className="form-check-label" htmlFor="scrollable-check">
                Scrollable
              </label>
            </div>
            <div className="d-grid mt-4">
              <button className="btn btn-primary" id="resetBtn">
                Reset to Default
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
