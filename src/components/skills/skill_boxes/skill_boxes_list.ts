import SkillBoxProps from "./skill_box_props";
import { LuMonitor } from 'react-icons/lu'
import { VscTools } from 'react-icons/vsc'
import { GrReactjs } from 'react-icons/gr'
import { TbBrandFlutter } from 'react-icons/tb'
import { BsDatabase } from 'react-icons/bs'
import { HiOutlineServer } from 'react-icons/hi'



const skillBoxesList: SkillBoxProps[] = [
    {
        title: 'Software Dev',
        markerColor: 'bg-pink-400',
        icons: [LuMonitor, VscTools],
        sections: [
            {
                tagId: 'Languages',
                content: [
                    'Experienced in both functional and OOP in: Dart, Python, JavaScript, and TypeScript.'
                ]
            },
            {
                tagId: 'Methodologies',
                content: ['Utilize CI/CD and TDD in my development.']
            },
            {
                tagId: 'Tools',
                content: ['Git, Github, VS Code, Vim, Docker.']
            }
        ],
    },
    {
        title: 'Frontend Dev',
        markerColor: 'bg-blue-400',
        icons: [GrReactjs, TbBrandFlutter],
        sections: [
            {
                tagId: 'React',
                content: [
                    'With more than 2 years of development experience in: HTML, CSS, JS, React and NextJS frameworks.',
                    '',
                    'Technologies: NodeJs, React Hooks, Redux, Tailwind, Sass, JestJs.'
                ]
            },
            {
                tagId: 'Flutter',
                content: [
                    'Bringing over 2 years of development experience in Flutter framework to develop mobile apps and cross-platform solutions.',
                    '',
                    'Technologies: Riverpod, Dio, SQLite.'
                ]
            }
        ],
    },
    {
        title: 'Backend Dev',
        markerColor: 'bg-orange-400',
        icons: [BsDatabase, HiOutlineServer],
        sections: [
            {
                tagId: 'Know-how',
                content: [
                    'Hands-on experience with Firebase, including authentication, real-time database integration, cloud functions, and other related features.'
                ]
            },
            {
                tagId: 'Knowledge',
                content: [
                    '• Networking concepts: HTTP, Sockets, OSI model.',
                    '• Cryptography and security fundamentals.',
                    '• RESTful API design principles.'
                ]
            },
            {
                tagId: 'Tools2',
                content: [
                    'Well-versed in OAuth, SQL, GraphQL, Express.js, Firebase.'
                ]
            }
        ],
    }
];


export default skillBoxesList;