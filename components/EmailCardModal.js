import Link from 'next/link';
import PrimaryButton from './PrimaryButton';

function EmailCardModal({ isModal, projectName, siteUrl }) {
  return (
    <div
      className={`absolute z-20 flex flex-col justify-center items-center \
                          opacity-0 ${isModal && 'opacity-100'} \
                          transition-all duration-300 \
                          left-0 top-0 \ 
                          bg-primary-blue bg-opacity-30 w-full h-full`}
    >
      {/* Preview Btn */}
      <Link href={`email_projects/${projectName}`}>
        <PrimaryButton
          btnText='Preview'
          className={`capitalize my-3 pointer-events-none ${
            isModal && 'pointer-events-auto'
          }`}
          defaultHover={false}
        />
      </Link>
      {/* Preview Btn Ends */}

      {/* View in Browser Btn  */}
      <Link href={siteUrl} passHref>
        <PrimaryButton
          btnText='view in browser'
          additionalClasses={`capitalize my-3 pointer-events-none ${
            isModal && 'pointer-events-auto'
          }`}
          defaultHover={false}
          target='_blank'
        />
      </Link>
      {/* View in Browser Btn Ends */}
    </div>
  );
}

export default EmailCardModal;
