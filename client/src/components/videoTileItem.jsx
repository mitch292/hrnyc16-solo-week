import React from 'react';

const VideoTileItem = (props) => {

    //for mls videos this is needed - the iframe of the video comes as a string
    //to utilize react's dangerouslySetInnerHTML we must pass it a 
    // let convertMediaEmbed = (string) => {
    //   return {__html: string}
    // }
  let highlight;

  if (props.sport === 'mls') {
    highlight = <div dangerouslySetInnerHTML={{__html: props.highlight.secureMediaEmbed.content}} />
  } else {
    highlight = 
      <video width="600" height="350" controls>
        <source src={props.highlight.highlightUrl} type="video/mp4" />
      </video>
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
