import EmailIcon from "../../icons/email.jsx";

const Email = ({placeholder, name, value,action}) => {
    return <>
        <label className="input input-bordered flex items-center gap-2">
        <EmailIcon/>
        <input type="email" onChange={action} name={name} value={value} className="grow" placeholder={placeholder}/>
    </label></>
}
export default Email;