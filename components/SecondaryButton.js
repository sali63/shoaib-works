import React from 'react';

const SecondaryButton = React.forwardRef(
  (
    {
      onClick,
      href,
      btnText,
      additionalClasses,
      className,
      target = '_self',
      defaultHover = true,
      children,
    },
    ref
  ) => {
    return (
      <a
        className={`no-underline w-32 cursor-pointer text-center \
        
        py-1 my-6 text-sm inline-block border border-primary-blue \

        hover:bg-primary-blue hover:text-primary-purple-light transition-all \

        duration-300 uppercase text-primary-blue whitespace-nowrap \
       
        ${
          !defaultHover &&
          'bg-primary-blue text-primary-purple-light \
          active:bg-primary-purple-light active:text-primary-blue  laptop-sm:hover:bg-primary-purple-light laptop-sm:hover:text-primary-blue'
        } 
        ${additionalClasses || className}`}
        //
        ref={ref}
        onClick={onClick}
        href={href}
        target={target}
      >
        {children}
        <span>{btnText}</span>
      </a>
    );
  }
);

SecondaryButton.displayName = 'PrimaryButton';

export default SecondaryButton;
