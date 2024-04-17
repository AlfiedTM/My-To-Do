import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content" tabIndex={1}>
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
            </div>
            <div className="drawer-side" tabIndex={0}>
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>

                </ul>
            </div>
        </div>
    )
}
export default Sidebar;

{/*<div className="drawer md:drawer-open">*/
}
{/*    <input id="my-drawer" type="checkbox" className="drawer-toggle"/>*/
}
{/*    <div className="drawer-content left-[50%] ">*/
}
{/*        /!* Page content here *!/*/
}
{/*        <label htmlFor="my-drawer" onClick={handler} className="btn btn-primary drawer-button">Open drawer</label>*/
}
{/*    </div>*/
}
{/*    {checked &&*/
}
{/*        <div className="drawer-side">*/
}
{/*            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>*/
}
{/*            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">*/}
{/*                /!* Sidebar content here *!/*/}
{/*                <li><a>Sidebar Item 1</a></li>*/}
{/*                <li><a>Sidebar Item 2</a></li>*/}
{/*            </ul>*/}
{/*        </div>}*/}
{/*</div>*/}