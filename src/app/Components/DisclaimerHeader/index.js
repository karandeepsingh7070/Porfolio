import React, { useState } from 'react'
import "./style.scss"

const DisclaimerHeader = () => {
    const [showAbout, setShowAbout] = useState(false)
    return (<>
        <div className='disclaimer-wrapper'>
            <div className='disclaimer-content'>
                <p onClick={() => {
                    setShowAbout(!showAbout)
                }} className='main-tag'>Designed & Developed By - Karandeep Singh @about</p>
                {showAbout ? <div className='disclaimer-about'>
                    <p>Developed in @2022</p>
                    <p>Tech Used</p>
                    <p>Next Js</p>
                    <p>Gsap</p>
                    <p>Sass</p>
                    <p>Webpack</p>
                    <p>Figma</p>
                    <br></br>
                    <p>Rough UI Design  <a target="_blank" href='https://www.figma.com/design/5dSsvdRT0DTmroYcwNz3fG/Portfolio?node-id=0-1&t=4mqbIk4VThNtPmNA-1'>Link</a></p>
                </div> : <></>}
            </div>
        </div>
    </>)
}

export default DisclaimerHeader