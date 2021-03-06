import './styles/App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home.js';
import Budget from './pages/Budget.js';
import Transactions from './pages/Transactions.js';
import Loan from './pages/Loan.js';
import Scenarios from './pages/Scenarios';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from "./logo/sfalogo.png";

function App() {

  return (
    <Router>
      <div className="main"> 
      <Navbar bg="none" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="200"
              height="200"
              className="d-inline-block"
              alt="SFA Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="topnav">
              <Nav.Link><Link className="link" to="/">Home</Link></Nav.Link>
              <Nav.Link><Link className="link" to="/budget">Budget</Link></Nav.Link>
              <Nav.Link><Link className="link" to="/transactions">Transactions</Link></Nav.Link>
              <Nav.Link><Link className="link" to="/loan">Loan</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        <Switch>
          <Route path="/budget">
            <Budget />
          </Route>
          <Route path="/scenarios">
            <Scenarios />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/loan">
            <Loan />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;