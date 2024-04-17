import Email from "./input fields/email.jsx";
import Password from "./input fields/password.jsx";
import { Link } from "react-router-dom";
import { Input } from "./input fields/input.jsx";
import Button from "./input fields/submitbutton.jsx";

const RegisterForm = () => {
  return (
    <section className="h-screen grid place-items-center">
      <form className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-2">
        {/*form title*/}
        <h4 className="text-center font-bold ">User Registration</h4>

        {/*Form inputs*/}
        <Input name="firstName" type="text" label="First Name" />
        <div className="grid grid-cols-2 gap-x-2 hidden">
          <Input name="firstName" type="text" label="First Name" />
          <Input name="OtherName" type="text" label="Middle Name" />
        </div>

        {/*Last Name*/}
        <Input name="lastName" type="text" label="Last Name" />

        {/*Email*/}
        <Email name="email" placeholder="Email" />

        {/*Passwords*/}
        <Password placeholder="Password" name="password" />
        <Password placeholder="Confirm Password" name="confirmPassword" />
        <div className="mt-4">
          <Button name="Register" color="primary" btnSize="block" />
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
    </section>
  );
};

export default RegisterForm;
