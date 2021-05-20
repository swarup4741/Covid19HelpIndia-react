import React, {lazy, Suspense} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import {STATE_CODES, STATE_NAMES} from './Data/Constants';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Resources = lazy(() => import('./components/Resources'));

const State = lazy(() => import('./components/State'));

const App = () => {
  const pages = [
    {
      link: '/',
      pageName: 'Home',
      view: Home,
    },
    {
      link: '/about',
      pageName: 'About',
      view: About,
    },
    {
      link: '/resources',
      pageName: 'Resources',
      view: Resources,
    },
  ];

  return (
    <div className="App">
      <Router>
        <Navbar pages={pages} />
        <Suspense
          fallback={<div style={{height: '100vh', background: 'grey'}} />}
        >
          <Switch>
            {pages.map((val, i) => {
              return (
                <Route
                  exact
                  path={val.link}
                  key={i}
                  render={({match}) => <val.view />}
                ></Route>
              );
            })}
            {STATE_CODES.map((item, idx) => {
              return (
                <Route
                  exact
                  key={idx}
                  path={`/state/${STATE_NAMES[idx].split(' ').join('')}`}
                  render={({match}) => (
                    <Suspense fallback={<div />}>
                      <State stateName={STATE_NAMES[idx]} stateCode={item} />
                    </Suspense>
                  )}
                />
              );
            })}
            <Route render={({match}) => <Home />}></Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
