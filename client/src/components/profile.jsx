import React from 'react';
import VideoTileItem from './videoTileItem.jsx';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idValue: '',
      maxLength: 25
    }
    this.handleIdChange = this.handleIdChange.bind(this)
    this.removeSavedItem = this.removeSavedItem.bind(this)
  }

  handleIdChange(e) {
    this.setState({
      idValue: e.target.value,
      maxLength: 25 - e.target.value.length
    })
  }

  removeSavedItem(redditId) {
    axios.delete('/removeSaved', {params: {redditId: redditId}})
      .then((success) => {
        console.log()
        this.props.fetchUserHighlights();
      })
      .catch((err) => {
        console.error(('there was an error deleting this video from your profile', err))
      })
  }


  render() {

    let idToggle = this.props.currentUser ? <p className="greeting">Hello {this.props.currentUser}! </p>  :         
      <div>
        <h3 className="greeting">Create/Enter your unique identifier to see your saved videos</h3>
        <p className="chars"><small>CHARACTERS LEFT: {this.state.maxLength} </small></p>
        <form onSubmit={(event) => this.props.handleIdSubmit(event, this.state.idValue)}>
          <label>
            Unique ID: 
            <input type="text" value={this.state.idValue} onChange={(e) => this.handleIdChange(e)}/>
          </label>
          <input type="submit" value="Submit" className="other"/>
        </form>
      </div>

      let savedVideos = this.props.savedHighlights.map((highlight) => (
        <VideoTileItem removeSavedHighlight={this.removeSavedItem} saved={true} key={highlight.id} sport={highlight.sport} highlight={highlight}/>
      ))

    return (
      <div className="content">
        {idToggle}
        {savedVideos}
      </div>

    )
  }

}

export default Profile;