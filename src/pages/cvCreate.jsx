import { useFormik } from "formik";
import CustomButton from "../components/customButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../store/notificationsStore";
import { useCVInfoValidation } from "../schemas/cvSchema";
import { useCVStore } from "../store/cvStore";

import {useAccountStore} from "../store/accountInfo"

export default function CVPage() {
  const {addNotification} = useNotificationStore()
  const navigate = useNavigate()
  const { account, isSignedIn } = useAccountStore()
  
  useEffect(() => {
    if (!isSignedIn()) {
      addNotification(
        {
          title: "Unauthorized",
          description: "Please sign in to create new CVs.",
        },
        false
      )
      navigate("/sign-in")
    }
  }, [isSignedIn, navigate, addNotification, account])

  const {addCV} = useCVStore()

  const [hasInteracted, setHasInteracted] = useState(false)
  const handleInputChange = (e) => {
    const { id, files } = e.target;
    if (!hasInteracted) setHasInteracted(true)
      if (id === "image") {
    handleChange({
      target: {
        id: "image",
        name: "image",
        value: files[0],
      },
    });
    } 
    else {
      handleChange(e);
    }
  }

  const onSubmit = (values) => {
    addCV(values)
    addNotification({title:"CV Created!",description:"Congrats, You have created a new CV."}, true, `/cv/display/${values.id}`)
    navigate("/")
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      age: "",
      skills: "",
      image: null,
      id: Date.now()
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: useCVInfoValidation,
    onSubmit,
  })

  const [index, setIndex] = useState(0)
  const wizardSlides = [
    (<div className="slid-1">
      <label>Full Name</label>
      <input 
        value={values.fullName}
        id="fullName" 
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="text" 
        className={errors.fullName && touched.fullName ? 'border-red-500 border-2' : ''}
      />
      {errors.fullName && touched.fullName && <p className="text-red-400">{errors.fullName}</p>}
      
      <label>E-Mail</label>
      <input 
        value={values.email}
        id="email" 
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="email" 
        className={errors.email && touched.email ? 'border-red-500 border-2' : ''}
      />
      {errors.email && touched.email && <p className="text-red-400">{errors.email}</p>}

      <label>Phone Number</label>
      <input
        value={values.phoneNumber}
        id="phoneNumber"
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="number"
        onKeyDown={(e) => {
          if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault();
          }
        }}
        className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500 border-2' : ''}`}
      />
      {errors.phoneNumber && touched.phoneNumber && <p className="text-red-400">{errors.phoneNumber}</p>}
    </div>),
    (<div className="slid-2">
      <label htmlFor="age">Age</label>
      <input
        value={values.age}
        id="age"
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="number"
        onKeyDown={(e) => {
          if (["e", "E", "+", "-", "."].includes(e.key)) {
            e.preventDefault();
          }
        }}
        className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        ${errors.age && touched.age ? 'border-red-500 border-2' : ''}`}
      />
      {errors.age && touched.age && <p className="text-red-400">{errors.age}</p>}

      <label htmlFor="skills">Skills <span className="text-[13px]">(optional)</span></label>
      <textarea 
        id="skills" 
        value={values.skills}
        onChange={handleInputChange}
        className="bg-[color:hsl(0,_0%,_20%)]"
      />

      <label htmlFor="image">Image <span className="text-[13px]">(optional)</span></label>
      <input 
        type="file"
        id="image" 
        onChange={handleInputChange}
        className="bg-[color:hsl(0,_0%,_20%)]"
      />
    </div>),
    (<div className="slid-3">
      <div className="text-center">You are all set!</div>
    </div>)
  ]

  
  function checkErrors() {    
    if (!hasInteracted) return false

    switch (index) {
      case 0:
        return Boolean(!errors.fullName && !errors.email && !errors.phoneNumber)
      case 1:
        return Boolean(!errors.age)
      default:
          return false;
    }
  }
  
  const [isSlideValid, setIsSlideValid] = useState(false)
  useEffect(() => {
    setIsSlideValid(checkErrors())
  }, [errors, index])
  
  return <div className={`flex justify-center items-center h-[calc(100vh_-_92.4px)]`}>
      <div className={`border-2 border-white h-[470px] rounded-2xl w-[400px] md:w-[550px] lg:w-[750px]`}>
        <div className='box-container h-full flex flex-col justify-center items-center'>
          <div className="form-container my-2 w-[215px] md:w-[300px] lg:w-[515px]">
            <form onSubmit={handleSubmit}>

              {wizardSlides[index]}

              {index == wizardSlides.length - 1 && 
                <div className="btns-container flex flex-row justify-center items-center gap-3 mt-2">
                  <input type="submit" value="Finish" />
                </div>
              }
            </form>
          </div>
          <div className="btns-container flex flex-row justify-center items-center gap-3 my-2 w-[215px] md:w-[300px] lg:w-[515px]">
            {index !== 0 && 
              <CustomButton func={() => {setIndex((index - 1) % wizardSlides.length)}} additionalClasses="w-full bg-[color:hsl(0,_0%,_20%)] text-white">Previous</CustomButton>
            }
            {index !== wizardSlides.length - 1 && isSlideValid &&
              <CustomButton func={() => {setIndex((index + 1) % wizardSlides.length)}} additionalClasses="w-full bg-[color:hsl(0,_0%,_20%)] text-white">Next</CustomButton>
            }
          </div>
        </div>
      </div>
    </div>
}