import React, {useState, useContext} from 'react'
import Layout from "../../components/Layout"
import axiosCliente from "../../config/axios"
import appContext from "../../context/app/appContext"
import Alert from "../../components/Alert"


export async function getServerSideProps({params}) {
    const {url} = params
    
    const result = await axiosCliente.get(`/api/urls/${url}`)

    return {
        props: {
            url: result.data
        }
    }
}

export async function getServerSidePaths() {
    const urls = await axiosCliente.get("/api/urls")

    return {
        paths: urls.data.urls.map(url => ({
            params: {url: url.url}
        })),
        fallback: false
    }
}

export default ({url}) => {

    const AppContext = useContext(appContext)
    const {showAlert, file_message} = AppContext

    const [hasPassword, setHasPassword] = useState(url.password)
    const [password, setPassword] = useState("")

    const verifyPassword = async e => {
        e.preventDefault()

        const data = {
            password
        }

        try {
            const result = await axiosCliente.post(`/api/urls/${url.url}`, data)
            setHasPassword(result.data.password)
        } catch (error) {
            showAlert(error.response.data.msg)
        }

    }
  
    return (
        <Layout>

            {hasPassword ? (
                <>
                    <p className="text-center">File protected by password, submit it here:</p>
                    {file_message && <Alert />}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={e => verifyPassword(e)}
                            >


                                <div className="mb-4">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password</label>
                                    <input 
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="File's Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"  
                                    value="SUBMIT PASSWORD"
                                />
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl text-center text-gray-700">Download your file:</h1>

                    <div className="flex items-center justify-center mt-10">
                        <a 
                            href={`${process.env.backendURL}/api/files/${url.file}`} 
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            download
                        >Here</a>
                    </div>
                </>
            )}

        </Layout>
    )
}