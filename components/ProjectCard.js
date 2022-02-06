import React from 'react';
import Image from 'next/image';

import EmailCardModal from './EmailCardModal';
import EmailModalAccentMark from './EmailModalAccentMark';
import WebCardDesc from './WebCardDesc';

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
  const [isModal, setIsModal] = React.useState(false);

  const openModal = () => {
    setTimeout(() => {
      setIsModal(true);
    }, 100);
  };

  return (
    <>
      <article
        className={`font-poppins overflow-hidden group \
        
        ${web && 'w-full shadow-none'}
        ${!web && 'max-h-[500px] mt-10 '}
        `}
        onMouseEnter={() => openModal()}
        onMouseLeave={() => setIsModal(false)}
      >
        {/* WEB */}
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
              {/* <Description /> */}
              <WebCardDesc projectName={projectName} desc={desc} />
            </div>
          </div>
        )}
        {/* WEB ENDS */}

        {/* EMAIL */}
        {!web && (
          <div className='mx-auto relative'>
            <Image
              src={'https:' + url}
              width={width}
              height={height}
              alt={description}
              className='md:group-hover:scale-105 duration-200 delay-150 transition-all'
            />
            <EmailCardModal
              isModal={isModal}
              projectName={projectName}
              siteUrl={siteUrl}
            />

            <EmailModalAccentMark />
          </div>
        )}
        {/* EMAIL ENDS */}
      </article>
    </>
  );
}
