import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


class NavbarMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      burgerActive: false
    };
  }
  render() {
    return (
     <Fragment>
      {/* 
        <Navbar bg="light" variant="light" className="" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        */}

        <div className="nav-master navbar-fixed-top">
          <div className="nav-custom nav-justified nav-tabs standard-width">
            <div className="menu-toggle">
              <img className="header-logo" src={require('../../assets/logos/furever-logo-b.png')} alt="furever logo"/>
              
              <div className='burger-top'>
                <div onClick={this.toggleMenu} id="nav-icon3" className={this.state.burgerActive ? "open" : null}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <ul class={"navigation-links" + (this.state.burgerActive ? " open" : "")}>
              <li role="presentation">
                <Link className="nav-item" to="/adopt">Adopt</Link>
              </li>
              {this.loggedInUser()}
            </ul>
          </div>
        </div> 
      </Fragment>
    );
  }

  logoutUser = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  hasPetUser = () => {
    if (sessionStorage.getItem('adopted') === 'true') {
      return (
        <Fragment>
          {/* <li role="presentation">
            <Link to="/care">Care</Link>
          </li> */}
          <li role="presentation">
            <Link to="/events">Dashboard</Link>
          </li>
          <li role="presentation">
            <Link to="/nearby"> Nearby</Link>
          </li>
        </Fragment>
      );
    }
  };

  loggedInUser = () => {
    if (sessionStorage.getItem('userId')) {
      return (
        <Fragment>
          {this.hasPetUser()}
          {/* <li role="presentation" className="nav-right disabled">
            <a className="">Logged in as {sessionStorage.getItem('username')}</a>
          </li> */}

          <li role="presentation" className="nav-right" onClick={this.logoutUser}>
            <Link to="/">Logout</Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
            <li id="home-tab" role="presentation">
              <Link className="nav-item" to="/">Portal</Link>
            </li>
        </Fragment>
      )
    }
  };

  toggleMenu = () => {
     this.setState({ burgerActive: !this.state.burgerActive });
  }
}

export default NavbarMain;
