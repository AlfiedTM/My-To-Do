import {useRouteError, Link} from "react-router-dom";

const Page = () => {
    const error = useRouteError();

    if(error.status===404) {
        return <main className='grid min-h-[100vh] place-items-center px-8'>
            <div className='text-center'>
                <p className='text-center font-extrabold text-primary text-4xl'>404</p>
                <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>Page Not Found</h1>
                <div className='mt-10'>
                    <Link to='/' className='btn btn-primary'>Go back</Link>
                </div>
            </div>
        </main>
    }
    return <main className='grid min-h-[100vh] place-items-center px-8'>
        <h1 className='text-center font-extrabold text-primary text-4xl'>There was an error... </h1>
    </main>
}
export default Page;