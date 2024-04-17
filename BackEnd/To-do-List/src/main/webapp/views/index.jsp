<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Task Management System</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="/assets/js/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="/assets/js/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<main className='h-screen grid place-items-center'>
    <form className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        {/*Form Title*/}
        <h4 className='text-center text-3xl font-bold'> Login </h4>

        {/*Form Fields*/}
        <div class="form-control"><label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                 className="w-4 h-4 opacity-70">
                <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
            </svg>
            <input type="email" name={name} className="grow" placeholder={placeholder}/>
        </label>
        </div>

        <Password name='password' placeholder='Password'/>
        {/*
        <div className=''>*/}
            <SubmitButton btnSize='block' name='Login' color='primary'/>

            <p className='text-center'>Don't have an account ?
                <Link
                        className='text-primary ml-2 link link-hover link-primary' to='/register'>
                Register
                </Link></p>

            {/*
        </div>
        */}
    </form>
</main>
</body>