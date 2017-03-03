import React from 'react';
import Shows from './shows';
import Releases from './releases';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 className='type-display'>Será</h1>
        </header>
        <main>
          <Releases />
          <Shows />
        </main>
      </div>
    );
  }
}

export default App;
