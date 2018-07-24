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

  return(
  <div>
    <div>
      <h4>{props.highlight.title}</h4>
      <h5>Upvotes: {props.highlight.upvotes} </h5>
    </div>
    <div>
      {highlight}
    </div>
  </div>
  )
};

export default VideoTileItem;



// <div dangerouslySetInnerHTML={convertMediaEmbed(props.highlight.secureMediaEmbed.content)} />
