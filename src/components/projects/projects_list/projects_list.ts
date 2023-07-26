import { ProjectProps } from './Project'
import image_turing from '../../../../public/assets/projects/turing.png';
import image_plot_io from '../../../../public/assets/projects/plot.io.png';
import image_lifeline from '../../../../public/assets/projects/lifeline.png';


const projectsList: ProjectProps[] = [
    { name: 'Turing', tags: ['web'], image: image_turing },
    { name: 'Plot.io', tags: ['web', 'game'], image: image_plot_io },
    { name: 'Lifeline', tags: ['app'], image: image_lifeline },
    { name: 'Turing2', tags: ['web'], image: image_turing },
    { name: 'Lifeline3', tags: ['app'], image: image_lifeline },
    { name: 'Turing24', tags: ['web'], image: image_turing },
];

export default projectsList;