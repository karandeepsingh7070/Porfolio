'use client';

import React from 'react';
import { FaReact, FaAws, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiRollupdotjs } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiCss3, SiSass, SiRedux, SiSocketdotio, SiWebpack } from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { SiShadcnui } from "react-icons/si";
import { MdAnimation } from "react-icons/md";
import { GrGraphQl } from "react-icons/gr";


const skillsObj = [
    { name: "React JS", icon: FaReact },
    { name: "Next JS", icon: SiNextdotjs },
    { name: "JavaScript", icon: RiJavascriptFill },
    { name: "TypeScript", icon: BiLogoTypescript },
    { name: "Webpack", icon: SiWebpack },
    { name: "CSS", icon: SiCss3 },
    { name: "Sass", icon: SiSass },
    { name: "Roll Up", icon: SiRollupdotjs },
    { name: "Redux", icon: SiRedux },
    { name: "AWS", icon: FaAws },
    { name: "Shadcn", icon: SiShadcnui },
    { name: "Golang", icon: FaGolang },
    { name: "Node JS", icon: FaNodeJs },
    { name: "GraphQL", icon: GrGraphQl },
    { name: "GSAP", icon: MdAnimation },
    { name: "Web Socket", icon: SiSocketdotio },
];

const Skill = () => {
    return (
        <>
            {skillsObj.map((skill, i) => {
                let Icon = skill.icon
                return <div key={i} className="skill-card">
                    <div className="icon-ring">
                        <Icon fontSize={32} />
                    </div>
                    <p className="skill-name">{skill.name}</p>
                </div>
})}
        </>
    );
};

export default Skill;
