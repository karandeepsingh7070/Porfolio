import React, { useEffect, useRef } from 'react'
import "./style.scss"
import {smilingAvatar} from "../../../assets/avatar"
import ShineStudio from "../../../assets/shineStudio.png"
import StudioIcon from '../StudioIcon/index'
import Arrow from "../../../assets/arrow.png"
import { TweenMax, Power3 } from "gsap"
import Circle from '../AnimatedCircles/index'
const IntroPage = () => {
  let greetRef = useRef(null)
  // useEffect(() => {
  //   let greetItem = greetRef.current
  //   TweenMax.from(
  //     greetItem,
  //     0.8, {
  //       opacity : 0.1,
  //       y: -20,
  //       ease: Power3.easeOut
  //     }
  //   )
  // },[])
  return (<>
  <StudioIcon src={ShineStudio} arrow={Arrow} />
  <Circle />
  <div className='intro-wrapper'>
    <div className='profile-wrapper'>{smilingAvatar()}</div>
    <div className='inro-wrapper'>
      <div className='greeting-text' ref={greetRef} >Hello, I'm</div>
      <div className='name-text title-font-family'>Karandeep Singh</div>
      <div className='intro-text'>Some gibrish <span className='highlight-text-color'>Web Developer</span> with over 2 years of experience writing code. I am adept at contributing to highly collaborative work environment.  I am adept at contributing to highly </div>
    </div>
  </div>
  </>)
}

export default IntroPage