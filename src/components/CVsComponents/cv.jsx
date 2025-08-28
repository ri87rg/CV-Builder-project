import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import { useCVInfoValidation } from '../../schemas/cvSchema'
import { useCVStore } from '../../store/cvStore'
import { useNotificationStore } from '../../store/notificationsStore'

import CustomButton from '../customButton'

export default function CV({cv}) {
  const {fullName, age, email, phoneNumber, image, skills, id} = cv 
  const {addNotification} = useNotificationStore()
  const {updateCV} = useCVStore()

  const [editMode, setEditMode] = useState(false)

  const downloadPDF = async () => {
    const cvElement = document.querySelector('#cv-info').cloneNode(true)
    if (!cvElement) return

    // Apply styles directly to the element
    cvElement.style.backgroundColor = "#242424"
    cvElement.style.color = "white"
    cvElement.style.width = "794px"  // 210mm is the width of A4
    cvElement.style.height = "1123px" // 297mm is the height of A4
    document.body.appendChild(cvElement)

    // Generate canvas with matching scale for high quality
    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
    })
    document.body.removeChild(cvElement);

    const imgData = canvas.toDataURL('image/png')

    // Create A4-sized PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Add image stretched to full width and height (no margins)
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    // Download the PDF
    pdf.save(`${fullName}-CV.pdf`)
  }

  const onSubmit = (values) => {
    updateCV(values)
    addNotification({title:"CV Updated!",description:"Congrats, You have updated a CV."})
    setEditMode(!editMode)
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset} = useFormik({
    initialValues: {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      age: age,
      skills: skills,
      image: image,
      id: id
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: useCVInfoValidation,
    onSubmit,
  })

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

  const [isValidForm, setIsValidForm] = useState(true)
  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => Boolean(error));
    setIsValidForm(Boolean(!hasErrors))
  }, [errors])

  return (
    <div className="flex flex-col justify-center items-center my-12">
      <div className="page-container w-[250px] md:w-[625px] lg:w-[1025px]">
        {!editMode ? (
          <div id='cv-info' className="cv-info flex flex-col justify-center items-center w-full">
            <h2 className="text-3xl">{fullName}</h2>
            <div className="section border w-full border-white my-4">
              <div className="w-full text-xl text-black bg-[color:hsl(0,_0%,_80%)]">Personal Info</div>
              <div className="info-container flex flex-col md:flex-row lg:flex-row justify-evenly w-full">
                <div className="details flex justify-items-start p-4 w-full">
                  <div className="keys flex flex-col gap-6 w-[40%]">
                    <p>Full Name: </p>
                    <p>Age: </p>
                    <p>E-Mail: </p>
                    <p>Phone Number: </p>
                  </div>
                  <div className="values flex flex-col gap-6 w-[40%]">
                    <p>{fullName}</p>
                    <p>{age}</p>
                    <p>{email}</p>
                    <p>{phoneNumber}</p>
                  </div>
                </div>
                <div className="photo flex justify-end content-center w-full p-4">
                  <img className="w-[140px] h-[170px]" src={image && URL.createObjectURL(image)} alt="Not Found" />
                </div>
              </div>
            </div>
            <div className="section border w-full border-white my-4">
              <div className="w-full text-xl text-black bg-[color:hsl(0,_0%,_80%)]">Skills</div>
              <div className="skills-container flex justify-start">
                <div className="details flex w-full">
                  <div className="keys w-[22.5%] p-4">
                    <p>Skills:</p>
                  </div>
                  <div className="values w-full p-4">
                    <pre className="whitespace-pre-wrap font-sans">{skills}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id='cv-info' className="cv-info flex flex-col justify-center items-center w-full">
            <form onSubmit={handleSubmit} onReset={handleReset} className='w-full'>
              <h2 className="text-3xl"></h2>
              <div className="section border w-full border-white my-4">
                <div className="w-full text-xl text-black bg-[color:hsl(0,_0%,_80%)]">Personal Info</div>
                <div className="info-container flex flex-col md:flex-row lg:flex-row justify-evenly w-full">
                  <div className="details flex justify-items-start p-4 w-full">
                    <div className="keys flex flex-col gap-10 w-[40%] justify-center">
                      <p>Full Name: </p>
                      <p>Age: </p>
                      <p>E-Mail: </p>
                      <p>Phone Number: </p>
                    </div>
                    <div className="values flex flex-col gap-6 w-[100%]">
                      <p className="full-name">
                        <input 
                          value={values.fullName}
                          id="fullName" 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          type="text" 
                          className={errors.fullName && touched.fullName ? 'border-red-500 border-2' : ''}
                        />
                        {errors.fullName && touched.fullName && <p className="text-red-400">{errors.fullName}</p>}
                      </p>
                      <p className="age">
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
                      </p>
                      <p className="email">
                        <input 
                          value={values.email}
                          id="email" 
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          type="email" 
                          className={errors.email && touched.email ? 'border-red-500 border-2' : ''}
                        />
                        {errors.email && touched.email && <p className="text-red-400">{errors.email}</p>}
                      </p>
                      <p className="phone-number">
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
                      </p>
                    </div>
                  </div>
                  <div className="photo flex justify-end items-center w-full p-4 gap-4">
                    <div className="flex flex-col justify-end items-center gap-3 w-full">
                      <input 
                        type="file"
                        id="image" 
                        onChange={handleInputChange}
                        className="bg-[color:hsl(0,_0%,_20%)] h-fit !w-[70%]"
                      />
                      <CustomButton 
                        text={"Remove Image"} 
                        additionalClasses='text-sm text-red-400 hover:text-red-600'
                        type={"button"}
                        func={() => {
                          handleChange({
                            target: {
                              id: "image",
                              name: "image",
                              value: null
                            }
                          })
                        }} 
                      />
                    </div>
                    <img className="w-[140px] h-[170px]" src={values.image && URL.createObjectURL(values.image)} alt="Not Found" />
                  </div>
                </div>
              </div>
              <div className="section border w-full border-white my-4">
                <div className="w-full text-xl text-black bg-[color:hsl(0,_0%,_80%)]">Skills</div>
                <div className="skills-container flex justify-start">
                  <div className="details flex w-full">
                    <div className="keys w-[22.5%] p-4">
                      <p>Skills:</p>
                    </div>
                    <div className="values w-full p-4">
                      <p className="skills">
                        <textarea 
                          id="skills" 
                          value={values.skills}
                          onChange={handleInputChange}
                          className="bg-[color:hsl(0,_0%,_20%)]"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        <div className="btns-container flex justify-end items-center gap-3 w-full">
          {!editMode ? (
            <>
              <CustomButton text={"Download"} func={() => {downloadPDF()}} />
              <CustomButton text={"Edit"} func={() => setEditMode(!editMode)} />
            </>
          ) : (
            <>
              {isValidForm && <CustomButton text={"Done"} func={() => handleSubmit()} type={"submit"} />}
              <CustomButton text={"Cancel"} func={() => {
                setEditMode(!editMode)
                handleReset()
              }} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}