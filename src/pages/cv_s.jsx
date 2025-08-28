import { useCVStore } from "../store/cvStore"
import CVPreview from "../components/CVsComponents/cvPreview"

export default function CVsPage() {
  const {CVs} = useCVStore()
  return <div className="flex justify-center items-center">
    <div className="flex justify-center flex-wrap w-[1020px] h-full gap-6 my-12">
      {CVs.map((cv) => (
          <CVPreview cv={cv} key={cv.id}/>
        ))
      }
    </div>
  </div>
}