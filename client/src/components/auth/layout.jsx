import { Outlet } from "react-router-dom"

function AuthLayout(){
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-10 text-primary-foreground">
                <div className=" max-w-md text-center">
                    <h1 className="text-4xl space-y-6">Welcome to Ecommerce Application</h1>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
                <Outlet/>
            </div>

        </div>
    )
}

export default AuthLayout