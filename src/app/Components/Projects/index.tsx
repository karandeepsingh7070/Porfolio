import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { projectLists } from './projects'
import "./style.scss"

const Projects = () => {
  let tabs = [{
    type: 'OTT',
    position: 0
  }, {
    type: 'Packages',
    position: 1
  }, {
    type: 'Others',
    position: 2
  }]
  const [selectedTab, setTab] = useState<number>(0)

  useEffect(() => {
    setTab(tabs[1].position)
  }, [])

  const handleActiveTab = (selectedTab: number) => {
    setTab(selectedTab)
  }

  return (<>
    <div className='proj-wrapper'>
      <div className='name-text title-font-family'>Projects</div>
      <div className='sub-heading-title title-font-family'>{`I've worked on`}</div>
      <div className='proj-content-wrapper'>
        <div className='tabs-container'>
      {tabs.map((tab, i) => {
            return <div key={i} onClick={() => handleActiveTab(tab.position)} className={selectedTab == tab.position ? 'tabs-list pop-theme-active-border' : 'tabs-list'}>{tab.type}</div>
          })}
          </div>
        <div className='proj-card-wrapper'>
          {projectLists[selectedTab]?.projects?.length ? projectLists[selectedTab].projects?.map((project: any, i: number) => {
            return <ProjectCard key={i} item={project} />
          }) : <h3 style={{margin: '20px'}}>Yet to update!</h3>}
        </div>
      </div>
    </div>
  </>)
}

export default Projects