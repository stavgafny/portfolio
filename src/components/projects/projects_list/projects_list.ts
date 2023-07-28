import ProjectProps, { projectTools } from './project_props';
import image_turing from '../../../../public/assets/projects/turing.png';
import image_plot_io from '../../../../public/assets/projects/plot.io.png';
import image_lifeline from '../../../../public/assets/projects/lifeline.png';


const projectsList: ProjectProps[] = [
    {
        name: 'Lifeline',
        tags: ['app'],
        image: image_lifeline,
        description: `Personal app for Android and iOS. Effortlessly track goals, manage events, and create dynamic timelines with images and notes, featuring  version control-like features.`,
        links: { code: 'https://github.com/stavgafny/lifeline', deployed: null },
        tools: [projectTools.flutter, projectTools.firebase]
    },
    {
        name: 'Plot.io',
        tags: ['web', 'game'],
        image: image_plot_io,
        description: `Web-based multiplayer 2D canvas game with real-time battles against friends and players worldwide. Test your survival and shooting skills in fast-paced action.`,
        links: { code: 'https://github.com/stavgafny/plot.io', deployed: null },
        tools: [projectTools.node, projectTools.express, projectTools.socket, projectTools.p5]
    },
    {
        name: 'Turing',
        tags: ['web'],
        image: image_turing,
        description: `Engaging web-based simulator where creativity meets logic. Design intricate Turing machines using queues, transitions, and a tape. Witness mesmerizing real-time interactions and transformations.`,
        links: { code: 'https://github.com/stavgafny/turing', deployed: 'https://stavgafny.github.io/turing' },
        tools: [projectTools.p5]
    },
];

export default projectsList;