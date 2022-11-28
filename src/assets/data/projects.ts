import excel from '../images/excel.png';
import tp1 from '../images/tp1.jpg';
import photo from '../images/photo.png';
import video from '../images/video.webm';

export const webProjects = [
  {
    name: 'Excel Filters',
    description:
      'Build with React, Redux, TypeScript, Firebase, Tailwind and Vite.',
    imageSrc: excel,
    imageAlt: 'First project image.',
    href: 'https://gabrielruizvarela.github.io/Excel-Filters/',
  },
  {
    name: 'A Photo Tagging App',
    description: 'Build with React, TypeScript, Tailwind.',
    imageSrc: photo,
    imageAlt: 'Second project image.',
    href: 'https://gabrielruizvarela.github.io/A-Photo-Tagging-App/',
  },
];

export const engineeringProjects = [
  {
    name: 'Biomechanical sound source polar pattern measurement',
    description:
      'This document describes a method to measure the directivity of a biomechanical source.',
    imageSrc: tp1,
    imageAlt: 'First Engineering project image.',
    href: 'https://drive.google.com/file/d/1rOASwHCp-RMIGml1D_QBY2APR5RGlX6Q/view?usp=sharing',
  },
  {
    name: 'Systematic study of the isotropy evolution in a decaying sound field inside reverberant room',
    description:
      'This document describes a study of the isotropy evolution in a decaying sound field inside a reverberant room.',
    imageSrc: video,
    video: true,
    imageAlt: 'Second Engineering project image.',
    href: 'https://drive.google.com/file/d/12xD_orI_FXxF6glyaHA1aQex5ILdyOxO/view?usp=sharing',
  },
];
