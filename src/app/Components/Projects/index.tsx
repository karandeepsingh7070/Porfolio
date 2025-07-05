'use client';

import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { featuredLists, projectLists } from './projects';
import "./style.scss";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeaturedProjectCard from './FeaturedProjectCard';

const Projects = () => {
    const tabs = [
        { type: 'Employment', position: 0 },
        { type: 'NPM Packages', position: 1 },
        { type: 'Tools', position: 2 },
        {type: 'Featured', position: 3}
    ];
    const [selectedTab, setTab] = useState<number>(3);
    const sectionRef = useRef<HTMLElement | any>(null);

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        gsap.fromTo(sectionRef.current.querySelectorAll('.project-card'),
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
    }, [selectedTab]);

    const handleActiveTab = (selectedTab: number) => {
        setTab(selectedTab);
    };

    return (
        <section className='projects-section' ref={sectionRef}>
            <h2 className='projects-title title-font-family'>Projects</h2>
            <p className='projects-subtitle title-font-family'>I`ve worked on</p>
            <div className='tabs-container'>
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => handleActiveTab(tab.position)}
                        className={`tab-button ${selectedTab === tab.position ? 'active' : ''}`}
                    >
                        {tab.type}
                    </button>
                ))}
            </div>

            <div className={!selectedTab ? 'r-c proj-card-wrapper' : 'proj-card-wrapper'}>
                {projectLists[selectedTab]?.projects?.length
                    ? projectLists[selectedTab].projects.map((project, i) => (
                        <ProjectCard key={i} item={project} />
                    ))
                    : selectedTab == 3 ? featuredLists?.projects?.map((project,i) => {
                        return <FeaturedProjectCard key={i} item={project} />
                    }) :
                    <h3 className='empty-text'>Yet to update!</h3>
                }
            </div>
        </section>
    );
};

export default Projects;
