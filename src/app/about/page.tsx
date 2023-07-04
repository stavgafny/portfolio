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
              applications.
            </span>
          </div>

          <span>
            Programming is not just a profession for me; it&apos;s a way of
            expressing my creativity and problem-solving skills.
          </span>

          <span>
            When I&apos;m not programming, you&apos;ll find me playing the drums.
          </span>

          <div className='text-sm text-gray-400 flex flex-col'>
            <p>
              Explore my portfolio and get in touch if you have any questions or
              if you&apos;d like to discuss potential collaborations.
            </p>
            <p>Let&apos;s create something amazing together!</p>
          </div>
        </div>
      </div>
    </main>
  )
}
