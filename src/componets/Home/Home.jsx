import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Component
import Login from './Login';
import Register from './Register';

function Home( props ) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem('userId')) {
      props.showClippy(false, 'empty');
    } else {
      props.showClippy(true, 'login');
    };
  });

  return (     
    <Fragment>
      <video id="home-video-background" loop autoPlay>
        <source src={require('../../assets/bg.mp4')} type="video/mp4" />
      </video>

      <section id="home-panel" className="panel panel-default">
        <h1 className="home-title">
          Fur <i className="fas fa-paw home-title-icon" /> Ever
        </h1>

        <Greetings />
      </section>
    </Fragment>
  )
};

function Greetings() {
  const [loginActive, setLoginActive] = useState(true);
  const [registerActive, setRegisterActive] = useState(false);
  const [showClippy, setShowClippy] = useState(false);

  let navigate = useNavigate();

  function redirectAdoptPage () { 
    navigate("/adopt");
  };

  function showLogin (event) {
    event.preventDefault();
    setLoginActive( true );
    setRegisterActive( false );
  };
  
  function showRegister (event) {
    event.preventDefault();
    setLoginActive( false );
    setRegisterActive( true );
  };
  

  if (sessionStorage.getItem('userId')) {
    return <p></p>;
  }
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-6">
                  <a id="login-form-link" onClick={showLogin}>
                    Login
                  </a>
                </div>
                <div className="col-xs-6">
                  <a id="register-form-link" onClick={showRegister}>
                    Register
                  </a>
                </div>
              </div>
              <hr />
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  {loginActive && <Login redirectAdoptPage={redirectAdoptPage} />}
                  {registerActive && <Register redirectAdoptPage={redirectAdoptPage} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


export default Home;