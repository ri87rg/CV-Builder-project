import CustomButton from "../customButton"
import { useCVStore } from "../../store/cvStore"
import { useNavigate } from "react-router-dom"

export default function CVPreview({cv}) {
  const {removeCV} = useCVStore()
  const naviagte = useNavigate()

  return <div key={cv.id} className="min-w-[250px] min-h-[150px] bg-[color:hsl(0,_0%,_20%)] text-white rounded-2xl border-2 border-[color:oklch(60.9%_0.126_221.723)] ">
      <div className="info p-7">
        <h1>Full Name: {cv.fullName}</h1>
        <p>Age: {cv.age}</p>
        <p>E-mail: <br />{cv.email}</p>
        <div className="btns-container flex flex-row justify-center mt-4 gap-4">
          <CustomButton func={() => {naviagte(`/cv/display/${cv.id}`)}} text={"Review"} />
          <CustomButton func={() => {removeCV(cv.id)}} text={"Delete"} />
        </div>
      </div>
    </div>
}