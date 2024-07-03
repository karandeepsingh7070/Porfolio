import React, { useRef } from 'react'
import "./style.scss"
import {smilingAvatar} from "../../../assets/avatar"
import ShineStudio from "../../../assets/shineStudio.png"
import StudioIcon from '../StudioIcon/index'
import Arrow from "../../../assets/arrow.png"
import Circle from '../AnimatedCircles/index'
const IntroPage = () => {
  let greetRef = useRef(null)
  return (<>
  <StudioIcon src={ShineStudio} arrow={Arrow} />
  <Circle />
  <div className='intro-wrapper'>
    <div className='profile-wrapper'>{smilingAvatar()}</div>
    <div className='inro-wrapper'>
      <div className='greeting-text' ref={greetRef} >{`Hello, I'm`}</div>
      <div className='name-text title-font-family'>Karandeep Singh</div>
      <div className='intro-text'><span className='highlight-text-color'>Frontend Engineer</span> based in New Delhi, India, over 4 years of experience writing code. Building complex application with diverse set of skills. </div>
    </div>
  </div>
  </>)
}

export default IntroPage