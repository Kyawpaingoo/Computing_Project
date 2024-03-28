import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  
  PowerIcon,
 
} from "@heroicons/react/24/solid";
 
// profile menu component
// const profileMenuItems = [
//   {
//     label: "My Profile",
//     icon: UserCircleIcon,
//   },
//   {
//     label: "Edit Profile",
//     icon: Cog6ToothIcon,
//   },
//   {
//     label: "Inbox",
//     icon: InboxArrowDownIcon,
//   },
//   {
//     label: "Help",
//     icon: LifebuoyIcon,
//   },
//   {
//     label: "Sign Out",
//     icon: PowerIcon,
//   },
// ];
 
function ProfileMenu({logout}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
 const logoutHandler = () => logout();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1 shadow-none border-transparent bg-gray-900">
        
          return (
            <MenuItem
              
              onClick={logoutHandler}
              className={`flex items-center bg-gray-900 shadow-none border-transparent gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  
              }`}
            >
              {React.createElement(PowerIcon, {
                className: `h-4 w-4 text-red-500"`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="red"
              >
                Sign Out
              </Typography>
            </MenuItem>
          );
       
      </MenuList>
    </Menu>
  );
} 
 
function LogingButton() {
 
  const [login, setLogin] = useState('false');
  const [accessToken, setAccessToken] = useState(null);
  
    const handleLogin = async () =>{
      try {
        const response = await fetch('http://localhost:5000/login', {
                                    mode:  'cors',
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json'
                                    },
                                  });
                                  console.log(response);
        const data = await response.json();
        console.log(data);
        if(data.success){
          setLogin(true);
          setAccessToken(data.success.token);
          window.location.href='/';
        }
      }
      catch(error){
      console.log(error);
      }
    }
    
    const handleLogout = async () =>{
      try {
          const response = await fetch('http://localhost:5000/logout', {method:'POST'});
          if(response.ok){
          localStorage.removeItem('access_token');
          window.location.href='/';
          }
      }
      catch (error){
        console.log(error)
      }
    }

  

  
  return(
    <>
      {!login ? <ProfileMenu logout={handleLogout} /> :   ( <Button onClick={handleLogin} color="white" variant="outlined">Sigin</Button>)}
     
    </>
  )
}

export default function NavMenu() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto bg-transparent w-screen w-full p-2 border-transparent shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
         <img src="/src/assets/log-in-page-logo-transparent.png" className="rounded-md" style={{ width: '150px', height: '80px' }} />
        </Typography>
        
        <LogingButton/>
      </div>
      
    </Navbar>
  );
}