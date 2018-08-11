import React from 'react';
import VideoTileItem from './videoTileItem.jsx'

const VideoTileList = (props) => {
  if (props.highlights.length > 0) {
    return (
      <div className="content">
        {props.highlights.map((highlight) => (
          <VideoTileItem saveHighlight={props.saveHighlight} currentUser={props.currentUser} sport={props.sport} key={highlight.id} highlight={highlight}/>
        ))}
      </div>
    )
  } else {
    return (
      <div className="line">
        <p className="content">Sorry, it looks like there are no recent highlights</p>
      </div>
    )
  }
}

export default VideoTileList;