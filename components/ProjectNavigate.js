import { ArrowLeft, ArrowRight } from './SVG';
import React from 'react';

// export const ProjectNavigate = ({ projectName, left }) => {
export const ProjectNavigate = React.forwardRef(
  ({ onClick, href, projectName, left, routerAsPath }, ref) => {
    // debugger;
    return (
      routerAsPath !== href && (
        <a
          href={href}
          ref={ref}
          onClick={onClick}
          className={`w-1/2 ${
            (left && 'border-r items-start') ||
            'border-l items-end translate-x-full'
          } border-secondary-gray`}
        >
          <article
            className={`w-full flex flex-col  ${
              (left && 'items-start') || 'items-end'
            }`}
          >
            <div className={`py-4 ${!left && 'text-right'}`}>
              {(left && <ArrowLeft />) || <ArrowRight />}
            </div>

            <div className='max-w-full w-full pb-6'>
              <h3
                className={`py-2 font-ibarra mobile-sm:text-lg mobile-lg:text-xl tablet-sm:text-2xl xl:text-3xl  text-primary-blue capitalize font-semibold ${
                  (left && 'text-left') || 'text-right'
                }`}
              >
                {projectName}
              </h3>
              <p
                className={`text-gray-400 capitalize tablet-lg:text-xl laptop-sm:text-2xl ${
                  (left && 'text-left') || 'text-right'
                } `}
              >
                {(left && 'previous project') || 'next project'}
              </p>
            </div>
          </article>
        </a>
      )
    );
  }
);

ProjectNavigate.displayName = 'ProjectNavigate';
