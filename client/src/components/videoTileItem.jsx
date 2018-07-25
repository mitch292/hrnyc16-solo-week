import React from 'react';

const VideoTileItem = (props) => {

  let highlight;

  if (props.sport === 'mlb') {
    //special formatting for mlb highlights
    highlight = 
    <video width="600" height="350" controls>
      <source src={props.highlight.highlightUrl} type="video/mp4" />
    </video>
  } else {
    let embed;
    if (props.saved) {
      //due to how data is stored in the db, we need a condition here to get required data differently
      embed = props.highlight.secureMediaEmbed
    } else {
      //data from api call
      embed = props.highlight.secureMediaEmbed.content
    }
    highlight = <div dangerouslySetInnerHTML={{__html: embed}} />
  }

  //should only see save button if user is logged in were not displaying saved data....from the user's page the app is not passing a currentUser prop to this component
  let saveButton = props.currentUser ? <button onClick={(highlight, sport) => props.saveHighlight(props.highlight, props.sport)}>SAVE</button> : null

  //should see delete button if were on the users profile
  let deleteButton = props.saved ? <button onClick={(redditId) => props.removeSavedHighlight(props.highlight.id)}>REMOVE</button> : null;

  return(
  <div>
    <div>
      <h4><a href={`https://www.reddit.com${props.highlight.redditPath}`}> {props.highlight.title}</a></h4>
    </div>
    <div>
      {highlight}
    </div>
    {saveButton}
    {deleteButton}
  </div>
  )
};

export default VideoTileItem;



