import React, { useRef, useState } from 'react'
import {ILogo} from "../../Modals"
import Image from "next/image";
import "./style.scss"
import PageCover from '../PageCover/index';
import { pageCoverAnimation } from '@/app/Animation';

const StudioIcon:React.FC<ILogo> = ({src,arrow}) => {

  const studioIconRef = useRef(null)
  const [isExapanded,setIsExapanded] = useState(false)

  const handleAnimation = () => {
    if (isExapanded) {
    pageCoverAnimation(studioIconRef.current)
    setIsExapanded(false)
    return
    }

    pageCoverAnimation(studioIconRef.current)
    setIsExapanded(true)
  }

  return (<>
  <PageCover elementRef={studioIconRef}  />
  <div className='studio-icon-wrapper' onClick={handleAnimation}>
    <Image 
    src={src}
    alt="Logo"
    />
    <div className='highight-arrow'>
     <Image 
    src={arrow}
    alt="Logo"
    />
    <p>やだ！(ya da!)</p>
    </div>
  </div>
  </>)
}

export default StudioIcon