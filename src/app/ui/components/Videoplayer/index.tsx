
import React, { useEffect, useRef, useState } from 'react';
import { VideoReactLib } from './VideoReactLib';
import { ReactPlayerLib } from './ReactPlayerLib';

export function VideoPlayer ({width,height, id}:any) {
  return (
    <div >
    {/* <ReactPlayerLib  /> */}
    {/* <VideoIframe/> */}
    <ReactPlayerLib id={id} />
    </div>
  
  );
};


