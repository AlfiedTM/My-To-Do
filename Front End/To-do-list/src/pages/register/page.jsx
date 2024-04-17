import { Input } from "../../components/forms/input fields/input.jsx";
import Email from "../../components/forms/input fields/email.jsx";
import Password from "../../components/forms/input fields/password.jsx";
import { Link } from "react-router-dom";
import Button from "../../components/forms/input fields/submitbutton.jsx";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Page = () => {
  const TaskSwal = withReactContent(Swal);
  const [input, setInput] = useState({});

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  //     Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers here
      },
      body: JSON.stringify(input),
    });

    const res = await response.json();

    // If account creation was successful
    if (res.response == "Success") {
      TaskSwal.fire({
        title: "Account creation",
        text: "Successful... Please Log in now",
        icon: "success"
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          window.location.href = '/login';
        }
      });
    } else {
      TaskSwal.fire({
        title: "Account creation",
        text: res.error,
        icon: "error"
      });

    }
  }
  return (
    <section className="h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-2">
        {/*form title*/}
        <h4 className="text-center font-bold ">User Registration</h4>

        {/*Form inputs*/}
        <Input name="firstName" action={handleOnChange} value={input.firstName} type="text" label="First Name" />
        <div className="grid grid-cols-2 gap-x-2 hidden">
          <Input name="firstName" type="text" label="First Name" />
          <Input name="OtherName" type="text" label="Middle Name" />
        </div>

        {/*Last Name*/}
        <Input name="lastName" action={handleOnChange} value={input.lastName} type="text" label="Last Name" />

        {/*Email*/}
        <Email name="email" action={handleOnChange} value={input.email} placeholder="Email" />

        {/*Passwords*/}
        <Password action={handleOnChange} placeholder="Password" value={input.password} name="password" />
        <Password action={handleOnChange} placeholder="Confirm Password" value={input.confirmPassword} name="confirmPassword" />
        <div className="mt-4">
          <Button btnSize="block" name="Register" color="primary" />
        </div>
        <p className="text-center">
          Already have an account ?{" "}
          <Link
            className="text-primary ml-2 link link-hover link-primary"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </form>
      <ToastContainer />
    </section>
  );
};
export default Page;
