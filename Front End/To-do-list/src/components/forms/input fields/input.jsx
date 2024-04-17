export const Input = ({ label, name, type, action, required, value, defaultValue }) =>{
    return <div className='form-control'>
        <label className='label'>{label}</label>
        <input required={required &&"required"} defaultValue={defaultValue} onChange={action} value={value} type={type} name={name} className='input input-bordered' placeholder={label}/>
    </div>
}