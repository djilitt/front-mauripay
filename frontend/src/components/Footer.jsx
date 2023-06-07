import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <script>document.write(new Date().getFullYear())</script> © Hyper - Coderthemes.com
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-md-block">
                                
                                <Link to="about" className="">About</Link>
                                <Link to="Support" className="">Support</Link>
                                <Link to="contact" className="">Contact</Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer