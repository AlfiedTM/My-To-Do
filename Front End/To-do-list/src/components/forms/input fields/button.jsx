import { useNavigation } from "react-router-dom";

const d = ({
  name,
  color,
  btnSize,
  textSize = "",
  type,
  action,
  mute,
}) => {
  const btnStyle = `btn btn-${color} btn-${btnSize} ${textSize}`;

  return (
    <div className="form-control">
      <button onClick={action} type={type} className={btnStyle} disabled={mute}>
        {name}
      </button>
    </div>
  );
};
export default d;
