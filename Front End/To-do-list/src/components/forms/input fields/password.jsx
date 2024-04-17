import Passwordicon from "../../icons/passwordicon.jsx";

const Password = ({name,placeholder, value, action }) => {
  return <>
      <label className="input input-bordered flex items-center gap-2">
          <Passwordicon />
          <input type="password" onChange={action} value={value} className="grow" placeholder={placeholder} name={name}/>
      </label></>
}
export default Password;