"use client";
import Lenis from '@studio-freight/lenis'
import { useEffect, useRef } from 'react'
import {useIntersection} from 'react-use';
import { appVisibility, handleAboutSectionAnimation, preLoaderAnimation } from './Animation';
import About from './Components/About/index';
import Experience from './Components/Experience/index';
import IntroPage from './Components/Introduction/IntroPage';
import PageCover from './Components/PageCover/index';
import Projects from './Components/Projects/index';
import Skills from './Components/Skills/index';
import DisclaimerHeader from "./Components/DisclaimerHeader/index"
import "./globals.css"
export default function Home() {

  let appRef = useRef(null)
  let aboutSectionRef = useRef(null)
  let studioIconRef = useRef(null)
  const intersection = useIntersection(aboutSectionRef,{
    root : null,
    roothMargin : "0px",
    threshold : 0.4,
  })
  const handleCursor = () => {
    const cursor = document.querySelector(".cursor")
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px'
            cursor.style.top = e.pageY + 'px'
        })
    }
  }

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    appVisibility(appRef.current)
    preLoaderAnimation(studioIconRef.current)
    handleCursor()
  },[])

  intersection && intersection.intersectionRatio  < 0.4 ? 
  handleAboutSectionAnimation(false) : handleAboutSectionAnimation(true)
  return (<>
    <div className='cursor'></div>
  <div className='app-wrapper' ref={appRef}>
    <DisclaimerHeader />
  <PageCover elementRef={studioIconRef}  />
      <div className="section light-theme-text-color light-theme-bg-color">
        <IntroPage />
      </div>
      <div className="section" ref={aboutSectionRef}><About /></div>
      <Skills />
      <div className="section exp-section"><Experience /></div>
      {/* <div className='section proj-section'><Projects /></div> */}
      </div>
  </>)
}
