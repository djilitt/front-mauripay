import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { FaCheckCircle, FaUser, FaUserPlus } from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      // Clear the authentication token
      localStorage.removeItem("token");

      // Redirect the user to the login page (or any other desired page)
      navigate("/"); // Replace '/login' with the path of your login page route
    } catch (error) {
      console.log("Error during logout", error);
    }
  };
  return (
    <>
      <div className="navbar-custom topnav-navbar topnav-navbar-light">
        <div className="container-fluid">
          <Link to="/" className="topnav-logo">
            <span className="topnav-logo-lg">
              <img
                src="assets/images/users/mauripay.png"
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
                    src="assets/images/users/mauripay.png"
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
                <a
                  href="#"
                  className="dropdown-item notify-item"
                  onClick={handleLogout}
                >
                  <i className="mdi mdi-logout me-1"></i>
                  <span>Logout</span>
                </a>
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
            <div
              className="dropdown-menu dropdown-menu-animated dropdown-lg"
              id="search-dropdown"
            >
              <div className="dropdown-header noti-title">
                <h5 className="text-overflow mb-2">
                  Found <span className="text-danger">17</span> results
                </h5>
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
      <div className="end-bar " >
        <div className="rightbar-title bg-warning">
          <Link to="#" className="end-bar-toggle float-end bg-warning active">
            <i className="dripicons-cross noti-icon"></i>
          </Link>
          <h5 className="m-0">Notice</h5>
        </div>
        <div className="rightbar-content h-100" data-simplebar="">
          <div className="p-3">
            <h2
              className="lead mb-4"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            >
              Avant de commencer le test, veuillez suivre ces instructions :
            </h2>

            <div className="mb-1">
              <h5
                className="mb-3"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Test de Connexion Utilisateur
              </h5>
              <ul>
                <li
                  className="lead mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    lineHeight: "1.6",
                  }}
                >
                  <FaUser className="text-danger" /> Commencez par tester la
                  fonction de connexion pour les utilisateurs réguliers.
                </li>
                <li
                  className="lead mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    lineHeight: "1.6",
                  }}
                >
                  <FaUserPlus className="text-warning" /> Après vous être
                  connecté en tant qu'utilisateur régulier, essayez d'ajouter au
                  moins 2 utilisateurs au système.
                </li>
                <li
                  className="lead mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    lineHeight: "1.6",
                  }}
                >
                  <FaCheckCircle className="text-info" /> Ces utilisateurs
                  doivent avoir des détails valides, car ils seront utilisés
                  dans d'autres tests de transaction (retrait, dépôt,
                  transfert).
                </li>
              </ul>
            </div>

            <div className="mb-1">
              <h5
                className="mb-3 "
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Test de Connexion Administrateur
              </h5>
              <ul>
                <li
                  className="lead mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    lineHeight: "1.6",
                  }}
                >
                  <FaUser className="text-danger" /> Avant de tester les
                  fonctionnalités d'administration, concentrez-vous d'abord sur
                  le test de la fonction de connexion pour les administrateurs.
                </li>
                <li
                  className="lead mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "11px",
                    lineHeight: "1.6",
                  }}
                >
                  <FaUserPlus className="text-warning" /> Après la connexion en
                  tant qu'administrateur, essayez d'ajouter un administrateur
                  existant au système.
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center animated-text">
              <p className="text-success mb-0">Bon test!</p>
              <FaCheckCircle className="check-icon ms-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
