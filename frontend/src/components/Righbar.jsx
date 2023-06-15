import React from 'react'

function Righbar() {
  return (
    <div>
        <div className="container-fluid">
    {/* Begin page */}
    <div className="wrapper">
        {/* Left Sidebar Start */}
        <div className="leftside-menu leftside-menu-detached">
            <div className="leftbar-user">
                <a href="#">
                    <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42" className="rounded-circle shadow-sm" />
                    <span className="leftbar-user-name">Soeng Souy</span>
                </a>
            </div>

            {/* Sidemenu */}
            <ul className="side-nav">
                <li className="side-nav-title side-nav-item">Navigation</li>
                <li className="side-nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" className="side-nav-link">
                        <i className="uil-home-alt"></i>
                        <span className="badge bg-success float-end">4</span>
                        <span> Dashboards </span>
                    </a>
                    <div className="collapse" id="sidebarDashboards">
                        <ul className="side-nav-second-level">
                            <li>
                                <a href="dashboard-analytics.html">Analytics</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="side-nav-title side-nav-item">Apps</li>
                <li className="side-nav-item">
                    <a href="apps-calendar.html" className="side-nav-link">
                        <i className="uil-calender"></i>
                        <span> Calendar </span>
                    </a>
                </li>
                <li className="side-nav-item">
                    <a href="apps-chat.html" className="side-nav-link">
                        <i className="uil-comments-alt"></i>
                        <span> Chat </span>
                    </a>
                </li>
                <li className="side-nav-title side-nav-item mt-1">Components</li>
                <li className="side-nav-item">
                    <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                        <i className="uil-package"></i>
                        <span> Extended UI </span>
                        <span className="menu-arrow"></span>
                    </a>
                    <div className="collapse" id="sidebarExtendedUI">
                        <ul className="side-nav-second-level">
                            <li>
                                <a href="extended-dragula.html">Dragula</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="side-nav-item">
                    <a href="widgets.html" className="side-nav-link">
                        <i className="uil-layer-group"></i>
                        <span> Widgets </span>
                    </a>
                </li>
            </ul>

        
            {/* End Sidebar */}
            <div className="clearfix"></div>
            {/* Sidebar -left */}
        </div>
        {/* Left Sidebar End */}
        
            <div className="content-page">
                <div className="content">
                <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><a href="#">Hyper</a></li>
                                <li className="breadcrumb-item"><a href="#">Icons</a></li>
                                <li className="breadcrumb-item active">Mdi Icons</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Material Design Icons</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h1>ahmedou</h1>
                        </div>
                    </div>
                </div>
            </div>
        
        {/* Footer Start */}
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <script>document.write(new Date().getFullYear())</script> © Hyper - Coderthemes.com
                    </div>
                    <div className="col-md-6">
                        <div className="text-md-end footer-links d-none d-md-block">
                            <a href="#">About</a>
                            <a href="#">Support</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
                </div>
            </div>
            
        {/* end Footer */}
    </div>
    {/* end wrapper */}
</div>

    </div>
  )
}

export default Righbar