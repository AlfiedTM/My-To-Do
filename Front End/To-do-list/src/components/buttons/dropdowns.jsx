import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ManageTaskIcon from "../icons/managetask";
import CustomMenu from "./dropdownmenu";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";



const DropDownButton = (props) => {
  const { resource, link, Icon } = props;
  const [anchorEl, setAnchorEl] = useState(false);

  // Mutators
  // When user clicks the main button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // When a user closes the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsSuggestOutlinedIcon />
      </IconButton>
      <CustomMenu
        id="simple-menu"
        keepMounted
        {...props}
        resource={resource}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      />
    </>
  );
};

export default DropDownButton;
