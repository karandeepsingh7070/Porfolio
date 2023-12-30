import React, { useEffect, useRef, useState } from 'react'
import {circleAnimation, circleAnimation2, expandToggleAnimation, expandToggleAnimation2} from "../../Animation"
import "./style.scss"

const Circle = () => {
    let circleRef = useRef(null)
    let circle1Ref = useRef(null)
    let circle2Ref = useRef(null)
    const [isExapanded,setIsExapanded] = useState(false)
    const handleExpand = () => {
        if (isExapanded) {
            expandToggleAnimation2(circleRef.current)
            setIsExapanded(false)
            return
        }
        expandToggleAnimation(circleRef.current)
        setIsExapanded(true)
    }
    useEffect(() => {
        circleAnimation(circleRef.current)
        circleAnimation2(circle1Ref.current)
        circleAnimation(circle2Ref.current)
    },[])
  return (<>
  <div className='circle pop-theme-color' onClick={handleExpand} ref={circleRef}></div>
  <div className='circle-1 pop-theme-color' ref={circle1Ref}></div>
  <div className='circle-2 pop-theme-color' ref={circle2Ref}></div>
  </>)
}

export default Circle