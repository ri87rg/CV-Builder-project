export default function Button({
  children,
  text, 
  func, 
  type, 
  customStyle = "bg-[#cccccc] py-2 px-4 rounded-2xl text-black text-[15px] font-[600] cursor-pointer",
  additionalClasses = "",
  cssStyling
}) {
  return <button onClick={func} type={`${type}`} className={`${customStyle} ${additionalClasses}`} style={cssStyling}>{text}{children}</button>
}