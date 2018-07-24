import React from 'react';

const VideoTileItem = (props) => {

  let highlight;

  if (props.sport === 'mlb') {
    highlight = 
    <video width="600" height="350" controls>
      <source src={props.highlight.highlightUrl} type="video/mp4" />
    </video>
  } else {
    highlight = <div dangerouslySetInnerHTML={{__html: props.highlight.secureMediaEmbed.content}} />
  }

  let saveButton = props.currentUser ? <button>SAVE</button> : null

  return(
  <div>
    <div>
      <h4><a href={`https://www.reddit.com${props.highlight.redditPath}`}> {props.highlight.title}</a></h4>
      <h5>Upvotes: {props.highlight.upvotes} </h5>
    </div>
    <div>
      {highlight}
    </div>
    {saveButton}
  </div>
  )
};

export default VideoTileItem;



// <div dangerouslySetInnerHTML={convertMediaEmbed(props.highlight.secureMediaEmbed.content)} />
