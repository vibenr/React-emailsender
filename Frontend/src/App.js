import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register">
            <div class="register">
              <div class="form">
                <form class="login-form" action="/auth/register" method="post">
                  <span class="material-icons">Register</span>
                  <input type="text" placeholder="Name" name="name" required />
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    required
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    required
                  />
                  <button type="submit">Register</button>
                </form>
              </div>
            </div>
          </Route>
          <Route path="/">
            <div class="login">
              <div class="form">
                <form class="login-form" action="/auth/login" method="post">
                  <span class="material-icons">Login</span>
                  <input
                    type="text"
                    placeholder="email"
                    required
                    name="email"
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    required
                  />
                  <button type="submit">Login</button>
                </form>
                 <a href="/register">Register</a>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
