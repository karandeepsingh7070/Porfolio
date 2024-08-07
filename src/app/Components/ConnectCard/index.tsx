import { connectSvg } from '@/assets/avatar'
import { InstagramIcon } from '@/assets/icons'
import React from 'react'
import Circle from "../AnimatedCircles/index"
import { socialList } from './socialItems'
import "./style.scss"

const ConnectCard = () => {
  return (<>
  <div className='connect-wrapper'>
    <div className='connect-card'>
        <div className='Prfile-img'>{connectSvg()}</div>
        <div className='connect-info'>
            <div className='connect-info'>
            <div className='Prfile-img-mb'>{connectSvg()}</div>
                <h3>I`m always up for a chat.</h3>
                <p><span><a href='mailto:Karandeepsinghworkspace@gmail.com'><b>Pop me an email</b></a></span> at @Karandeepsinghworkspace@gmail.com or give me a shout on social media.
                <div>
                {socialList?.map((social,i) => {
                return <a key={i} target='_blank' href={social.link}>{social.icon()}</a>
                })}
                </div>
                </p>
            </div>
            <div className='connect-circle'><Circle /></div>
        </div>
    </div>
  </div>
  </>)
}

export default ConnectCard