import React from 'react';
import VideoTileItem from './videoTileItem.jsx'

const VideoTileList = (props) => (
  <div className="content">
    {props.highlights.map((highlight) => (
      <VideoTileItem saveHighlight={props.saveHighlight} currentUser={props.currentUser} sport={props.sport} key={highlight.id} highlight={highlight}/>
    ))}
  </div>
)

export default VideoTileList;