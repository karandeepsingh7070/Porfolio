'use client';

import React, { useEffect, useRef } from 'react';
import { smilingAvatar } from '../../../assets/avatar';
import gsap from 'gsap';
import Link from 'next/link';
import './style.scss';
import Circle from '../AnimatedCircles/index'
import { Fullscreen } from 'lucide-react';
import { FaGithub, FaLinkedin, FaMedium, FaDev } from "react-icons/fa";

const IntroPage = () => {
  const introRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const glowRef = useRef(null);
  const avatarWrapperRef = useRef(null);
   const resumeBtnRef = useRef(null);

   const socials = [
    {
      title : "Github",
      link:"https://github.com/karandeepsingh7070",
      icon: FaGithub
    },
    {
      title : "Linkedin",
      link:"https://www.linkedin.com/in/karandeepsingh-engineer/",
      icon: FaLinkedin
    },
    {
      title : "Medium",
      link:"https://medium.com/@karandeepsinghworkspace",
      icon: FaMedium
    },
    {
      title : "Dev.to",
      link:"https://dev.to/karandeepsingh7070",
      icon: FaDev
    },
   ]

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });
    tl.from(greetingRef.current, { y: 20, opacity: 0 })
      .from(nameRef.current, { y: 20, opacity: 0 }, '-=0.5')
      .from(roleRef.current, { y: 20, opacity: 0 }, '-=0.5')
      .from(resumeBtnRef.current, { y: 20, opacity: 0 }, '-=0.5'); // animate resume button

    // Pulse glow
    gsap.to(glowRef.current, {
      scale: 1.1,
      opacity: 0.4,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Float avatar
    gsap.to(avatarWrapperRef.current, {
      y: -10,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <>
    <Circle />
      <header className="header">
        <div className="header-content">
          <div className="header-name">Karandeep Singh</div>
          <div className='social-icons' style={{display: "flex", gap: "0.6rem"}}>
            {socials?.map((item, i) => {
              let Icon = item?.icon
              return <a key={i} href={item.link} style={{display:"flex", alignItems:"center"}} target="_blank" rel="noopener noreferrer">
                        <Icon fontSize={24} color={"#3b3b3b"} />
                    </a>
            })}

          </div>
        </div>
      </header>

      <div className="intro-container">
        <div className="intro-content" ref={introRef}>
          <div className="avatar-glow-wrapper" ref={avatarWrapperRef}>
            <div className="glow-bg" ref={glowRef}></div>
            <div className="avatar-inner">
              {smilingAvatar()}
            </div>
          </div>
          <p ref={greetingRef} className="intro-greeting">Hello, I`m</p>
          <h1 ref={nameRef} className="intro-name">Karandeep Singh</h1>
          <p ref={roleRef} className="intro-role">
            <span className="highlight">Software Engineer</span>, based in New Delhi, India currently in builder mode with half a decade of experience crafting complex applications with a diverse set of skills.
          </p>
         <Link href="/Karandeep%20Singh%20FE%20Resume.pdf" target="_blank" rel="noopener noreferrer">
          <button className="resume-cta" ref={resumeBtnRef}><Fullscreen color="#000" size={18} /> View Resume</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default IntroPage;
