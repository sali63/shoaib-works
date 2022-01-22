import React from 'react';

import { createClient } from 'contentful';
import { RiComputerLine } from 'react-icons/ri';
import { BiMobileAlt } from 'react-icons/bi';

import Logo from '../../components/Logo';
import cellPhoneImg from '../../public/cellphone.png';
import androidBtmNav from '../../public/android-btm-nav.png';

import Image from 'next/image';

//Uncomment below and the closing parenthesis if trying to use ref in Next.js
export const Project = ({
  currProjectData = [],
}) /*React.forwardRef(({ currProjectData }, ref)*/ => {
  const [isMobTab, setIsMobTab] = React.useState(true);
  const {
    fields: {
      scrollImageMobile: {
        fields: {
          file: {
            details: {
              image: { height: mobScrollImgH, width: mobScrollImgW },
            },
            url: mobScrollUrl,
          },
        },
      },
      scrollImageDesktop: {
        fields: {
          file: {
            details: {
              image: { height: desktopScrollImgH, width: desktopScrollImgW },
            },
            url: desktopScrollUrl,
          },
        },
      },
    },
  } = currProjectData[0];

  const handleClick = (id) => {
    id === 'mobile' ? setIsMobTab(true) : setIsMobTab(false);
  };

  return (
    <>
      <section className='px-8 pb-12 pt-10 bg-primary-purple bg-opacity-30'>
        <Logo />
        <article className=' z-0 '>
          {/* Tabs */}
          <div className='flex h-10 justify-evenly items-center rounded-full  w-2/3 mx-auto mb-10 '>
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
                    src={'https://' + mobScrollUrl}
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
                  src={'https://' + desktopScrollUrl}
                  width={desktopScrollImgW}
                  height={desktopScrollImgH}
                />
              </div>
            </div>
            // Computer Ends
          )}
        </article>
      </section>
    </>
  );
};
// );

export default Project;

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL.SPACE_ID,
    accessToken: process.env.CONTENTFUL.ACCESS_TOKEN,
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

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    space: process.env.CONTENTFUL.SPACE_ID,
    accessToken: process.env.CONTENTFUL.ACCESS_TOKEN,
  });

  const { items: emailProjects } = await client.getEntries({
    content_type: 'emailProject',
    select: 'fields',
  });

  const currProjectData = emailProjects.filter((project) => {
    return project.fields.projectName === params.id;
  });

  // const indexCurrProject = webProjects.indexOf(currProjectData);

  // let indexPreviousProject = indexCurrProject - 1;
  // if (indexPreviousProject < 0) indexPreviousProject = webProjects.length - 1;

  // let indexNextProject = indexCurrProject + 1;
  // if (indexNextProject > webProjects.length - 1) indexNextProject = 0;

  // const prevProject = webProjects[indexPreviousProject].fields.projectName;
  // const nextProject = webProjects[indexNextProject].fields.projectName;
  // const beforeAfterProjects = [prevProject, nextProject];

  return { props: { currProjectData } };
}
