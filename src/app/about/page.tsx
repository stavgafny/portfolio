import ProfileBlob from '@/components/about/profile_blob'
import './globals.css'
export default function About () {
  return (
    <main>
      <div className='w-full h-full fixed bg-about_bg bg-cover opacity-10 z-[-1]'></div>
      <div className='flex p-8 gap-4 max-lg:items-center max-lg:flex-col'>
        <ProfileBlob />
        <div className='about_content flex flex-col gap-2 text-1xl'>
          <h1 className='lg:pt-10 lg:text-5xl max-lg:text-4xl max-lg:text-center'>
            About Me
          </h1>
          <div>
            <span>My name is </span>
            <span className='text-red-300'>Stav Gafny </span>
            <span>and I am from Ramat Hasharon, Israel.</span>
          </div>
          <div>
            <span>I am a </span>
            <span className='text-red-300'>Full Stack </span>
            <span>
              developer with a strong passion for building modern websites and
              apps.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
