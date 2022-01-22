import logoImg from '../public/shoaib-works-logo.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className='w-6 mx-auto pb-12'>
      <Link href='/'>
        <a>
          <Image src={logoImg} />
        </a>
      </Link>
    </div>
  );
}
