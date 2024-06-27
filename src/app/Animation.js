import { TweenMax, Power3 } from "gsap"
import gsap from "gsap"
import { Power4 } from "gsap"

const scrollProject = (element) => {
    var tl = gsap.timeline({scrollTrigger:{
        trigger:".project-card-wrapper",
       //  markers:true,
        start:"50% 50%",
        end:"150% 50%",
        scrub:2,
        pin:true
    }});
    tl.to(element,
        1, {
            opacity: 0.5,
            y: -20,
            ease : Power4.out
        })
}
const skillAnimation = () => {
    var tl = gsap.timeline({scrollTrigger:{
        trigger:".skill-wrapper",
       //  markers:true,
        start:"50% 50%",
        end:"150% 50%",
        scrub:2,
        pin:true
    }});
    tl
    .to(".center-split",{
       height: "100vh",
    },'a')
    .to(".top-split",{
        top: "-50%",
     },'a')
     .to(".bottom-split",{
        bottom: "-50%",
     },'a')
    .to(".top-h",{
        top: "140%"
     },'a')
     .to(".bottom-h",{
        top: "-40%"
     },'a')
    .to("#center-h1",{
       top: "-30%"
    },'a')
    .to(".content",{
       delay: -0.2,
       marginTop: "0%"
    })
}

const appVisibility = (element) => {
    gsap.to(
        element,
        0, {
            delay: 1,
            css : {visibility : "visible"}
        }
    )
}
const circleAnimation = (element) => {
    TweenMax.from(
        element,
        1, {
            delay: 0.3,
            opacity: 0,
            x: -40,
            ease : Power3.easeOut,
        }
    )
}
const circleAnimation2 = (element) => {
    TweenMax.from(
        element,
        1, {
            delay: 0.5,
            opacity: 0.2,
            x: 100,
            y: -250,
            ease : Power3.easeOut,
        }
    )
}
const expandToggleAnimation = (element) => {
    TweenMax.to(
        element,
        0.5, {
            ease : Power3.easeOut,
            scale : 1.5
        }
    )
}
const expandToggleAnimation2 = (element) => {
    TweenMax.to(
        element,
        0.5, {
            ease : Power3.easeOut,
            scale : 1,
        }
    )
}
const preLoaderAnimation = (element) => {
    TweenMax.to(
        element,
        1, {
            ease : Power3.easeOut,
            left : '0',
            overflow : 'hidden'
        }
    )
    TweenMax.to(
        element,
        1, {
            delay : 3,
            ease : Power3.easeOut,
            left : '100%',
            overflow : 'unset'
        }
    )
}
const pageCoverAnimation = (element) => {
    TweenMax.to(
        element,
        1, {
            ease : Power3.easeOut,
            left : '0'
        }
    )
    TweenMax.to(
        element,
        1, {
            delay : 2,
            ease : Power3.easeOut,
            left : '100%',
            display : 'none'
        }
    )
}
const fadeInAnimation = (element,delay) => {
    gsap.to(element,
        1, {
            delay : delay || 0,
            opacity: 1,
            y: -40,
            ease : Power4.out,
            stagger : {
                amount : 0.3
            }
        })
}
const fadeOutAnimation = (element) => {
    gsap.to(element,
        1, {
            opacity: 0,
            y: -20,
            ease : Power4.out
        })
}
const handleAboutSectionAnimation =(isFadeIn) => {
    if (isFadeIn) {
        fadeInAnimation('.abt-name-txt')
        fadeInAnimation('.about-description',0.3)
        fadeInAnimation('.resume-btn',0.5)
    }else {
        fadeOutAnimation('.abt-name-txt')
        fadeOutAnimation('.about-description')
        fadeOutAnimation('.resume-btn')
    }
}


export {circleAnimation, appVisibility, circleAnimation2,expandToggleAnimation,expandToggleAnimation2,pageCoverAnimation,fadeInAnimation,fadeOutAnimation,handleAboutSectionAnimation,skillAnimation,preLoaderAnimation,scrollProject}