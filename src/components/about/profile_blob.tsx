export default function ProfileBlob ({ shown }: { shown: boolean }) {
  return (
      <div
        className={
          'profile_blob bg-about_profile_blob bg-cover w-[300px] h-[300px] ' +
          (shown ? 'shown' : '')
        }
      ></div>
  )
}
