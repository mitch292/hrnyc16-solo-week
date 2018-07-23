import React from 'react';
import axios from 'axios';

class Homebody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: []
    }
    this.getHighlights = this.getHighlights.bind(this);
  }

  getHighlights() {
    axios.get('/fetchHighlights')
      .then((response) => {
        console.log('the response data for fetching highlights', response.data)
      })
      .catch((err) => {
        console.error('there was an error fetching the highlights:', err)
      })
  }

  componentDidMount() {
    this.getHighlights();
  }

  render() {
    return (
      <h2>Let's see some highlights</h2>
    )
  }
}

export default Homebody;