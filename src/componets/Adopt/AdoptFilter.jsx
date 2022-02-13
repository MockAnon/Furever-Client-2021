import React, { Component } from 'react';
import { DropdownButton, Dropdown, ButtonToolbar, Button } from 'react-bootstrap';

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
        <p>
          <strong>Filter</strong>
        </p>
        <ButtonToolbar className="btn-group">
          <DropdownButton title={animalTitle} key="Animal" id="dropdown-animal" onSelect={this.changeAnimal}>
            <Dropdown.Item eventKey="Cat">Cat</Dropdown.Item>
            <Dropdown.Item eventKey="Dog">Dog</Dropdown.Item>
          </DropdownButton>
          <DropdownButton title={sexMapper[sexTitle]} key="Sex" id="dropdown-sex" onSelect={this.changeSex}>
            <Dropdown.Item eventKey="M">Male</Dropdown.Item>
            <Dropdown.Item eventKey="F">Female</Dropdown.Item>
          </DropdownButton>
          <DropdownButton title={ageTitle} key="Age" id="dropdown-age" onSelect={this.changeAge}>
            <Dropdown.Item eventKey="Baby">Baby</Dropdown.Item>
            <Dropdown.Item eventKey="Young">Young</Dropdown.Item>
            <Dropdown.Item eventKey="Adult">Adult</Dropdown.Item>
            <Dropdown.Item eventKey="Senior">Senior</Dropdown.Item>
          </DropdownButton>
          <DropdownButton title={sizeMapper[sizeTitle]} key="Size" id="dropdown-size" onSelect={this.changeSize}>
            <Dropdown.Item eventKey="Small">Small</Dropdown.Item>
            <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
            <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
            <Dropdown.Item eventKey="XLarge">XLarge</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
        <br />
        <ButtonToolbar className="btn-group">
          <Button onClick={this.filterSubmit}>Submit</Button>
          <Button onClick={this.resetFilter}>Reset Filter</Button>
        </ButtonToolbar>
      </div>
    );
  };

  // controlled inputs for button selection
  changeAnimal = (key, event) => {
    this.setState({ animal: key });
  };

  changeSize = (key, event) => {
    this.setState({ size: key });
  };

  changeSex = (key, event) => {
    this.setState({ sex: key });
  };

  changeAge = (key, event) => {
    this.setState({ age: key });
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
      .put(`http://localhost:8080/pets/filter`, outputObj)
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
