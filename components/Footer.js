import { useGlobalContext } from '../contexts/AppContext';
import { useHomepageContext } from '../contexts/HomepageContext';

export default function Footer() {
  const { siteName } = useGlobalContext();
  // UNDEFINED CUZ HOME PROVIDER DOESN'T WRAP AROUND FOOTER
  // const { aboutMeAbstract } = useHomepageContext();

  // const {
  //   context: {
  //     custom: { anchorText, pexelUrl },
  //   },
  // } = aboutMeAbstract[0];

  return (
    <footer className='bg-primary-blue text-xs p-5 h-80 grid grid-rows-6 gap-y-6 grid-flow-col-dense'>
      {/* add in footer or close to a resource of freepik */}

      {/* <a
        className='text-primary-purple text-opacity-50 block text-center row-start-5 col-span-4'
        href={pexelUrl}
        target='_blank'
      >
        <span className='tracking-tighter '>{anchorText}</span>
      </a> */}
      <div className='text-primary-purple text-opacity-80 self-end row-start-6 col-span-4 text-center'>
        &copy; Copyright {new Date().getFullYear()},<span>&nbsp;</span>
        <span className='capitalize'>{siteName}</span>
      </div>
    </footer>
  );
}
