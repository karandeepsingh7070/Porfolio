import React from 'react'
import ProjectCard from './ProjectCard'
import "./style.scss"

const Projects = () => {
  return (<>
    <div className='proj-wrapper'>
  <div className='name-text title-font-family'>Projects</div>
        <div className='sub-heading-title title-font-family'>I've worked on</div>
  <div className='proj-content-wrapper'>
    <div className='proj-card-wrapper'>
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    </div>
  </div>
    </div>
  </>)
}

export default Projects