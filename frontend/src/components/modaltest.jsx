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
                  <select class="form-control select2" data-toggle="select2">
                    <option>Select</option>
                    <optgroup label="Alaskan/Hawaiian Time Zone">
                      <option value="AK">Alaska</option>
                      <option value="HI">Hawaii</option>
                    </optgroup>
                    <optgroup label="Pacific Time Zone">
                      <option value="CA">California</option>
                      <option value="NV">Nevada</option>
                      <option value="OR">Oregon</option>
                      <option value="WA">Washington</option>
                    </optgroup>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="password1" className="form-label">Password</label>
                  <select class="select2 form-control select2-multiple" data-toggle="select2" multiple="multiple" data-placeholder="Choose ...">
                    <optgroup label="Alaskan/Hawaiian Time Zone">
                      <option value="AK">Alaska</option>
                      <option value="HI">Hawaii</option>
                    </optgroup>
                  
                    <optgroup label="Eastern Time Zone">
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                    
                    </optgroup>
                  </select>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="customCheck2" />
                    <label className="form-check-label" htmlFor="customCheck2">Remember me</label>
                  </div>
                </div>

                <div className="mb-3 text-center">
                  <button
                    data-bs-dismiss="modal"
                    onClick={props.alltestes2}
                    className="btn btn-rounded btn-info"
                    type="submit"
                  >
                    Submit
                  </button>
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