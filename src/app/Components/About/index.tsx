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
                <div className='about-description'>Some gibrish <span className='highlight-text-color'>Web Developer</span> with over 2 years of experience writing code. I am adept at contributing to highly collaborative work environment while delivering efficient and effective web solutions, and well skilled in analysis. Solution driven Engineer with over 2 years of experience writing code. I am adept at contributing to highly collaborative work.</div>
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