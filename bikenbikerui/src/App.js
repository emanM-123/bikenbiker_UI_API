// App.js
import React from 'react';
import ProductList from './prodectList/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management App</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
