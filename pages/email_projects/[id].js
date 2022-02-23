import React from 'react';

import { createClient } from 'contentful';
import { RiComputerLine } from 'react-icons/ri';
import { BiMobileAlt } from 'react-icons/bi';

import { MdOpenInBrowser } from 'react-icons/md';

import { useRouter } from 'next/router';
import { ProjectNavigate } from './../../components/ProjectNavigate';

import Logo from '../../components/Logo';
// import cellPhoneImg from '../../public/cellphone.png';
import androidBtmNav from '../../public/android-btm-nav.png';

import Image from 'next/image';
import Link from 'next/link';

import { getProjectMediaFileDetails } from '../../lib';
import { getPrevNextProj } from './../../lib';
import SecondaryButton from '../../components/SecondaryButton';

//Uncomment below and the closing parenthesis if trying to use ref in Next.js
export const Project = ({
  currProjectData = null,
  prevNextProjects,
}) /*React.forwardRef(({ currProjectData }, ref)*/ => {
  const [isMobTab, setIsMobTab] = React.useState(true);
  const [prevProject, nextProject] = prevNextProjects;

  const {
    mobScrollImgH,
    mobScrollImgW,
    mobScrollUrl,
    desktopScrollImgH,
    desktopScrollImgW,
    desktopScrollUrl,
  } = getProjectMediaFileDetails(currProjectData[0]);

  const { siteUrl } = currProjectData[0].fields;

  const handleClick = (id) => {
    id === 'mobile' ? setIsMobTab(true) : setIsMobTab(false);
  };

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        <section className='px-8 pb-20 pt-10 bg-primary-purple/30 relative'>
          <Logo />
          <article className=' z-0 '>
            {/* Tabs */}
            <div className='flex h-10 justify-evenly items-center rounded-full max-w-xs w-2/3 mx-auto mb-10 '>
              <div
                className={`w-1/2 ${
                  !isMobTab &&
                  'bg-primary-purple-light hover:bg-opacity-70 border border-gray-500'
                }  h-full rounded-tl-full rounded-bl-full  flex justify-center items-center cursor-pointer ${
                  isMobTab && 'scroll-tab-selected bg-opacity-5'
                }`}
                onClick={() => handleClick('mobile')}
              >
                <BiMobileAlt />
              </div>
              <div
                className={`w-1/2 ${
                  isMobTab &&
                  'bg-primary-purple-light hover:bg-opacity-70 border border-gray-500'
                } h-full rounded-tr-full rounded-br-full flex justify-center items-center cursor-pointer ${
                  !isMobTab && 'scroll-tab-selected  bg-opacity-5'
                }`}
                onClick={() => handleClick('desktop')}
              >
                <RiComputerLine />
              </div>
            </div>
            {(isMobTab && (
              <>
                {/*  Phone */}
                <div className='mx-auto h-[702px] w-[344px] max-w-full bg-black py-2 px-3 rounded-3xl relative'>
                  <div className='bg-black absolute min-w-[135px] max-w-[135px] left-1/2 -translate-x-2/4  min-h-[20px] max-h-[20px] z-10 rounded-bl-2xl rounded-br-2xl'>
                    <div className='curved-corner-topright w-[10px] h-[10px] top-0 left-[-8px] absolute'></div>
                    <div className='curved-corner-topright w-[10px] h-[10px] top-0 right-[-8px] absolute rotate-[270deg]'></div>
                  </div>

                  <div className='-z-10 top-0 h-full overflow-y-scroll rounded-2xl custom-scrollbar'>
                    <Image
                      src={'https:' + mobScrollUrl}
                      width={mobScrollImgW}
                      height={mobScrollImgH}
                    />
                  </div>
                  <div className='absolute bottom-2 bg-gray-400 left-[14.6px]  w-[calc(100%-1.6rem)] rounded-bl-xl rounded-br-xl'>
                    <Image src={androidBtmNav} />
                  </div>
                </div>
                {/*  Phone Ends */}

                {/* orig Image */}
                {/* <div className='pt-4'>
                <Image src={cellPhoneImg}></Image>
              </div> */}
              </>
            )) || (
              // Computer
              <div className='w-full'>
                <div className='  max-h-[662px] overflow-y-scroll custom-scrollbar'>
                  <Image
                    src={'https:' + desktopScrollUrl}
                    width={desktopScrollImgW}
                    height={desktopScrollImgH}
                  />
                </div>
              </div>
              // Computer Ends
            )}
          </article>
        </section>
        {/* Open in Browser Link */}
        <section className='relative'>
          <article className='cursor-pointer  absolute left-1/2 -translate-x-1/2 top-[-3.65rem]'>
            <Link href={siteUrl} passHref>
              <SecondaryButton
                btnText='view in browser'
                className='block h-full w-40 group space-x-4 py-3'
                target='_blank'
              >
                <MdOpenInBrowser className='ml-1 absolute group-hover:text-primary-purple-light text-xl' />
              </SecondaryButton>
            </Link>
          </article>
        </section>

        <section className='border-t-2 border-b-2 flex max-w-full border-secondary-gray mt-12 mb-32 w-11/12 mx-auto'>
          <Link href={`/email_projects/${prevProject}`} passHref>
            <ProjectNavigate
              projectName={prevProject}
              left
              routerAsPath={router.asPath}
            />
          </Link>

          <Link
            href={`/email_projects/${nextProject}`}
            passHref
            routerAsPath={router.asPath}
          >
            <ProjectNavigate
              projectName={nextProject}
              routerAsPath={router.asPath}
            />
          </Link>
        </section>
      </>
    );
};
// );

export default Project;

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items: emailProjects } = await client.getEntries({
    content_type: 'emailProject',
    select: 'fields',
  });

  const paths = emailProjects.map((project) => {
    const {
      fields: { projectName },
    } = project;
    return {
      params: {
        id: projectName,
      },
    };
  });
  // Make sure your component handles fallback if it is enabled in getStaticPaths. Fallback docs
  // Phew this was the problem
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items: emailProjects } = await client.getEntries({
    content_type: 'emailProject',
    select: 'fields',
  });

  const currProjectData = emailProjects.filter((project) => {
    return project.fields.projectName === params.id;
  });
  const prevNextProjects = getPrevNextProj(emailProjects, currProjectData);

  return { props: { currProjectData, prevNextProjects } };
}
