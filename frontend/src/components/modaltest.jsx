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

              
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Modaltest