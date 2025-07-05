'use client';

import React, { useEffect, useRef } from 'react';
import "./style.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import withNoSSR from '@/app/withNoSSR';
import Skill from './Skill';
import { skillAnimation } from '@/app/Animation';

const Skills = () => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionRef = useRef<any>(null);

    useEffect(() => {
        skillAnimation()
        setTimeout(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll('.skill-card'),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );
        },1000)
    }, []);

    return (
        <div className='skill-wrapper'>
            <div className='top-split title-font-family'>
                <h1 className='top-h'>SKILLS</h1>
            </div>
            <div className='center-split'>
                <section className="skills-section" ref={sectionRef}>
                        {/* <h2 className="skills-title title-font-family">Skills</h2> */}
                        <p className="skills-subtitle pop-theme-color-text">Welcome to my Arsenal!</p>
                        <p className="skills-description">
                            From crafting <span className='title-font-family'>sleek</span> user interfaces to optimizing performance, here are the Tools I`ve worked with.
                        </p>

                        <div className="skills-grid">
                            <Skill />
                        </div>
                </section>
            </div>
            <div className='bottom-split title-font-family'>
                <h1 className='bottom-h'>SKILLS</h1>
            </div>
        </div>
    );
};

export default withNoSSR(Skills);
