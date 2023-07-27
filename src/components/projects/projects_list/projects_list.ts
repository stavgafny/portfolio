import { ProjectProps } from './Project'
import image_turing from '../../../../public/assets/projects/turing.png';
import image_plot_io from '../../../../public/assets/projects/plot.io.png';
import image_lifeline from '../../../../public/assets/projects/lifeline.png';


const projectsList: ProjectProps[] = [
    {
        name: 'Lifeline',
        tags: ['app'],
        image: image_lifeline,
        description: `Lifeline: built with Flutter for Android and iOS, is a versatile Personal Data Manager. Track goals, manage events, and create dynamic timelines with ease. Capture life's moments with images and notes, utilizing version control-like features.`
    },
    {
        name: 'Plot.io',
        tags: ['web', 'game'],
        image: image_plot_io,
        description: `Plot.io: A thrilling web-based multiplayer 2D canvas game using p5.js, where survival and shooting skills collide. Engage in real-time battles against friends and players worldwide, testing your strategic instincts in this captivating world of fast-paced action.`
    },
    {
        name: 'Turing',
        tags: ['web', 'game'],
        image: image_turing,
        description: `Turing: A captivating web-based simulator game powered by p5.js, where creativity intertwines with logic. Design intricate Turing machines using queues, transitions, and a tape. Observe as they interact with the memory, unfolding mesmerizing transformations in real-time.`
    },
];

export default projectsList;