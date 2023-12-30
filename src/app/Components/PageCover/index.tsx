import React from 'react'
import "./style.scss"
import {preloaderSvg} from "../../../assets/icons"

const PageCover = ({elementRef}) => {
  return (<>
    <div className='page-cover' ref={elementRef}> 
    {preloaderSvg()}
    </div>
    </>)
}

export default PageCover