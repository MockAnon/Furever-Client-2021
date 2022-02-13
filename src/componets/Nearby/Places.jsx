import React, { Component } from 'react';

class Places extends Component {
  //Function to determine if the establishment is currently OPEN or CLOSED
  return_open = status => {
    if (status === true) {
      return 'OPEN';
    }
    return 'CLOSED';
  };
  
  render() {

    let opening;
    if(this.props.place['opening-hours'] != null) {
      opening = <th className="col-sm-4 text-center"> {this.return_open(this.props.place['opening-hours']['open_now'])}</th>;
    } else {
      opening = <th className="col-sm-4 text-center"> PERMANENTLY CLOSED </th>;
    }

    return (
      <React.Fragment>
        <tr>
          <th className="col-m-4">{this.props.place.name}</th>
          <th className="col-sm-4 text-center"> {this.props.place.rating} / 5</th>
          {opening}
        </tr>
      </React.Fragment>
    );
  }
}

export default Places;
