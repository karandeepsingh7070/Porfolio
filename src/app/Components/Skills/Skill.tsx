'use client';

import React from 'react';
import Image from "next/image";

import reactIcon from "../../../assets/react.png";
import nextIcon from "../../../assets/next.png";
import jsIcon from "../../../assets/js.png";
import tsIcon from "../../../assets/typescript.png";
import webpackIcon from "../../../assets/webpack.png";
import cssIcon from "../../../assets/css.png";
import sassIcon from "../../../assets/sass.png";
import htmlIcon from "../../../assets/html.png";
import reduxIcon from "../../../assets/redux.png";
import sagaIcon from "../../../assets/Frame.png";
import nodeIcon from "../../../assets/nodejs.png";
import uiIcon from "../../../assets/Ui.png";
import amazonAws from "../../../assets/amazon-aws.png";

const skillsObj = [
    { name: "React JS", icon: reactIcon },
    { name: "Next JS", icon: nextIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "TypeScript", icon: tsIcon },
    { name: "Webpack", icon: webpackIcon },
    { name: "CSS", icon: cssIcon },
    { name: "Sass", icon: sassIcon },
    { name: "HTML", icon: htmlIcon },
    { name: "Redux", icon: reduxIcon },
    { name: "AWS", icon: amazonAws },
    { name: "Saga", icon: sagaIcon },
    { name: "Node JS", icon: nodeIcon },
    { name: "UI", icon: uiIcon },
];

const Skill = () => {
    return (
        <>
            {skillsObj.map((skill, i) => (
                <div key={i} className="skill-card">
                    <div className="icon-ring">
                        <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={40}
                            height={40}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <p className="skill-name">{skill.name}</p>
                </div>
            ))}
        </>
    );
};

export default Skill;
