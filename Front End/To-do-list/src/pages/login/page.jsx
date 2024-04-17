import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../../components/forms/index.jsx";
import { useEffect } from "react";
import { validateToken, loginUser } from "../../features/user/userSlice.jsx";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const Page = () => {


  const { isLoggedIn,
    isRegistering,
    isValidating,
    isValidToken,
    isSigningIn } = useSelector((state) => {
      return state.user;
    });

  let navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateToken());
  }, []);

  const logIn = (user) => {
    dispatch(loginUser(user))
    // loginUser()
  }

  if (isValidating) {
    return (<div className="relative">
      <div className="flex flex-col items-center justify-center h-screen">
        {/* <div className="grid grid-col-1"> */}
        <Circles
          height={80}
          width={80}
          color="#4fa94d"
          visible={true}
          wrapperClass=""
          wrapperStyle={{}}
        />
        {/* </div> */}
        <h4 className="block font-bold mt-2">Loading... Please wait</h4>
      </div>
    </div>)
  }
  if (!isLoggedIn) {
    return (
      <LoginForm logIn={logIn} />
    )
  }

  return (
    navigate("/tasks")
  )

}
export default Page;