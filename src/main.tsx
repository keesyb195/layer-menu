import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './sidebar';
import './index.css';
import invariant from 'tiny-invariant';

const root = document.getElementById('root');
invariant(root, 'Unable to find #root element');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,
);
