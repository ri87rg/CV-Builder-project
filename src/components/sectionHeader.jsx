export default function SectionHeader({text="Section Title"}) {
  return <p className='
      py-1 px-4 text-[13px] text-white border-2 border-White 
      bg-transparent rounded-2xl font-bold my-6 w-fit pointer-events-none'>
        {text}
      </p>
}