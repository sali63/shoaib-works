import { useGlobalContext } from '../contexts/AppContext';
import ProjectCard from './ProjectCard';
import { sortByCreatedAt } from '../lib';

export default function EmailProjects() {
  let {
    homepage: {
      fields: { emailBlockTitle },
    },
    emailProject: emailProjects,
  } = useGlobalContext();

  emailProjects = sortByCreatedAt(emailProjects).slice(0, 3);
  return (
    <section className=' flex flex-col items-center p-8 bg-primary-purple'>
      <h1 className='capitalize text-4xl font-titillium-web font-bold text-primary-purple-light pb-8'>
        {emailBlockTitle}
      </h1>
      <div className='space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:w-full sm:justify-items-center'>
        {emailProjects.map((project) => {
          const {
            sys: { id },
          } = project;
          return <ProjectCard key={id} {...project} />;
        })}
      </div>
    </section>
  );
}
