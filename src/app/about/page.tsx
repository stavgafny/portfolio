import ProfileBlob from '@/components/about/profile_blob'
import './globals.css'
export default function About () {
  return (
    <main>
      <div className='w-full h-full fixed bg-about_bg bg-cover opacity-25 z-[-1]'></div>
      <div className='lg:hidden w-full h-full flex justify-center p-8'>
      <ProfileBlob />
      </div>
      <div className='max-lg:hidden w-full h-full flex justify-end p-8'>
      <ProfileBlob />
      </div>
    </main>
  )
}
