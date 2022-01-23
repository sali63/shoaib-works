import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';

import ReactMarkdown from 'react-markdown';

export default function ProjectCard({
  fields: {
    projectName,
    desc,
    titleImage: {
      fields: {
        description,
        file: {
          details: {
            image: { height, width },
          },
          url,
        },
      },
    },
    siteUrl,
  },
  web,
  isOdd,
}) {
  return (
    <>
      <article
        className={`font-poppins overflow-hidden group  
        ${web && 'w-full shadow-none'}
        ${!web && 'max-h-[500px]'}
        `}
      >
        {web && (
          <div
            className={`md:flex md:justify-between w-11/12 md:w-full mx-auto ${
              isOdd && 'md:flex-row-reverse'
            }`}
          >
            <div className='mb-4 md:self-center md:m-0 md:w-1/2 md:px-4'>
              <Image
                src={'https:' + url}
                width={width}
                height={height}
                alt={description}
                className='md:group-hover:scale-105  duration-200 delay-150 transition-all'
              />
            </div>
            <div className={`${(isOdd && 'md:pr-6') || 'md:pl-6'} md:w-1/2`}>
              <div className='pt-5 h-full pb-6 md:py-5 border-b border-t border-primary-blue border-opacity-10'>
                <ReactMarkdown className=' md:min-h-[210px] text-primary-purple-dark prose prose-sm laptop-md:prose-lg text-opacity-80 '>
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
            </div>
          </div>
        )}

        {!web && (
          <div className='mx-auto relative'>
            <Image
              src={'https:' + url}
              width={width}
              height={height}
              alt={description}
              className='md:group-hover:scale-105 duration-200 delay-150 transition-all'
            />

            <div
              className='absolute z-20 flex flex-col justify-center items-center opacity-0 \
                          group-hover:opacity-100 transition-all \
                          duration-300 left-0 top-0 \ 
                        bg-primary-blue bg-opacity-30 w-full h-full'
            >
              {/* Preview Btn */}
              <Link href={`email_projects/${projectName}`}>
                <PrimaryButton
                  btnText='Preview'
                  className='capitalize my-3'
                  defaultHover={false}
                />
              </Link>
              {/* Preview Btn Ends */}

              {/* View in Browser Btn  */}
              <Link href={siteUrl} passHref>
                <PrimaryButton
                  btnText='view in browser'
                  additionalClasses='capitalize my-3'
                  defaultHover={false}
                  target='_blank'
                />
              </Link>
              {/* View in Browser Btn Ends */}
            </div>

            {/* Xs behind the button*/}

            <div
              className='absolute w-[2px] rotate-[24deg] transition-all duration-300 \
                            ease-in opacity-0 group-hover:opacity-100 left-1/2 -translate-x-1/2 \
                            z-10 top-0 bg-primary-purple-dark bg-opacity-25 h-full max-h-full'
            ></div>

            <div
              className='absolute w-[2px] rotate-[-24deg] transition-all duration-300 \
                            ease-in opacity-0 group-hover:opacity-100 left-1/2 -translate-x-1/2 \
                            z-10 top-0 bg-primary-purple-dark bg-opacity-25 h-full max-h-full'
            ></div>

            {/* Xs behind the button ends*/}
          </div>
        )}
      </article>
    </>
  );
}
