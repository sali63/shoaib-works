import React from 'react';
import Image from 'next/image';

import { createClient } from 'contentful';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PrimaryButton from './../../components/PrimaryButton';
import { ProjectNavigate } from './../../components/ProjectNavigate';
import Logo from '../../components/Logo';

export default function Project({ currProjectData, beforeAfterProjects }) {
  const {
    fields: {
      projectName,
      desc,
      tags,
      siteUrl,
      longDescription: projectBackground,
      previewImages,
    },
  } = currProjectData && currProjectData[0];
  const [prevProject, nextProject] = beforeAfterProjects;
  const [hero, previewOne, previewTwo] = previewImages;
  const {
    fields: {
      file: {
        details: {
          image: { width: heroWidth, height: heroHeight },
        },
        url: heroUrl,
      },
      title: heroTitle,
    },
  } = hero;

  const {
    fields: {
      file: {
        details: {
          image: { width: previewOneWidth, height: previewOneHeight },
        },
        url: previewOneUrl,
      },
      title: previewOneTitle,
    },
  } = previewOne;

  const {
    fields: {
      file: {
        details: {
          image: { width: previewTwoWidth, height: previewTwoHeight },
        },
        url: previewTwoUrl,
      },
      title: previewTwoTitle,
    },
  } = previewTwo;

  const router = useRouter();

  return (
    <>
      <section className='mb-16 col-span-2 px-10 pb-12 pt-10 bg-primary-purple-light'>
        <Logo />
        <article>
          <div className='relative w-full'>
            <Image
              src={'https:' + heroUrl}
              width={heroWidth}
              height={heroHeight}
              layout='responsive'
              alt={heroTitle}
            />
          </div>
        </article>

        <div className='2xl:grid 2xl:grid-cols-2 2xl:pt-20 2xl:grid-rows-portfolio-layout'>
          <div className='2xl:pr-32'>
            <article
              className='mt-8 pt-6 pb-5 2xl:pt-10 2xl:pb-8 border-t-2 border-b-2\
             border-secondary-gray md:grid grid-cols-2 2xl:grid-cols-1'
            >
              <h2
                className='font-titillium-web text-primary-blue font-bold text-3xl \
              capitalize'
              >
                {projectName}
              </h2>
              <p
                className='font-poppins pt-4 pb-4 2xl:pb-4 text-primary-blue \
               text-opacity-60 text-sm laptop-lg:text-base leading-7 laptop-lg:leading-9 \
               row-span-5'
              >
                {desc}
              </p>
              <div className='md:pt-6'>
                {/* <p className='font-public font-bold text-xs laptop-lg:text-sm text-primary-cyan capitalize'>
                  {categories.map((category, index, arr) => {
                    const slash = (index !== arr.length - 1 && '/') || '';
                    return `${category} ${slash && slash} `;
                  })}
                </p> */}
                <p
                  className='font-poppins pt-6 font-bold text-xs laptop-lg:text-sm \
                 text-primary-purple-dark uppercase'
                >
                  {tags.map((tag, index, arr) => {
                    const slash = (index !== arr.length - 1 && '/') || '';
                    return `${tag} ${slash && slash} `;
                  })}
                </p>
              </div>
              <PrimaryButton
                btnText='visit website'
                additionalClasses='mt-4 mb-0'
                href={siteUrl}
                target={'_blank'}
              />
            </article>
          </div>

          <article className='pb-10 pt-8'>
            <h3 className='font-titillium-web font-normal text-2xl capitalize'>
              project background
            </h3>
            <p className='font-public pt-4  text-primary-blue text-opacity-60 text-sm laptop-lg:text-base laptop-lg:leading-9 tracking-wider leading-7 '>
              {projectBackground}
            </p>
          </article>
          <article className='2xl:col-start-2'>
            <h3 className='font-titillium-web font-normal text-2xl capitalize'>
              static previews
            </h3>
            <div className='pt-8 pb-6'>
              <Image
                src={'https:' + previewOneUrl}
                width={previewOneWidth}
                height={previewOneHeight}
                alt={previewOneTitle}
              />
            </div>
            <div>
              <Image
                src={'https:' + previewTwoUrl}
                width={previewTwoWidth}
                height={previewTwoHeight}
                alt={previewTwoTitle}
              />
            </div>
          </article>
        </div>
      </section>

      <section className='border-t-2 border-b-2 flex max-w-full border-secondary-gray mt-12 mb-32 w-11/12 mx-auto'>
        <Link href={`/web_projects/${prevProject}`} passHref>
          <ProjectNavigate
            projectName={prevProject}
            left
            routerAsPath={router.asPath}
          />
        </Link>

        <Link
          href={`/web_projects/${nextProject}`}
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
}

export async function getStaticPaths() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items: webProjects } = await client.getEntries({
    content_type: 'webProject',
    select: 'fields.projectName',
  });

  const paths = webProjects.map((project) => {
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
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items: webProjects } = await client.getEntries({
    content_type: 'webProject',
    select: 'fields',
  });

  const currProjectData = webProjects.filter((project) => {
    return project.fields.projectName === params.id;
  });

  console.log(currProjectData);

  const indexCurrProject = webProjects.indexOf(currProjectData);

  let indexPreviousProject = indexCurrProject - 1;
  if (indexPreviousProject < 0) indexPreviousProject = webProjects.length - 1;

  let indexNextProject = indexCurrProject + 1;
  if (indexNextProject > webProjects.length - 1) indexNextProject = 0;

  const prevProject = webProjects[indexPreviousProject].fields.projectName;
  const nextProject = webProjects[indexNextProject].fields.projectName;
  const beforeAfterProjects = [prevProject, nextProject];

  return { props: { currProjectData, beforeAfterProjects } };
}
