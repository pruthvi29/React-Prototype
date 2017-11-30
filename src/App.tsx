import * as React from 'react';
import './App.css';
import MainNav from './Components/MainNav/MainNav';
import Header from './Components/Header/Header';
import SecNav from './Components/SecNav/SecNav';
import SearchSection from './Components/SearchSection/SearchSection';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="headWrapper">

          <Header />

          <MainNav />
          <SecNav />
        </div>
        <br />
        <br />
      <SearchSection /> 
      </div>
    );
  }
}

export default App;