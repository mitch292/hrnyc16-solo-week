import React from 'react';

const VideoTileItem = (props) => {

  let highlight;

  if (props.sport === 'mlb') {
    highlight = 
    <video width="600" height="350" controls>
      <source src={props.highlight.highlightUrl} type="video/mp4" />
    </video>
  } else {
    let embed;
    if (props.saved) {
      embed = props.highlight.secureMediaEmbed
    } else {
      embed = props.highlight.secureMediaEmbed.content
    }
    highlight = <div dangerouslySetInnerHTML={{__html: embed}} />
  }

  let saveButton = props.currentUser ? <button onClick={(highlight, sport) => props.saveHighlight(props.highlight, props.sport)}>SAVE</button> : null

  return(
  <div>
    <div>
      <h4><a href={`https://www.reddit.com${props.highlight.redditPath}`}> {props.highlight.title}</a></h4>
    </div>
    <div>
      {highlight}
    </div>
    {saveButton}
  </div>
  )
};

export default VideoTileItem;



