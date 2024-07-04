import React from 'react'
import Monumental from "../../../assets/monumental.png"
// import { scrollProject } from '@/app/Animation';
import Image from '../../../../node_modules/next/image';

interface Project {
    item: {
        thumbnail: string,
        name?:string,
        organisation?: string,
        tech?: string[]
        code?: string,
        article?: string,
        visitUrl? :string
    }
}
const ProjectCard = ({item}:Project) => {
    
    return (<>
        <div className='project-card-wrapper theme-box-shadow'>
            <div className='proj-img'>
                <Image
                    src={item?.thumbnail}
                    alt="Logo"
                    style={item.code ? {width : '50px'} : {}}
                />
            </div>
            <div className='proj-details'>
                <div className='proj-title'>{item?.name}</div>
                <div className='proj-comp-name'>{item?.organisation}</div>
                <div className='proj-skills'>
                    {item?.tech?.map((skill:string,i) => {
                    return <div key={i} className='skill'>{skill}</div>
                    })}
                </div>
                {item?.code ? <div className='proj-code'>
                    <a target="_blank" href={`${item.code}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="github"><path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path></svg></a>
                    <br></br>
                    <a target="_blank" href={`${item.article}`}><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 512 512" id="medium"><defs><linearGradient id="a" x1="67.83" x2="474.19" y1="82.42" y2="389.98" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1e1b1e"></stop><stop offset="1" stop-color="#474747"></stop></linearGradient></defs><path fill="url(#a)" d="M256 0c141.39,0 256,114.61 256,256 0,141.39 -114.61,256 -256,256 -141.39,0 -256,-114.61 -256,-256 0,-141.39 114.61,-256 256,-256z"></path><path fill="#fff" d="M180.8 159.38c53.36,0 96.62,43.26 96.62,96.62 0,53.36 -43.26,96.62 -96.62,96.62 -53.35,0 -96.61,-43.26 -96.61,-96.62 0,-53.36 43.26,-96.62 96.61,-96.62zm229.98 15.26c9.41,0 17.03,36.43 17.03,81.36 0,44.93 -7.62,81.36 -17.03,81.36 -9.4,0 -17.03,-36.43 -17.03,-81.36 0,-44.93 7.63,-81.36 17.03,-81.36zm-75.38 -7.63c27,0 48.88,39.84 48.88,88.99 0,49.15 -21.88,88.99 -48.88,88.99 -27,0 -48.89,-39.84 -48.89,-88.99 0,-49.15 21.89,-88.99 48.89,-88.99z"></path></svg></a>
                </div>: <></>}
                {item?.visitUrl ? <div className='know-more'><a target={'_blank'} href={item.visitUrl}>Live Link</a></div> :<></>}
            </div>
        </div>
    </>)
}

export default ProjectCard