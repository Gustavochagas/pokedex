import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import List from './pages/List';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={List} />
    </BrowserRouter>
  )
}

export default Routes;
