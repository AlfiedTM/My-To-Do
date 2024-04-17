import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { memo } from "react";
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';

const CustomMenu = (data) => {
  const { id, anchorEl, keepMounted, open, onClose, menuItems, resource } =
    data;
    console.log(id);



  // Memoized MenuItem to prevent re-renders
  const MemoizedMenuItem = memo(menuItems);
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      keepMounted={keepMounted}
      open={open}
      onClose={onClose}
    >
      {menuItems.map((item) => {
        const { text, Icon, action } = item;
        let keyId = nanoid();
        return (
          <MenuItem
            key={keyId}
            onClick={
              action
                ? () => {
                    onClose();
                    action(id);
                  }
                : () => {}
            }
          >
            {Icon && <Icon>{Icon}</Icon>}
            <span style={{ marginLeft: "5px" }}> {text}</span>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default CustomMenu;
