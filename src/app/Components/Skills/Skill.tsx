import React from 'react'
import Image from "next/image";

import reactIcon from "../../../assets/react.png"
import nextIcon from "../../../assets/next.png"
import jsIcon from "../../../assets/js.png"
import tsIcon from "../../../assets/typescript.png"
import webpackIcon from "../../../assets/webpack.png"
import cssIcon from "../../../assets/css.png"
import sassIcon from "../../../assets/sass.png"
import htmlIcon from "../../../assets/html.png"
import reduxIcon from "../../../assets/redux.png"
import sagaIcon from "../../../assets/Frame.png"
import nodeIcon from "../../../assets/nodejs.png"
import uiIcon from "../../../assets/Ui.png"

const Skill = () => {
    let skillsObj = [
        {
            name : "React Js",
            icon: reactIcon
        },
        {
            name : "Next Js",
            icon: nextIcon
        },
        {
            name : "Javascript",
            icon: jsIcon
        },
        {
            name : "Typescript",
            icon: tsIcon
        },
        {
            name : "Webpack",
            icon: webpackIcon
        },
        {
            name : "Css",
            icon: cssIcon
        },
        {
            name : "Sass",
            icon: sassIcon
        },
        {
            name : "gap",
            icon: sassIcon
        },
        {
            name : "HTML",
            icon: htmlIcon
        },
        {
            name : "Redux",
            icon: reduxIcon
        },
        {
            name : "Redux-Saga",
            icon: sagaIcon
        },
        {
            name : "Node JS",
            icon: nodeIcon
        },
        {
            name : "UI Designing",
            icon: uiIcon
        },
    ]
  return (<>
  <div className='skill-wrapper title-font-family'>
  {skillsObj.map((skill: {
    name: string;
    icon: any;
}) => {
    if (skill.name == "gap") return <div></div>
    return <div className='skill-container'>
        <div className='skill-icon'>
            <Image
                        src={skill.icon}
                        alt="Logo"
                    /></div>
        <div className='skill-title title-font-family'>{skill.name}</div>
    </div>
  })}
  </div>
  </>)
}

export default Skill