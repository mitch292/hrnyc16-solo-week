import React from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
      currentUser: null,
      userSavedHighlights: []
    }
    this.getHighlights = this.getHighlights.bind(this);
    this.handleSportSelection = this.handleSportSelection.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.saveHighlight = this.saveHighlight.bind(this);
    this.fetchUserHighlights = this.fetchUserHighlights.bind(this);
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

  saveHighlight(highlight, sport) {
    let formattedHighlight = highlight;
    formattedHighlight.category = sport
    formattedHighlight.userId = this.state.currentUser

    if (formattedHighlight.category === 'mlb') {
      axios.post('/saveMlbHighlight', formattedHighlight)
      .then((response) => {
        console.log('highlight saved!')
        NotificationManager.success('', 'Highlight saved!', 2000)
        this.fetchUserHighlights();
      })
      .catch((err) => {
        console.error('there was an error saving this highlight', err)
      })
    } else {
      axios.post('/saveOtherHighlight', formattedHighlight)
        .then((response) => {
          console.log('highlight saved!')
          NotificationManager.success('', 'Highlight saved!', 2000)
          this.fetchUserHighlights();
        })
        .catch((err) =>  {
          console.error('there was an error saving this highlight to the database', err)
        })
    }

    
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
    e.preventDefault()
    this.setState({
      currentUser: id
    }, this.fetchUserHighlights(id)) 

  }

  fetchUserHighlights(id) {
    let userId = id || this.state.currentUser
    axios.get('/fetchUserHighlights', {
      params: {
        id: userId
      }
    })
      .then((response) => {
        console.log('the users videos in the clinet', response)
        this.setState({
          userSavedHighlights: response.data
        })
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
      <VideoTileList saveHighlight={this.saveHighlight} currentUser={this.state.currentUser} sport={this.state.selectedSport} highlights={this.state.selectedHighlights} /> : 
      <Profile savedHighlights={this.state.userSavedHighlights} currentUser={this.state.currentUser} handleIdSubmit={this.handleIdSubmit} />;
    
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
        <NotificationContainer />
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