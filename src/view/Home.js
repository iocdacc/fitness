import React, {useContext} from 'react';
import Context from '../context';
import { useHistory } from "react-router-dom";

export default props=>{
  let ref = {}

  let context = useContext(Context)
  let history = useHistory()

  let groupFun = e=>{
    context.group = ref.group.value
    history.push('/video')
  }

  return (
    <>
      <div className="group">
        <ul>
          <li className="clear">
            <span className="group-item">几组训练</span>
            <input className="group-value" type="text" name="group" defaultValue={3} id="group" ref={el=>ref.group=el}/>
          </li>
          <li>
            <button className="group-button"><span onClick={groupFun}>开始</span></button>
          </li>
        </ul>
      </div>
    </>
  )
}