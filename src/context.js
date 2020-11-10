import React from 'react';

export default React.createContext({
  video: [
    "/fitness/video/day6.mp4",
    "/fitness/video/day6.mp4",
    "/fitness/video/day1.mp4",
    "/fitness/video/day2.mp4",
    null,
    "/fitness/video/day4.mp4",
    "/fitness/video/day5.mp4",
  ],
  group: 0,
  dayCn: ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
  day: new Date().getDay()
});