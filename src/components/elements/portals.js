import React from 'react';


export class Confirm extends React.Component {
  render() {
    const { children, onYes, closePortal } = this.props;
    return (
      <div className="modal">
        <div className="modal-content">
          { children }
          <p>
            <button onClick={ onYes }>Yes</button>
            <button onClick={ closePortal }>No</button>
          </p>
        </div>
      </div>
    );
  }
}
