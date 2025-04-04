import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice' //this is a way of redeclaring the variable from login to auth login
import {Button, Input, Logo} from './index'
import {useDispatch } from 'react-redux'
import authServices from '../appwrite/auth/auth'
import { useForm } from 'react-hook-form'  //this is from react hook form 

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    
    const login = async(data) => {
        setError("")
        try {

            let session = await authServices.logIn(data);
            if(session){
                const userData = await authServices.getCurrentUser();
                if(userData) dispatch(authLogin({userData}))
                navigate("/") //promatically sending the user after login
            }
            
        } catch (error) {
            setError(error);            
        }

    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl
        p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form 
            onSubmit={handleSubmit(login)} 
            className='mt-8'
            >
            //handlesubmit is a event of rect-hook-forms and by this we pass our function login where we defied what to happen if we submit the form
            //so dont name your function handlesubmit as using register we dont need to manage their states it automatically does that and provides us the data object

            <div className='space-y-5'>
                {/* input component */}
                <Input 
                label = "Email: "
                placeholder = "Enter Your Email"
                type = "email"
                // the register is a method which should always be spread if not it gets overridden
                // when again used in any other component and 1st parameter is the fieldname which must
                // be unique as it used as key in data we send along with it we can give different options see below
                {...register("email", { //options
                    required: true,
                    //for validation redux resource regExr
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }                  
                })}
                />

                <Input 
                label = "Password: "
                type = "password"
                placeholder = "Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button 
                type = 'submit'
                className = "w-full">
                    Sign-In
                </Button>
            </div>

            </form>
        </div>      
    </div>
  )
}

export default Login
