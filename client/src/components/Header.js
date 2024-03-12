import React from 'react'
import './Header.css'
import { LoginContext } from './ContextProvider/Context';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showError = () => {
    history("*")
  }

  const showDash = () => {
    history("/dash")
  }

  const userLogout = async () => {
    let token = localStorage.getItem("usersdata");
    // console.log(token);

    const res = await fetch("http://localhost:8989/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("user Logout");
      localStorage.removeItem("usersdata");
      setLoginData(false)
      history("/");
    } else {
      console.log("error");


    }
  }


  return (
    <header>
      <nav>
        <h1>Logo</h1>

        <div className='avtar'>
          {
            logindata.ValidUserOne ?
              <Avatar style={{ background: "salmon", fontWeight: "bold" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
              (
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
              )
          }

        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          {
            logindata.ValidUserOne ? (
              <>
                <MenuItem onClick={() => {
                  handleClose()
                  showDash()
                }}>Profile</MenuItem>

                <MenuItem onClick={() => {
                  userLogout()
                  handleClose()
                }}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => {
                showError()
                handleClose()
              }}>Profile</MenuItem>

            )
          }

        </Menu>
      </nav>
    </header>
  )
}

export default Header