import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const dispatch = useDispatch();
    
    const logUserOut = () => {
        dispatch(logOut());
    }

    return (
        <div className="navbar bg-base-100 w-full">
            <div className="flex-1">
            </div>
            <p className='mx-3 hidden sm:block '>Hello,{' '} <span className='font-bold pl-1'>{' '} Alfred</span></p>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                 src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                        </div>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-50">
                        {/*<li>*/}
                        {/*    <a className="justify-between">*/}
                        {/*        Profile*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                        {/*<li><a>Settings</a></li>*/}
                        <li><button onClick={logUserOut} className='lr'>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>);
}

export default Navbar;