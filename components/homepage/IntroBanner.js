import Image from 'next/image';
import { useGlobalContext } from '../../contexts/AppContext';

export default function IntroBanner() {
  const {
    homepage: {
      fields: {
        fullName,
        skills,
        profileImage: {
          fields: {
            file: { url: profileImage },
            description: profileImageDesc,
          },
        },
      },
    },
  } = useGlobalContext();

  return (
    <section className='bg-primary-purple-dark p-8 flex flex-col items-center space-y-3 min-h-screen justify-center'>
      <article>
        <div className='relative w-24 h-24 border-4 border-white rounded-full'>
          <Image
            className='rounded-full'
            src={`https:${profileImage}`}
            alt={profileImageDesc}
            layout='fill'
          />
        </div>
      </article>
      <article className='flex flex-col text-primary-purple-light items-center space-y-1'>
        <h3 className='capitalize text-lg  font-titillium-web'>{fullName}</h3>
        <div className='flex xs:flex-col  divide-x divide-primary-purple-light divide-opacity-70'>
          {skills.map((skill, index, arr) => (
            <p
              key={skill + index}
              className='font-poppins text-primary-purple-light pr-2 pl-2 text-opacity-70  font-normal capitalize text-xs tracking-wider'
            >
              {skill}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
