import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getAvatarUrl } from "../utils/RandomImage";
import RoleEnum from "../utils/RoleEnum";

export default function NavbarUser() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return user ? (
    <div className="flex items-center ml-3">
      <div>
        <button
          onClick={handleClick}
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Menú usuario</span>
          <img
            className="w-10 h-10 rounded-full"
            src={getAvatarUrl(user.id)}
            alt="User photo"
          />
        </button>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <div className="px-4 py-2">
            <p className="text-base text-gray-900 dark:text-white font-medium">
              {user?.name}
            </p>
            <p className="text-sm text-gray-900 dark:text-gray-300">
              {user?.email}
            </p>
          </div>
          <Divider />
          <MenuItem onClick={() => navigate("/")}>
            <ListItemIcon>
              <FontAwesomeIcon icon={"house"} className="w-4 h-4" />
            </ListItemIcon>
            Inicio
          </MenuItem>
          {user.role.id == RoleEnum.ADMIN && (
            <MenuItem onClick={() => (window.location.href = "/admin")}>
              <ListItemIcon>
                <FontAwesomeIcon icon={"gear"} className="w-4 h-4" />
              </ListItemIcon>
              Panel
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <FontAwesomeIcon icon={"user"} className="w-4 h-4" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          <MenuItem onClick={() => navigate("/tickets")}>
            <ListItemIcon>
              <FontAwesomeIcon icon={"ticket"} className="w-4 h-4" />
            </ListItemIcon>
            Mis tickets
          </MenuItem>
          <MenuItem onClick={() => logout?.()}>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={"right-from-bracket"}
                className="w-4 h-4"
              />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </div>
    </div>
  ) : (
    <></>
  );
}
