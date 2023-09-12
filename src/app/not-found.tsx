export default function NotFound () {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-20'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <div className='flex w-full h-full justify-center ml-[60px]'>
          <h1 className='text-8xl lg:text-9xl'>404</h1>
          <div className='h-full flex flex-col justify-end py-2'>
            <div className='blinking-cursor-404 w-[60px] h-[8px]' />
          </div>
        </div>
        <h1 className='text-xl lg:text-3xl'>YOU&apos;RE BEYOND THE BORDERS.</h1>
      </div>
      <div>
        <a href='/' className='p-2 rounded-lg bg-[#b74141] text-2xl'>
          Go back
        </a>
      </div>
    </div>
  )
}
