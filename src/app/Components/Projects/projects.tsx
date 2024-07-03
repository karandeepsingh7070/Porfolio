import Monumental from "../../../assets/monumental.png"
import myOutdoor from "../../../assets/myoutdoor.png"
import livgolf from "../../../assets/livgolf.png"
import hoichoi from "../../../assets/hoichoi.png"
import npm from "../../../assets/npm.png"
export const projectLists = [
    {
        type : 'OTT',
        projects : [{
            name : 'Monumental Sports Network',
            organisation :'Viewlift',
            thumbnail: Monumental,
            tech : ['React Js','Js/Ts','SSR','Css/Sass','Viddeo Js','SSE']
        },
        {
            name : 'My Outdoor Tv',
            organisation :'Viewlift',
            thumbnail: myOutdoor,
            tech : ['React Js','Js','Css/Sass','Viddeo Js','Websocket']
        },
        {
            name : 'LivGolf+',
            organisation :'Viewlift',
            thumbnail: livgolf,
            tech : ['React Js','Js','Css/Sass','Viddeo Js','Websocket']
        },
        {
            name : 'Hoichoi',
            organisation :'Viewlift',
            thumbnail: hoichoi,
            tech : ['React Js','Js','Css/Sass','Viddeo Js','Websocket']
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