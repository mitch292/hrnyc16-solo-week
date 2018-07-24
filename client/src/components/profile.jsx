import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idValue: '',
      maxLength: 25
    }
    this.handleIdChange = this.handleIdChange.bind(this)
  }

  handleIdChange(e) {
    this.setState({
      idValue: e.target.value,
      maxLength: 25 - e.target.value.length
    })
  }


  render() {

    let idToggle = this.props.currentUser ?<p>Hello {this.props.currentUser} </p>  :         
      <div>
        <h3>Create/Enter your unique identifier to see your saved videos</h3>
        <p><small>CHARACTERS LEFT: {this.state.maxLength} </small></p>
        <form onSubmit={(event) => this.props.handleIdSubmit(event, this.state.idValue)}>
          <label>
            Unique ID: 
            <input type="text" value={this.state.idValue} onChange={(e) => this.handleIdChange(e)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

    return (
      <div>
        {idToggle}
        <p>we'll display the videos here</p>
      </div>

    )
  }

}

export default Profile;