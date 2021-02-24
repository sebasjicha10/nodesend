import React, {useContext, useEffect} from 'react'
import Link from "next/link"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext"
import {useRouter} from "next/router"


const Header = () => {

    const router = useRouter()

    const AuthContext = useContext(authContext)
    const {user, authenticatedUser, logOut} = AuthContext

    const AppContext = useContext(appContext)
    const {cleanState} = AppContext

    useEffect(() => {
        authenticatedUser()
    }, [])

    const redirect = () => {
        router.push("/")
        cleanState()
    }

    return (  
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <img 
                onClick={() => redirect()}
                className="w-64 mb-8 md:mb-0 cursor-pointer" 
                src="/logo.svg" alt="React Node Send logo"
            />

            <div>
                {user ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hello {user.name}</p>
                        <button 
                            type="button"
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={logOut}
                        >Log Out</button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Log In</a>
                        </Link>

                        <Link href="/signup">
                            <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Sigun Up</a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header