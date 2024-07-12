import Monumental from "../../../assets/monumental.png"
import myOutdoor from "../../../assets/myoutdoor.png"
import livgolf from "../../../assets/livgolf.png"
import hoichoi from "../../../assets/hoichoi.png"
import npm from "../../../assets/npm.png"
export const projectLists = [
    {
        type : 'OTT',
        projects : [
        //     {
        //     name : 'Monumental Sports Network',
        //     organisation :'Viewlift',
        //     thumbnail: Monumental,
        //     tech : ['React Js','Javascript','Typescript','Server Side Rendering (SSR)','Css/Sass','Video Js','SSE','Publish-Subscribe architecture',],
        //     visitUrl : "https://www.monumentalsportsnetwork.com/"
        // },
        // {
        //     name : 'LivGolf+',
        //     organisation :'Viewlift',
        //     thumbnail: livgolf,
        //     tech : ['React Js','Javascript','Typescript','Css/Sass','Video Js','Stripe','GraphQL APIs'],
        //     visitUrl :"https://livgolfplus.com/"
        // },
        {
            name : 'Hoichoi',
            organisation :'Viewlift',
            thumbnail: hoichoi,
            tech : ['React Js','Js','Css/Sass','Video Js','Websocket'],
            visitUrl : null
        },
        {
            name : 'My Outdoor Tv',
            organisation :'Viewlift',
            thumbnail: myOutdoor,
            tech : ['React Js','Js','Css/Sass','Video Js','Websocket'],
            visitUrl : "https://app.myoutdoortv.com/"
        },
    ]
    },
    {
        type : 'Packages',
        projects : [{
            name : 'Pub-Sub - Efficient Data Sharing',
            organisation :'Viewlift',
            thumbnail: npm,
            tech : ['Publish Subscripbe Architecture','Js'],
            code :'https://github.com/karandeepsingh7070/Pubsub-architecture',
            article:'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9'
        },
        {
            name : 'Monetisation - Stripe',
            organisation :'Viewlift',
            thumbnail: npm,
            tech : ['Stripe','Ts','Js','React','Avalara'],
            code :'-',
            article:''
        },
        {
            name : 'CkEditor - custom Plugins',
            organisation :'Viewlift',
            thumbnail: npm,
            tech : ['CkEditor5','Webpack','Websocket','Js'],
            code :'-',
            article:''
        },
    ]
    },
]