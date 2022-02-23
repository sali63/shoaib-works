function EmailModalAccentMark() {
  return (
    <>
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
    </>
  );
}

export default EmailModalAccentMark;
