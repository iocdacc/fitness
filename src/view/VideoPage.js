import React, { useContext, useState, useEffect } from 'react';
import Context from '../context';
import { useHistory } from "react-router-dom";

export default props => {
  let ref = {}
  let videoArray = []
  let context = useContext(Context)
  let history = useHistory()
  let [play, setPlay] = useState(0)
  let [second, setSecond] = useState(5)
  let [secondclassName, setSecondclassName] = useState('shrink-up')
  if (context.group > 0) {
    for (let index = 0; index < context.group; index++) {
      context.video[context.day] && videoArray.push(context.video[context.day] + "?index=" + index)
    }
  } else {
    history.replace('/')
  }

  let endedFun = e => {
    setPlay(++play)
  }

  useEffect(() => {
    let intervalID = setInterval(() => {
      setSecond(--second)
      second % 2 === 0 ? setSecondclassName("shrink-up2") : setSecondclassName("shrink-up")
      second === 0 && clearInterval(intervalID)
    }, 1000);
    !videoArray[play] && clearInterval(intervalID)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      {second > 0 && (
        <div className="ready">
          <ul>
            <li>{context.dayCn[context.day]}</li>
            {
              videoArray[play] ?
                <li className={secondclassName}>准备 {second}</li> :
                <li>休息</li>
            }
          </ul>
        </div>
      )}
      {second === 0 && videoArray[play] && (
        <video onClick={e => !e.target.fullscreenElement && e.target.requestFullscreen()} src={videoArray[play]} onEnded={endedFun} autoPlay ref={el => ref.video = el}></video>
      )}
      {second === 0 && !videoArray[play] && (
        <div className="ready">
          <ul>
            <li>训练完成</li>
          </ul>
        </div>
      )}
    </>
  )
}