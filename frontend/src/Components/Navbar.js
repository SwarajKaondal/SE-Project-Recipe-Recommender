import { Restaurant } from "@mui/icons-material";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useStateValue } from "../StateProvider";
import CreateIcon from "@mui/icons-material/Create";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { initialState } from "../reducer";


const NavBar = () => {
  const navigate = useNavigate();
  const [
    {
      token,
      user: { role },
      cart,
    },
    dispatch,
  ] = useStateValue();

  const menuItems = [
    {
      listIcon: <CreateIcon style ={{color:"white", margin: "2px"}} />,
      listText: "Register",
      to: "/signup",
      display: !token,
    },
    {
      listIcon: <VpnKeyIcon style ={{color:"white"}}/>,
      listText: "Login",
      to: "/login",
      display: !token,
    }
  ]

  return (
    <div>
      <AppBar position="sticky" style={{ background: "#022950" }}>
        <Toolbar>
          <IconButton>
            <Restaurant fontSize="large" style={{ color: "white" }} />
          </IconButton>
          <Typography
            style={{
              flexGrow: 1,
              color: "white",
            }}
            variant="h5"
          >
            The CookBook
          </Typography>
          {menuItems.map(
              (listItem, key) =>
                listItem.display && (
                  <ListItem style = {{width: 'min-content'}}
                    button
                    key={key}
                    onClick={() => {
                      // setOpen(false);
                      navigate(listItem.to);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <ListItemIcon style ={{margin:"0 -20px 0 20px"}}>{listItem.listIcon}</ListItemIcon>
                    <ListItemText>
                      <b>{listItem.listText}</b>
                    </ListItemText>
                  </ListItem>
                )
            )}
        {token && (
              <ListItem
                button
                onClick={() => {
                  // setOpen(false);
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  dispatch({ type: "SET_TOKEN", token: null });
                  dispatch({ type: "SET_CART", cart: {} });
                  dispatch({ type: "SET_USER", user: initialState.user });
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  <b>Log out</b>
                </ListItemText>
              </ListItem>
            )}
        </Toolbar>
        
      </AppBar>
    </div>
  );
};

export default NavBar;
