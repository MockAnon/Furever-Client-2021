import React, { Component } from 'react';
import { Dropdown, ButtonToolbar, Button, Form } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';

//import { Value } from 'sass';

//import assets
const axios = require('axios');

// mappers to map the event keys with a more readable text
const sexMapper = {
  Sex: 'Sex',
  M: 'Male',
  F: 'Female'
};
const sizeMapper = {
  Size: 'Size',
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
  XLarge: 'XLarge'
};

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: '',
      sex: '',
      age: '',
      size: ''
    };
  }

  render() {
    return <section className="panel panel-default">{this.renderDropdownButtons()}</section>;
  }

  // renders the drop down buttons, sets defaults if nothing selected
  renderDropdownButtons = () => {
    const animalTitle = this.state.animal !== '' ? this.state.animal : 'Animal';
    const sexTitle = this.state.sex !== '' ? this.state.sex : 'Sex';
    const ageTitle = this.state.age !== '' ? this.state.age : 'Age';
    const sizeTitle = this.state.size !== '' ? this.state.size : 'Size';

    return (
      <div className="filter-buttons panel-body" id="adoptfilterbgcolor">
        <p class="">
          <strong>Filter</strong>
        </p>

        <div class="search-input standard-width">
          <select id="dropdown-animal" value={this.state.animal} onChange={this.changeAnimal}>
              <option value="">Please Select Animal</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
          </select>
          <select key="Sex" id="dropdown-sex" value={this.state.sex} onChange={this.changeSex}>
            <option value="">Please Select Sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <select key="Age" id="dropdown-age" value={this.state.age} onChange={this.changeAge}>
              <option value="">Please Select Age</option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
            <select key="Size" id="dropdown-size" value={this.state.size} onChange={this.changeSize}>
              <option value="">Please Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="XLarge">XLarge</option>
            </select>
            <div>
              <Button onClick={this.filterSubmit}>Submit</Button>
              <Button onClick={this.resetFilter}>Reset Filter</Button>
            </div>
        </div>
      </div>
    );
  };

  changeAnimal = e => {
     this.setState({ animal: e.target.value });
     console.log(this.state);
  };

  changeSize = e => {
    this.setState({ size: e.target.value });
  };

  changeSex = e => {
    this.setState({ sex: e.target.value });
  };

  changeAge = e => {
    this.setState({ age: e.target.value });
  };

  // submits selected filters to adopt
  filterSubmit = event => {
    event.preventDefault();
    // no options selected, break
    if (!this.state.animal && !this.state.size && !this.state.sex && !this.state.age) {
      return;
    }

    const { rerenderPets } = this.props;

    // constructs output obj, only puts in the selected filters
    const outputObj = {};
    if (this.state.size !== '') {
      outputObj.size = this.state.size;
    }
    if (this.state.age !== '') {
      outputObj.age = this.state.age;
    }
    if (this.state.sex !== '') {
      outputObj.sex = this.state.sex;
    }
    if (this.state.animal !== '') {
      outputObj.animal = this.state.animal;
    }

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/pets/filter`, outputObj)
      .then(function(response) {
        rerenderPets(JSON.stringify(response), outputObj);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  resetFilter = () => {
    this.setState({
      animal: '',
      sex: '',
      age: '',
      size: ''
    });
    this.props.resetFilter();
  };
}

export default AdoptFilter;
