import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useCVStore } from "../store/cvStore"
import CVPreview from "../components/CVsComponents/cvPreview"

import { useNavigate } from "react-router-dom"
import { useAccountStore } from "../store/accountInfo"
import { useNotificationStore } from "@/store/notificationsStore"

export default function CVsPage() {
  const { account, isSignedIn } = useAccountStore()
  const { addNotification } = useNotificationStore()
  const navigate = useNavigate()
  const {CVs} = useCVStore()

  useEffect(() => {
    if (!isSignedIn()) {
      addNotification(
        {
          title: "Unauthorized",
          description: "Please sign in to view your CVs.",
        },
        false
      )
      navigate("/sign-in")
    }
  }, [isSignedIn, navigate, addNotification, account])

  return <div className="flex justify-center items-center">
    <div className="flex justify-center flex-wrap w-[1020px] h-full gap-6 my-12">
      {CVs.langth > 0 ? (
        <div>
          
        {CVs.map((cv) => (
            <CVPreview cv={cv} key={cv.id}/>
          ))
        }
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-1">
          <p>Looks like you don't have any CVs yet.</p>
          <Link to={'/cv/create'} className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create your first CV</Link>
        </div>
      )}
      </div>
    </div>
}