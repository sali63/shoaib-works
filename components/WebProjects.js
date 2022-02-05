import { useGlobalContext } from '../contexts/AppContext';
import ProjectCard from './ProjectCard';
import { sortByCreatedAt } from '../lib';

export default function WebProjects() {
  let {
    homepage: {
      fields: { webBlockTitle },
    },
    webProject: webProjects,
  } = useGlobalContext();

  webProjects = sortByCreatedAt(webProjects).slice(0, 3);
  return (
    <section className='p-8 pb-14 bg-primary-purple-light'>
      <h1 className='capitalize text-4xl text-center font-titillium-web font-bold text-primary-purple-dark pb-8'>
        {webBlockTitle}
      </h1>
      <div className='space-y-20'>
        {webProjects.map((project, index) => {
          const isOdd = index % 2 !== 0;
          const {
            sys: { id },
          } = project;
          return <ProjectCard key={id} {...project} web isOdd={isOdd} />;
        })}
      </div>
    </section>
  );
}
