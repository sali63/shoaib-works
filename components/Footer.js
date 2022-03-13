import { useGlobalContext } from '../contexts/AppContext';
import { LinkedIn, Github } from './SVG';
import linksUrl from '../links/links.json';

export default function Footer() {
  const {
    app: {
      fields: { siteName },
    },
    homepage: {
      fields: { aboutMeAbstract },
    },
  } = useGlobalContext();

  const {
    context: {
      custom: { anchorText, pexelUrl },
    },
  } = aboutMeAbstract[0];

  return (
    <footer className='bg-primary-blue text-xs p-5 h-80 grid grid-rows-6 gap-y-6 grid-flow-col-dense'>
      {/* add in footer or close to a resource of freepik */}

      <a
        className='hidden md:block text-primary-purple text-opacity-50 text-center row-start-5 col-start-3 col-span-4'
        href={pexelUrl}
        target='_blank'
      >
        <span className='tracking-tighter '>{anchorText}</span>
      </a>

      <div className='space-x-2 flex items-end row-start-5 col-start-2 md:row-start-6 md:col-start-6 col-span-2 justify-center'>
        <a href={linksUrl.linkedin} target='_blank'>
          <LinkedIn fill='#ffffff' />
        </a>
        <a href={linksUrl.github} target='_blank'>
          <Github fill='#ffffff' />
        </a>
      </div>

      <div className='text-primary-purple text-opacity-80 self-end row-start-6 md:col-start-3 col-span-4 text-center'>
        &copy; Copyright {new Date().getFullYear()},<span>&nbsp;</span>
        <span className='capitalize'>{siteName}</span>
      </div>
    </footer>
  );
}
