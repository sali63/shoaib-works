import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { useGlobalContext } from '../../contexts/AppContext';
// import MarkdownToHtml from './../MarkdownToHtml';
import Image from 'next/image';

export default function AboutMe() {
  const {
    homepage: {
      fields: {
        aboutMeDesc: desc,
        aboutMeTitle: title,
        // aboutMeDescMarkdown,
        aboutMeAbstract,
      },
    },
  } = useGlobalContext();

  return (
    <section className='p-8 bg-primary-purple-light md:pt-14 md:grid md:grid-cols-5 md:justify-items-center md:gap-x-3'>
      <article className='md:pl-4  col-start-1 col-end-4'>
        <h2 className='text-4xl font-titillium-web font-bold text-primary-purple-dark '>
          {title}
        </h2>
        <div className='py-6 space-y-3 text-primary-purple-dark text-opacity-80 '>
          {documentToReactComponents(desc)}
        </div>
      </article>

      <article className='hidden md:block col-start-4 col-end-6'>
        <div className='w-40 block'>
          <Image
            src={aboutMeAbstract[0].original_secure_url}
            width={aboutMeAbstract[0].width}
            height={aboutMeAbstract[0].height}
            className='mix-blend-color-burn'
            layout='responsive'
            sizes='50vw'
          />
        </div>
      </article>
    </section>
  );
}
