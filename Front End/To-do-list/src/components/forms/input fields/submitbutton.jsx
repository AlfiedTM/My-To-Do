import {useNavigation} from "react-router-dom";

const SubmitButton = ({name, color, btnSize, textSize = '', type, action, mute, isSubmitting}) => {
    const btnStyle = `btn btn-${color} btn-${btnSize} ${textSize}`;

  return (
    <div className="form-control">
      <button onClick={action} type={type} className={btnStyle} disabled={mute}>
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            Logging in...
          </>
        ) : (
          name
        )}
      </button>
    </div>
  );
};
export default SubmitButton;