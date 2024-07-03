import React from 'react'
import { expirienceList, highlights } from './experience'
import "./style.scss"

const Experience = () => {
  return (<>
    <div className='exp-wrapper'>
      <div className='name-text title-font-family'>Experience</div>
      <div className='exp-content-wrapper'>
        <div className='exp-highlights'>
          <div className='sub-heading-title'>Highlights</div>
          <div className='highlights'>
            <ul>
              {highlights?.map((highlight) => {
                return <li>{highlight.text}
                <div>
                {highlight?.article ? <a target="_blank" href={`${highlight.article}`}>Article</a> : <></>}
                {highlight?.article ?` - ` :<></>}
                 {highlight?.code ? <a target="_blank" href={`${highlight.code}`}>Code</a> : <></>}
                 </div>
                </li>
              })}
            </ul>
          </div>
        </div>
        <div className='exp-progress'>
          {expirienceList?.map((exp) => {
            return <div className='exp-comp'>
              <div className='exp-date'>{exp.dateOfJoining}</div>
              <div className='exp-circle'></div>
              <div className='exp-comp-content'>
                <div className='exp-comp-designation title-font-family'>{exp.title}</div>
                <div className='exp-comp-name'>{exp.organisation}</div>
                <div className='exp-comp-text'>{exp.gistList?.map((desc) => {
                  return <div>{desc}</div>
                })}</div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  </>)
}

export default Experience