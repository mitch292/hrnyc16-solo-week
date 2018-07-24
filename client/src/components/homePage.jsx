import React from 'react';
import axios from 'axios';
import VideoTileList from './videoTileList.jsx';
import Profile from './profile.jsx';

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
      currentUser: null
    }
    this.getHighlights = this.getHighlights.bind(this);
    this.handleSportSelection = this.handleSportSelection.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
  }

  getHighlights() {
    
    axios.get('/fetchMLSHighlights')
      .then((response) => {
        console.log('mls data', response.data)
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
        console.log('mlb data', response.data)
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
        console.log('nba data', response.data)
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
        console.log('soccer data', response.data)
        this.setState({
          worldSoccer: {
            highlights: response.data,
            ready: true
          }
        })
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

  handleIdSubmit(e, id) {
    console.log('hellloooo', id)
    e.preventDefault()
    this.setState({
      currentUser: id
    }) 
    
    axios.get('/fetchUserHighlights', {
      params: {
        id: id
      }
    })
      .then((response) => {
        console.log('the users videos in the clinet', response)
      })
      .catch((err) => {
        console.error('there was an error getting the users data from the db', err)
      })


  }

  componentDidMount() {
    this.getHighlights();
  }

  render() {
    let highlightToggle = this.state.showHighlights ?
      <VideoTileList currentUser={this.state.currentUser} sport={this.state.selectedSport} highlights={this.state.selectedHighlights} /> : 
      <Profile currentUser={this.state.currentUser} handleIdSubmit={this.handleIdSubmit} />;
    
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