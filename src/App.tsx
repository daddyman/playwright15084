import { Link, Route, Routes } from 'solid-app-router';
import type { Component } from 'solid-js';
import Home from './Home';
import Test1 from './Test1';

const App: Component = () => (
  <div>
    <h1>Test App</h1>
    <nav>
      <Link id="navtest1" href="/test1">Test1</Link>
      <Link id="navhome" href="/" class="margin-left: 50px">Home</Link>
    </nav>
    <Routes>
      <Route path="/test1" element={<Test1 />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default App;
