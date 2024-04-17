import { Link, Outlet, redirect } from "react-router-dom";
import Navbar from "../../components/navigation/navbar.jsx";
import { useState } from "react";
import Loader from "../../components/presentation/loader.jsx";

const Page = () => {


  const [open, setOpen] = useState(true);

  function toggle() {
    setOpen(prev => !prev)
  }

  return (
    <div className="flex gap-4 ">
      <nav
        className={`w-64 h-full border-r fixed z-20 flex-col shadow-xl shadow-ba se-300 inset-y-0 left-0 w-72 max-w-full bg-ba se-100 text-fg-primary p-6 transition-transform duration-500 ease-in-out transform ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      ><div className="w-full flex-col items-center justify-start mb-8">
          <h1 className="btn text-blue-600 w-full text-xl font-bold mb-8">
            Task Manager
          </h1>

          <Link to={'/tasks'} className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md">
            {/* <FaIcon icon={icon} className="mr-2" /> Adjust margin as needed */}
            Tasks
          </Link>
          <hr className="block" />
          <div className="w-full block">
            <div className="underline"></div>
          </div>
          <hr className="text-white underline" />
        </div>

      </nav>
      <main
        className={`flex-1  transition-all duration-500 ease-in-out -pl-0 ${open ? "md:pl-72" : "md:pl-4"
          } `}
      >
        <nav
          className={`flex transition-all duration-500 ease-in-out gap-4 ${open ? "pl-5" : "pl-0"
            }`}
        >
          <button className="" onClick={() => toggle()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M4 6h16v2H4zm2 5h10v2H6zm-2 5h16v2H4z" />
            </svg>
          </button>
          <Navbar />
        </nav>
        <section className="card w-full p-8 bg-base-100 shadow-lg flex flex-grid h-screen">
          <Outlet />
        </section>
      </main>
    </div>
  );

}
export default Page;

export const loader = () => {
  return <Loader text={'Loading please wait...'} />;
}