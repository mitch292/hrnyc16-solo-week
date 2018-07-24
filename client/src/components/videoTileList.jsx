import React from 'react';
import VideoTileItem from './videoTileItem.jsx'

const VideoTileList = (props) => (
  <div>
    {props.highlights.map((highlight) => (
      <VideoTileItem currentUser={props.currentUser} sport={props.sport} key={highlight.id} highlight={highlight}/>
    ))}
  </div>
)

export default VideoTileList;