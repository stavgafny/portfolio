export default function ProfileBlob () {
  const sharedClassName = 'profile_blob bg-about_profile_blob bg-cover'
  return (
    <>
      <div className={`${sharedClassName} w-[200px] h-[200px] lg:hidden`}></div>
      <div className={`${sharedClassName} w-[300px] h-[300px] max-lg:hidden`}></div>
    </>
  )
}
