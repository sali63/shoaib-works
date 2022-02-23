import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import ReactMarkdown from 'react-markdown';

function WebCardDesc({ desc, projectName }) {
  return (
    <div className='pt-5 h-full pb-6 md:py-5 border-b border-t border-primary-blue border-opacity-10'>
      <ReactMarkdown className=' md:min-h-[210px] text-base text-primary-purple-dark text-opacity-80 '>
        {desc}
      </ReactMarkdown>
      {/* <button className='w-24 h-8 bg-primary-purple bg-opacity-50 hover:bg-primary-blue hover:text-primary-purple transition-all duration-300 capitalize text-primary-blue whitespace-nowrap'>
                view project
              </button> */}
      <Link href={`web_projects/${projectName}`} passHref>
        <PrimaryButton
          btnText='view project'
          // additionalClasses='w-44'
        />
      </Link>
    </div>
  );
}

export default WebCardDesc;
