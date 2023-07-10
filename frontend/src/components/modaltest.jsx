import React from 'react'

function Modaltest(props) {
  
    return (
        <div>
    <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center mt-2 mb-4">
            <h3 className="text-info font-weight-bold p-2 border rounded-pill shadow-sm" style={{ fontFamily: 'Times New Roman, serif' }}>
              Choose an option for testing
            </h3>
            </div>

            <form action="#" className="ps-3 pe-3">
              <div className="mb-3">
                <label htmlFor="emailaddress1" className="form-label">Email address</label>
                <input className="form-control" type="email" id="emailaddress1" required placeholder="john@deo.com" />
              </div>

              <div className="mb-3">
                <label htmlFor="password1" className="form-label">Password</label>
                <input className="form-control" type="password" required id="password1" placeholder="Enter your password" />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="customCheck2" />
                  <label className="form-check-label" htmlFor="customCheck2">Remember me</label>
                </div>
              </div>

              <div className="mb-3 text-center">
                <button className="btn btn-rounded btn-info" type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

        </div>

    )
}

export default Modaltest