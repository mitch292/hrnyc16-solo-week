import React from 'react';
import axios from 'axios';
import VideoTileList from './videoTileList.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedHighlights: [],
      selectedSport: '',
      mls: {
        highlights: [],
        ready: false
      },
      mlb: {
        highlights: [],
        ready: false

      },
      nba: {
        highlights: [],
        ready: false
      },
      worldSoccer: {
        highlights: [],
        ready: false
      },
      showHighlights: false,
    }
    this.getHighlights = this.getHighlights.bind(this);
    this.handleSportSelection = this.handleSportSelection.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  getHighlights() {
    
    axios.get('/fetchMLSHighlights')
      .then((response) => {
        this.setState({
          mls: {
            highlights: response.data,
            ready: true
          }
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the highlights:', err)
      })
    
    axios.get('/fetchMLBHighlights')
      .then((response) => {
        this.setState({
          mlb: {
            highlights: response.data,
            ready: true
          }
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the mlb highlights', err)
      })

    axios.get('/fetchNBAHighlights')
      .then((response) => {
        this.setState({
          nba: {
            highlights: response.data,
            ready: true
          }
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the nba highlights', err)
      })
    
    axios.get('/fetchSoccerHighlights')
      .then((response) => {
        this.setState({
          worldSoccer: {
            highlights: response.data,
            ready: true
          }
        })
        console.log('what the world soccer data looks like', response.data)
      })
      .catch((err) => {
        console.error('there was an error fetching the world soccer highlights', err)
      })
    
  }

  handleSportSelection(e) {
    this.setState({
      selectedHighlights: this.state[e.target.value].highlights,
      showHighlights: true,
      selectedSport: e.target.value
    })
  }

  handleHomeClick() {
    this.setState({
      showHighlights: false
    })
  }

  componentDidMount() {
    this.getHighlights();
  }

  render() {
    let highlightToggle = this.state.showHighlights ?
      <VideoTileList sport={this.state.selectedSport} highlights={this.state.selectedHighlights} /> : 
      null;
    
    let mlbButton = this.state.mlb.ready ? 
      <button value="mlb" onClick={this.handleSportSelection}>MLB</button> :
      <button value="mlb" onClick={this.handleSportSelection}>Please wait...</button>

    let mlsButton = this.state.mls.ready ?
      <button value="mls" onClick={this.handleSportSelection}>MLS</button> : 
      <button value="mls" onClick={this.handleSportSelection}>Please wait...</button>

    let nbaButton = this.state.nba.ready ?
    <button value="nba" onClick={this.handleSportSelection}>NBA</button> : 
    <button value="nba" onClick={this.handleSportSelection}>Please wait...</button>

    let worldSoccerButton = this.state.nba.ready ?
    <button value="worldSoccer" onClick={this.handleSportSelection}>WORLD SOCCER</button> : 
    <button value="worldSoccer" onClick={this.handleSportSelection}>Please wait...</button>


    return (
      <div>
        <h2>filter: HIGHLIGHTS</h2>
        <div>
          <button value="home" onClick={this.handleHomeClick}>HOME</button> 
          {mlbButton} 
          {mlsButton}
          {nbaButton}
          {worldSoccerButton}
        </div>
        <div>
          {highlightToggle}
        </div>
      </div>
    )
  }
}

export default HomePage;