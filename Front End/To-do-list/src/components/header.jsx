import {Link} from "react-router-dom";

const Header = () => {
  return (
      <header className='bg-neutral  py-0 my-0 text-neutral-content'>
          <div className='align-elements flex justify-center sm:justify-end '>
              <div className='flex gap-x-6 justify-center items-center'>
             <Link to='/register' className='link link-hover text-xs md:text-sm'>Register</Link>/
             <Link to='/logout' className='link link-hover text-xs md:text-sm'>Logout</Link>
              </div>
          </div>
      </header>
  )
}
export default Header;