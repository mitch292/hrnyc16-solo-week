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
      nfl: {
        highlights: [],
        ready: false
      },
      nhl: {
        highlights: [],
        ready: false
      },
      showHighlights: false,
      currentUser: null,
      userSavedHighlights: [],
      logout: false
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
      })
      .catch((err) => {
        console.error('there was an error fetching the world soccer highlights', err)
      })

    axios.get('/nflHighlights')
      .then((response) => {
        this.setState({
          nfl: {
            highlights: response.data,
            ready: true
          }
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the nfl highlights', err)
      })

    axios.get('/nhlHighlights')
      .then((response) => {
        this.setState({
          nhl: {
            highlights: response.data,
            ready: true
          }
        })
      })
      .catch((err) => {
        console.error('there was an error fetching the nhl highlights', err)
      })
    
  }

  saveHighlight(highlight, sport) {
    let formattedHighlight = highlight;
    formattedHighlight.category = sport
    formattedHighlight.userId = this.state.currentUser

    if (formattedHighlight.category === 'mlb') {
      axios.post('/saveMlbHighlight', formattedHighlight)
      .then((response) => {
        NotificationManager.success('', 'Highlight saved!', 2000)
        this.fetchUserHighlights();
      })
      .catch((err) => {
        console.error('there was an error saving this highlight', err)
      })
    } else {
      axios.post('/saveOtherHighlight', formattedHighlight)
        .then((response) => {
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
      <Profile logout={this.state.logout} fetchUserHighlights={this.fetchUserHighlights} savedHighlights={this.state.userSavedHighlights} currentUser={this.state.currentUser} handleIdSubmit={this.handleIdSubmit} />;
    
    let mlbButton = this.state.mlb.ready ? 
      <button value="mlb" onClick={this.handleSportSelection}>MLB</button> :
      <button value="mlb" onClick={this.handleSportSelection}>Please wait...</button>

    let mlsButton = this.state.mls.ready ?
      <button value="mls" onClick={this.handleSportSelection}>MLS</button> : 
      <button value="mls" onClick={this.handleSportSelection}>Please wait...</button>

    let nbaButton = this.state.nba.ready ?
      <button value="nba" onClick={this.handleSportSelection}>NBA</button> : 
      <button value="nba" onClick={this.handleSportSelection}>Please wait...</button>
      
    let nflButton = this.state.nfl.ready ?
      <button value="nfl" onClick={this.handleSportSelection}>NFL</button> : 
      <button value="nfl" onClick={this.handleSportSelection}>Please wait...</button>
    
    let nhlButton = this.state.nhl.ready ?
      <button value="nhl" onClick={this.handleSportSelection}>NHL</button> : 
      <button value="nhl" onClick={this.handleSportSelection}>Please wait...</button>

    let worldSoccerButton = this.state.worldSoccer.ready ?
      <button value="worldSoccer" onClick={this.handleSportSelection}>WORLD SOCCER</button> : 
      <button value="worldSoccer" onClick={this.handleSportSelection}>Please wait...</button>


    let logout = this.state.currentUser ? 
      <button onClick={() => this.setState({currentUser: null, userSavedHighlights: [], logout: true})}>LOGOUT</button> :
      null



    return (
      <div>
        <header className="primary-header container group">
          <h2 className="logo">filter: HIGHLIGHTS</h2>
          <div className="notification">
            <NotificationContainer />
          </div>
          <div className="nav primary-nav">
            <button value="home" onClick={this.handleHomeClick}>HOME</button> 
            {mlbButton} 
            {mlsButton}
            {nbaButton}
            {nflButton}
            {nhlButton}
            {worldSoccerButton}
            {logout}
          </div>
        </header>
        <div className="spacer"></div>
        <div>
          {highlightToggle}
        </div>
      </div>
    )
  }
}

export default HomePage;