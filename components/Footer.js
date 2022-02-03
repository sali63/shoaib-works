import { useGlobalContext } from '../contexts/AppContext';

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
        className='hidden md:block text-primary-purple text-opacity-50 text-center row-start-5 col-span-4'
        href={pexelUrl}
        target='_blank'
      >
        <span className='tracking-tighter '>{anchorText}</span>
      </a>
      <div className='text-primary-purple text-opacity-80 self-end row-start-6 col-span-4 text-center'>
        &copy; Copyright {new Date().getFullYear()},<span>&nbsp;</span>
        <span className='capitalize'>{siteName}</span>
      </div>
    </footer>
  );
}
