import React, { useEffect } from 'react'
import Monumental from "../../../assets/monumental.png"
import { scrollProject } from '@/app/Animation';
import Image from '../../../../node_modules/next/image';
const ProjectCard = () => {

    // useEffect(() => {
    //     scrollProject()
    // },[])
    return (<>
        <div className='project-card-wrapper theme-box-shadow'>
            <div className='proj-img'>
                <Image
                    src={Monumental}
                    alt="Logo"
                />
            </div>
            <div className='proj-details'>
                <div className='proj-title'>Monumental Sports Network</div>
                <div className='proj-comp-name'>Viewlift</div>
                <div className='proj-skills'>
                    <div className='skill'>React Js</div>
                    <div className='skill'>Typescript</div>
                    <div className='skill'>Css/Sass</div>
                    <div className='skill'>Pub-Sub</div>
                    <div className='skill'>GraphQL</div>
                </div>
                <div className='know-more'>Know More</div>
            </div>
        </div>
    </>)
}

export default ProjectCard