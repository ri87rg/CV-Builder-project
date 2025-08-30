import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAccountStore } from '../store/accountInfo'
import { useLoginValidation } from '../schemas/loginSchema'
import { useRegisterValidation } from '@/schemas/registerScema'

import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardAction, 
  CardContent, 
  CardFooter
} from "../components/ui/card"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
} from '../components/ui/tabs'

export default function SignInPage() {
  const navigate = useNavigate()
  const {logIn, redirectionPath} = useAccountStore()

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: useLoginValidation,
    onSubmit: ({username, password}) => {
      console.log("submitted")
      logIn(username, password)
      navigate(redirectionPath)
    }
  })

  const registerFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: useRegisterValidation,
    onSubmit: ({username, password}) => {
      logIn(username, password)
      navigate(redirectionPath)
    }
  })

  const [currentTab, setCurrentTab] = useState('login')
  const handleTabChange = (tab) => {
    if (tab == "login") loginFormik.handleReset()
    else if (tab == "register") registerFormik.handleReset()
    setCurrentTab(tab)
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh_-_92px)]">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login To Get Access To Our Services
                </CardDescription>
                <CardAction>
                  <Button variant="link" onClick={() => handleTabChange('register')}>Sign Up</Button>
                </CardAction>
              </CardHeader>
                <CardContent>
                  <form onSubmit={loginFormik.handleSubmit}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username"
                          name="username"
                          type="text"
                          value={loginFormik.values.username}
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          placeholder="Username"
                          className={loginFormik.errors.username && loginFormik.touched.username ? 'border-red-500 border-2' : ''} 
                        />
                        {loginFormik.errors.username && loginFormik.touched.username && <p className="text-red-400">{loginFormik.errors.username}</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a 
                            href="#" 
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                            Forgot Your Password?
                          </a>
                        </div>
                        <Input 
                          id="password"
                          name="password"
                          type="password"
                          value={loginFormik.values.password}
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          placeholder="Password"
                          className={loginFormik.errors.password && loginFormik.touched.password ? 'border-red-500 border-2' : ''} 
                        />
                        {loginFormik.errors.password && loginFormik.touched.password && <p className="text-red-400">{loginFormik.errors.password}</p>}
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" onClick={loginFormik.handleSubmit}>
                    Login
                  </Button>
                </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create Your Account For Free Now!
                </CardDescription>
                <CardAction>
                  <Button variant="link" onClick={() => handleTabChange('login')}>Login</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form onSubmit={registerFormik.handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        name="username"
                        type="text"
                        value={registerFormik.values.username}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        placeholder="Username"
                        className={registerFormik.errors.username && registerFormik.touched.username ? 'border-red-500 border-2' : ''} 
                      />
                      {registerFormik.errors.username && registerFormik.touched.username && <p className="text-red-400">{registerFormik.errors.username}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        placeholder="Password"
                        className={registerFormik.errors.password && registerFormik.touched.password ? 'border-red-500 border-2' : ''} 
                      />
                      {registerFormik.errors.password && registerFormik.touched.password && <p className="text-red-400">{registerFormik.errors.password}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Confirm Password</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={registerFormik.values.confirmPassword}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        placeholder="Confirm Password"
                        className={registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword ? 'border-red-500 border-2' : ''} 
                      />
                      {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword && <p className="text-red-400">{registerFormik.errors.confirmPassword}</p>}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={registerFormik.handleSubmit}>
                  Register
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}