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
import WhatIf from './pages/WhatIf';
import Scenarios from './pages/Scenarios';
import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem } from 'react-bootstrap';
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
              alt="React Bootstrap logo"
              
            />
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/budget">Budget</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/whatif">What If</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        <Switch>
          <Route path="/budget">
            <Budget />
          </Route>
          <Route path="/whatif">
            <WhatIf />
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