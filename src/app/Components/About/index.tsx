import { professionalAvatar } from '@/assets/avatar'
import React, { useRef } from 'react'
import Image from "next/image";
import Download from "../../../assets/download.png"
import "./style.scss"
import StudioIcon from '../StudioIcon/index';
import Arrow from "../../../assets/arrow.png"
import ShineStudio from "../../../assets/shineStudio.png"

const About = () => {
    // const handleFadeInAnimation = () => {
    //     fadeInAnimation('.abt-name-txt')
    // }
    // const handleFadeOutAnimation = () => {
    //     fadeInAnimation('.abt-name-txt')
    // }
    return (<>
        <StudioIcon src={ShineStudio} arrow={Arrow} />
        <div className='about-wrapper'>
            <div className='about-content'>
                <div className='name-text title-font-family abt-name-txt'>Karandeep Singh</div>
                <div className='about-description'>A <span className='highlight-text-color'>Frontend Engineer </span> with over 4 years of experience in building web applications. My journey into the world of software started with a simple curiosity about how websites work, and it quickly turned into a passion that’s been driving my career ever since.
                <br></br>Take a look around my portfolio to see some of the exciting projects I've worked on.</div>
                <div className='resume-btn subtitle-font-size disable-bg-color'>
                    <Image
                        src={Download}
                        alt="Logo"
                    />
                    Resume</div>
            </div>
            <div className='profile-wrapper'>{professionalAvatar()}</div>
        </div>
    </>)
}

export default About