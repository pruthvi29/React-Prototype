import * as React from 'react';
import './SecNav.css';

class SecNav extends React.Component<{}, {}> {
  /*constructor(props) {
        //active;
        super(props);
       // this.addActiveClass= this.addActiveClass.bind(this);
        this.state = {
            active: false,
        };
    }*/

  /*toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };*/

  render() {
    return (
      <div className="SecNav">
        <div className="pt-button-group pt-fill SecMenu">
          <button className="pt-button pt-align-left no-radius pt-active">Dashboard
          <span className="pt-icon-standard pt-icon-caret-down" />
          </button>
          <button className="pt-button pt-align-left">Inventory</button>
          <button className="pt-button pt-align-left">Trade History</button>
          <button className="pt-button pt-align-left">Vehicle Estimator</button>
          <button className="pt-button pt-fixed pt-align-right" />
          <button className="pt-button pt-fixed pt-align-right no-radius">Locator History</button>
        </div>
        <div className="SecNavMob">
          <h4>
            <span className="pt-icon-standard pt-icon-menu hamMenu" />
              Dashboard
          
            <div className="vertical-menu">
              <p>Main Navigation</p>
              <a href="#">Home</a>
              <a href="#">Applications</a>
              <a href="#">Reports</a>
              <a href="#">Resource Library</a>
              <a href="#">Forms</a>
              <a href="#">News</a>
              <a href="#">Directories</a>
              <p>Secondary Navigation</p>
              <a href="#">Inventory</a>
              <a href="#">Trade History</a>
              <a href="#">Vehicle Estimator</a>
              <a href="#">Locator History</a>
            </div>
          </h4>
        </div>
      </div>
    );
  }
}

export default SecNav;