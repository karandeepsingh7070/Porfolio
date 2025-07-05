import npm from "../../../assets/npm.png"
import overwatchBanner from "../../../assets/overwatch.png"; 
import overwatchDocs from "../../../assets/overwatch-docs.png"; 
export const projectLists = [
    {
        type : 'OTT',
        projects : [
            {
            name : 'Monumental Sports Network',
            organisation :'Viewlift',
            description: "Developed and maintained key features for a high-traffic sports streaming platform, improving user engagement and content delivery.",
            disclaimer : "Worked on this under Employement with Viewlift",
            tech : ["React JS", "Typescript", "Css/Scss", "Pub-Sub", "GraphQL"],
            visitUrl : "https://www.monumentalsportsnetwork.com/"
        },
        {
            name : 'LivGolf+',
            organisation :'Viewlift',
            tech : ['React Js','Javascript','Typescript','Css/Sass','Video Js','Stripe','GraphQL APIs'],
            visitUrl :"https://livgolfplus.com/"
        },
        {
            name : 'Hoichoi',
            organisation :'Viewlift',
            tech : ['React Js','Js','Css/Sass','Video Js','Websocket'],
        },
        {
            name : 'My Outdoor Tv',
            organisation :'Viewlift',
            tech : ['React Js','Js','Css/Sass','Video Js','Websocket'],
            visitUrl : "https://app.myoutdoortv.com/"
        },
    ]
    },
    {
        type : 'Packages',
        projects : [{
            name : 'Pub-Sub - Efficient Data Sharing',
            thumbnail: npm,
            tech : ['Publish Subscribe Architecture','Javascript'],
            code :'https://github.com/karandeepsingh7070/Pubsub-architecture',
            article:'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9'
        },
        {
            name : 'Monetisation SDK - Stripe',
            thumbnail: npm,
            tech : ['Stripe','Typescript','Javascript','React','Avalara'],
        },
        {
            name : 'Overwatch Ts',
            thumbnail: npm,
            tech : ['Typescript','Next Js'],
            code : 'https://github.com/WisdomBits/overwatch',
            visitUrl : "https://www.npmjs.com/package/overwatch-ts",
        },
    ]
    },
    {
        type : "Tools",
        projects: [
            {
            name : 'CkEditor - custom Plugins',
            tech : ['CkEditor5','Webpack','Websocket','Javascript'],
            code :'https://github.com/karandeepsingh7070/CKEditor-custom-plugin-super-build',
        },
        {
            name : 'Stash Share - VS Code Extention',
            vsCode: true,
            tech : ['CkEditor5','Webpack','Websocket','Javascript'],
            code :'https://github.com/karandeepsingh7070/share-stash-VS-code-extention',
        },
        ]
    }
]

export const featuredLists =  {
        type : "Featured",
        projects : [{
            name : 'Overwatch TS',
            description: "A minimal, high-performance React state management library leveraging TypeScript with a delightful developer experience, immutability, batching, and devtools, designed to scale cleanly with your apps.",
            thumbnail: overwatchBanner,
            visitUrl : "https://overwatchts.in/",
            tech : ['Publish Subscribe Architecture','Typescript'],
            code :'https://github.com/WisdomBits/overwatch',
            article:'https://medium.com/@karandeepsinghworkspace/efficient-data-sharing-in-react-a-deep-dive-into-pub-sub-architecture-3af5362bd8c9',
            Blog : "https://overwatchts.in/blog",
            Docs : "https://docs.overwatchts.in/docs"
        },
        {
            name : 'Overwatch Docs',
            description: "A Structured Documention,for high-performance React state management library for better developer experience with there apps.",
            thumbnail: overwatchDocs,
            visitUrl : "https://docs.overwatchts.in/docs",
            tech : ['Nextra','Next Js', 'Typescript'],
            code :'https://github.com/WisdomBits/overwatch-docs'
        }
    ]
    }