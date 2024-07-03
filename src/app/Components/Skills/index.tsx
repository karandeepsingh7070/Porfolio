import React, { useEffect, useRef } from 'react'
import "./style.scss"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillAnimation } from '@/app/Animation';
import Image from "next/image";

import productionIcon from "../../../assets/production.png"
import narutoIcon from "../../../assets/naruto.png"
import figma from "../../../assets/figma.png"
import teachIcon from "../../../assets/teach.png"
import Skill from './Skill';
import withNoSSR from '@/app/withNoSSR';

const Skills = () => {
    gsap.registerPlugin(ScrollTrigger);
    const splitRef = useRef(null);
    let skillsObj = [
        {
            name: "Music Production",
            icon: productionIcon
        },
        {
            name: "Figma",
            icon: figma
        },
        {
            name: "Binge Watching",
            icon: narutoIcon
        },
        {
            name: "Taking Sessions",
            icon: teachIcon
        },
    ]

    useEffect(() => {
        skillAnimation()
    }, [])
    return (<>
        <div className='skill-wrapper' ref={splitRef}>
            <div className='top-split title-font-family'>
                <h1 className='top-h'>SKILLS</h1>
            </div>
            <div className='center-split'>
                <div className="content">
                    <h4 className='pop-theme-color-text title-font-family'>Welcome to my Arsenal!</h4>
                    <div className='skill-description'>From crafting <span className='title-font-family'>sleek</span> user interfaces to optimizing performance, here are the skills I bring to every project.</div>
                    <div className='skills-wrapper'>
                        <Skill />
                    </div>
                    <div className='other-skills'>
                        <div className='other-skill-title title-font-family'>Other Skills</div>
                        {skillsObj.map((skill,i) => {
                            return <div key={i} className='other-skill'>
                                <div className='skill-icon'>
                                    <Image
                                        src={skill.icon}
                                        alt="Logo"
                                        style={{width: "40px",height:"40px"}}
                                    /></div>
                                    <div className='other-skill-sub-title title-font-family'>{skill.name}</div>
                            </div>
                        })}
                    </div>
                </div>

            </div>
            <div className='bottom-split title-font-family'>
                <h1 className='bottom-h'>SKILLS</h1>
            </div>
        </div>
    </>)
}

export default withNoSSR(Skills);