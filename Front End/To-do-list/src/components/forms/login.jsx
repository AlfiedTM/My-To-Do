import Email from "./input fields/email.jsx";
import Password from "./input fields/password.jsx";
import { Link } from "react-router-dom";
import Button from "./input fields/submitbutton.jsx";
import { useState } from "react";
import { LogIn } from "../../actions/users.jsx";
import { getAuthToken } from "../../api/index.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


const LoginForm = ({ logIn }) => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  /* Handle onChange */
  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  /* Handle onSubmit */
  const handleOnSumbit = (e) => {

    e.preventDefault();

    logIn(user);
  }

  const { isError, isValidLoginCredentials, isSigningIn } = useSelector((state) => {
    return state.user;
  });

  if (isError && !isValidLoginCredentials && !isSigningIn) {
    toast.error("Invalid details... Please check your details!", {
      position: "top-center"
    });
  }

  return (
    <main className="h-screen grid place-items-center">
      <form onSubmit={handleOnSumbit} className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        {/*Form Title*/}
        <h4 className="text-center text-3xl font-bold"> Login </h4>

        {/*Form Fields*/}
        <Email name="email" value={user.email} action={handleOnChange} placeholder="Email" />

        <Password name="password" value={user.password} action={handleOnChange} placeholder="Password" />
        {/*<div className=''>*/}
        <Button btnSize="block" name="Login" color="primary" />

        <p className="text-center">
          Don't have an account ?{" "}
          <Link
            className="text-primary ml-2 link link-hover link-primary"
            to="/register"
          >
            Register
          </Link>
        </p>

        {/*</div>*/}
      </form>
      <ToastContainer />
    </main>
  );
};
export default LoginForm;
