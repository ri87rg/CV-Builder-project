export default function SectionHeader({text="Section Title"}) {
  return <p className='
      py-1 px-4 text-[13px] text-black dark:text-white border-2 border-black dark:border-white 
      bg-transparent rounded-2xl font-bold my-6 w-fit pointer-events-none'>
        {text}
      </p>
}