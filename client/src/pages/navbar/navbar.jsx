// import './navbar.css';
// import { useState } from 'react';
// import { 
//     IconButton,
//     InputBase,
//     Typography,
//     Select,
//     MenuItem,
//     FormControl,
//     useTheme,
//     useMediaQuery
// } from '@mui/material';

// import { 
//     Search,
//     Message,
//     DarkMode,
//     LightMode,
//     Notifications,
//     Help,
//     Menu
// } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMode, setLogout } from '../../state/index.js';
// import { useNavigate } from 'react-router-dom';
// import FlexBetween from '../../components/FlexBetween';

// const Navbar = () => {
//     const [isMenuToggled, setIsMenuToggled] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector((state) => state.user);
//     const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

//     const theme = useTheme();
//     const dark = theme.palette.neutral.dark;

//     const fullName = user ? `${user.firstName} ${user.lastName}` : '';

//     return (
//         <FlexBetween>
//             <section className="navbar-section">
//                 <div className="navbar-title" onClick={() => navigate("/home")}>
//                     Connectify
//                 </div>
//                 {isNonMobileScreens && (
//                     <div className="search-container">
//                         <InputBase placeholder="Search" />
//                         <IconButton>
//                             <Search />
//                         </IconButton>
//                     </div>
//                 )}
//                 {isNonMobileScreens ? (
//                     <div className="desktop-nav">
//                         <IconButton onClick={() => dispatch(setMode())}>
//                             {theme.palette.mode === "dark" ? (
//                                 <DarkMode />
//                             ) : (
//                                 <LightMode style={{ color: dark }} />
//                             )}
//                         </IconButton>
//                         <Message />
//                         <Notifications />
//                         <Help />
//                         {user && (
//                             <FormControl variant="standard" value={fullName}>
//                                 <Select value={fullName} className="select-control" input={<InputBase />}>
//                                     <MenuItem value={fullName}>
//                                         <Typography>{fullName}</Typography>
//                                     </MenuItem>
//                                     <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         )}
//                     </div>
//                 ) : (
//                     <IconButton className="mobile-nav-toggle" onClick={() => setIsMenuToggled(!isMenuToggled)}>
//                         <Menu />
//                     </IconButton>
//                 )}
//                 {!isNonMobileScreens && isMenuToggled && (
//                     <div className="mobile-menu">
//                         <IconButton onClick={() => dispatch(setMode())}>
//                             {theme.palette.mode === "dark" ? (
//                                 <DarkMode />
//                             ) : (
//                                 <LightMode style={{ color: dark }} />
//                             )}
//                         </IconButton>
//                         <Message />
//                         <Notifications />
//                         <Help />
//                         {user && (
//                             <FormControl variant="standard" value={fullName}>
//                                 <Select value={fullName} className="select-control" input={<InputBase />}>
//                                     <MenuItem value={fullName}>
//                                         <Typography>{fullName}</Typography>
//                                     </MenuItem>
//                                     <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         )}
//                     </div>
//                 )}
//             </section>
//         </FlexBetween>
//     );
// }

// export default Navbar;
