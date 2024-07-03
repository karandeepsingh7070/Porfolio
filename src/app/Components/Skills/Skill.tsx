import React, { useEffect, useState } from 'react'
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
import amazonAws from "../../../assets/amazon-aws.png"


const Skill = () => {

    const [mediaWidth,setMediaWidth] = useState(window.innerWidth)
    useEffect(() => {
        setMediaWidth(window.innerWidth)
    }, [])
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
        // {
        //     name : "gap",
        //     icon: sassIcon
        // },
        {
            name : "HTML",
            icon: htmlIcon
        },
        {
            name : "Redux",
            icon: reduxIcon
        },
        {
            name : "AWS",
            icon: amazonAws
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
},i) => {
    if (skill.name == "gap" && mediaWidth > 900) return <div></div>
    if (skill.name == "gap" && mediaWidth < 900) return 
    return <div key={i} className='skill-container'>
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