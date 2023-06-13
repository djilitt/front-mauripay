import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';

function Home() {
  return (
    <div>
    <Topbar />
    <div className="container-fluid">

<div className="wrapper">
<LeftSidebar />
<div className="content-page">
    <div className="content">

        <div className="row">
            <div className="col-12">
                <div className="page-title-box">
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            
                        </ol>
                    </div>
                    <h4 className="page-title">Home</h4>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h1>home</h1>
                    </div>
                </div>
            </div>
        </div>



        <Footer />
    </div>
</div>
</div>
</div>
</div>
  );
}

export default Home;
