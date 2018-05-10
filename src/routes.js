import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ColorPicker from './containers/colorPicker/ColorPicker';

const Routes = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        component={() => (
          <div>
            <Link to="/colorPicker">color picker</Link>
          </div>
      )}
      />
      <Route path="/colorPicker" component={ColorPicker} />
    </div>
  </Router>
);

export default Routes;
