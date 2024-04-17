const TextAreaInputField = ({placeholder, title, action, name, required, value})=> {
  return (
    <div className="form-control">
      <label> {title}
        <textarea onChange={action}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required && "required"}
          className="textarea textarea-bordered textarea-md w-full max-w-xs"
        ></textarea>
      </label>
    </div>
  );
}
export default TextAreaInputField