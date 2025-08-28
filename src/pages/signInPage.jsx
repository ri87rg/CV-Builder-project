import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAccountStore } from '../store/accountInfo'
import { useAccountValidation } from '../schemas/signInSchema'

import Button from "../components/customButton"

export default function SignInPage() {
  const navigate = useNavigate()
  const [viewContent, setViewContent] = useState('sign-in')
  const {logIn, redirectionPath} = useAccountStore()

  const onSubmit = ({username, password}) => {
    logIn(username, password)
    navigate(redirectionPath)
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset} = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: useAccountValidation,
    onSubmit,
  })

  return <div className={`flex justify-center items-center h-[calc(100vh_-_92.4px)]`}>
    <div className={`border-2 border-white h-[470px] rounded-2xl w-[400px] md:w-[550px] lg:w-[750px]`}>
      <div className="w-full flex justify-evenly flex-row">
        <Button func={() => setViewContent("sign-in")} text={`Sign in`} additionalClasses={`w-full m-3 text-[20px] ${viewContent == 'sign-in' && "glow-effect"}`}></Button>
        <Button func={() => setViewContent('Register')} text={`Register`} additionalClasses={`w-full m-3 text-[20px] ${viewContent == 'Register' && "glow-effect"}`}></Button>
      </div>

        <div className=' h-[calc(100%_-_62.5px)] flex justify-center items-center'>
          <div className="m-4 w-[215px] md:w-[300px] lg:w-[515px] h-[330px]">
        {viewContent == 'sign-in' ? (
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <label>Username</label>
                <input 
                value={values.username} 
                id='username'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='enter username'
                type="text" 
                className={errors.username && touched.username ? 'border-red-500 border-2' : ''} />
                {errors.username && touched.username && <p className="text-red-400">{errors.username}</p>}

                <label>Password</label>
                <input 
                value={values.password} 
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='enter password'
                type="password" 
                className={errors.password && touched.password ? 'border-red-500 border-2' : ''} />
                {errors.password && touched.password && <p className="text-red-400">{errors.password}</p>}

                <div className='flex gap-3 my-4'>
                  <input type="reset" value='Clear' />
                  <input type="submit" />
                </div>
              </form>
        ) : viewContent == 'Register' && (
          <form onSubmit={handleSubmit} onReset={handleReset}>
                <label>Username</label>
                <input 
                value={values.username} 
                id='username'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='enter username'
                type="text" 
                className={errors.username && touched.username ? 'border-red-500 border-2' : ''} />
                {errors.username && touched.username && <p className="text-red-400">{errors.username}</p>}

                <label>Password</label>
                <input 
                value={values.password} 
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='enter password'
                type="password" 
                className={errors.password && touched.password ? 'border-red-500 border-2' : ''} />
                {errors.password && touched.password && <p className="text-red-400">{errors.password}</p>}

                <div className='flex gap-3 my-4'>
                  <input type="reset" value='Clear' />
                  <input type="submit" value='Register' />
                </div>
              </form>
        )}
          </div>
        </div>

    </div>
  </div>
}