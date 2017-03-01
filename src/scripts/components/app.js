import React from 'react';
import Shows from './shows';
import Releases from './releases';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Será</h1>
        <Releases />
        <Shows />
      </div>
    );
  }
}

export default App;
