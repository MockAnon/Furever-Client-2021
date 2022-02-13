import React from 'react';
import { withRouter, Route, Routes, useHistory } from 'react-router-dom';
// import PropTypes from "prop-types";
// import { withRouter } from "react-router";

//
// import { useNavigation } from '@react-navigation/native';
import PropTypes from "prop-types";
// import { withRouter } from "react-router";

import Adopt from './Adopt/Adopt';
import Events from './Events/Events';
import Home from './Home/Home';
import Nearby from './Nearby/Nearby';
import Care from './Care/Care';

class Main extends React.Component {
  // let navigate = useNavigate();
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired
  // };
  // let history = useHistory();
  render() {
    // const { navigation } = this.props;
    // const navigate = useNavigate();
    // let history = useHistory();
    // const { match, location, history } = this.props;
    const { history } = this.props;
    // weird props format to pass in props through a react-router component
    // const navigation = useNavigation();
    return (

        <Routes>
          {/* <Route exact path="/">
            <Home props={this.props} showClippy={this.props.showClippy} />
          </Route>
          <Route path="/events">
            <Events props={this.props} showClippy={this.props.showClippy} />
          </Route>

          <Route path="/adopt" >
            <Adopt props={this.props} showClippy={this.props.showClippy} />
          </Route>

          <Route path="/care" >
            <Care props={this.props} showClippy={this.props.showClippy} />
          </Route>

          <Route path="/nearby" >
            <Nearby props={this.props} showClippy={this.props.showClippy} />
          </Route> */}

          <Route exact path="/" element={<Home {...this.props} showClippy={this.props.showClippy} />} />
          <Route path="/events" element={<Events {...this.props} showClippy={this.props.showClippy} />} />
          <Route path="/adopt" element={<Adopt {...this.props} showClippy={this.props.showClippy} />} />
          <Route path="/care" element={<Care {...this.props} showClippy={this.props.showClippy} />} />
          <Route path="/nearby" element={<Nearby {...this.props} showClippy={this.props.showClippy} />} /> 

          {/* <Route exact path="/" render={props => <Home {...props} showClippy={this.props.showClippy} />} />
          <Route path="/events" render={props => <Events {...props} showClippy={this.props.showClippy} />} />
          <Route path="/adopt" render={props => <Adopt {...props} showClippy={this.props.showClippy} />} />
          <Route path="/care" render={props => <Care {...props} showClippy={this.props.showClippy} />} />
          <Route path="/nearby" render={props => <Nearby {...props} showClippy={this.props.showClippy} />} /> */}
        </Routes>
                

    );
  }
}

export default Main;


// import { useNavigate } from 'react-router-dom';
// let navigate = useNavigate();