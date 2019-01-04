import React from 'react'

function Comment(){
    return(
        <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea"></textarea>
              <label>Comment Here</label>
            </div>
          </div>
        </form>
      </div>
    )
}

export default Comment