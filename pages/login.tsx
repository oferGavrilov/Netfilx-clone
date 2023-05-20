import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import useAuth  from '../custom-hook/useAuth'

interface Inputs {
    email: string
    password: string
    fullname?: string
}

function Login() {
    const [login, setLogin] = useState(true)
    const { signIn, signUp } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password, fullname }) => {
        if (login) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }

    return (
        <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Image
                src="/login.jpg"
                alt="login-image"
                layout='fill'
                objectFit='cover'
                className='-z-10 '
            />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />
            <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
                <h1 className='text-4xl font-semibold'>{login ? 'Sign In' : 'Sign Up'}</h1>
                <div className='space-y-4'>
                    {!login &&
                        <label className='inline-block w-full'>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input"
                                {...register('fullname', { required: true })}
                            />
                            {errors.email && (
                                <p className="p-1 text-[13px] font-light  text-orange-500">
                                    Please enter a full name.
                                </p>
                            )}
                        </label>}

                    <label htmlFor="" className='inline-block w-full'>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            {...register('email', { required: true })}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label htmlFor="" className='inline-block w-full'>
                        <input type="password"
                            placeholder='Password'
                            className='input'
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 4 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>
                <button type='submit' className='w-full rounded bg-[#e50914] py-3 font-semibold'>Sign In</button>

                <div className='text-[gray]'>
                    {login && 'New to Netflix?'}
                    {!login && 'Already have a user?'}
                    <button className='text-white hover:underline px-2' onClick={() => setLogin(!login)}>{login ? 'Sign up now' : 'Sign in now'}</button>
                </div>
            </form>
        </div>
    )
}

export default Login
