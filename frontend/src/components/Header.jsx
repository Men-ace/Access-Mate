// src/components/Header.js
import React, { useState } from 'react';
import { Accessibility } from 'lucide-react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    alert('Login functionality not implemented yet!');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    alert('Logout functionality not implemented yet!');
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100 mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Accessibility size={30} className="me-2 text-white" aria-hidden="true" />
          <span className="h4 mb-0 text-white">Accessibility Checker</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogin} className="me-2">
                Login
              </Button>
            ) : (
              <Button variant="outline-light" onClick={handleLogout} className="me-2">
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;