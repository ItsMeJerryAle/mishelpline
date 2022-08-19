import React, { forwardRef, useContext } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import config from '../../../config';
import requestLinks from './../../../constants/menu-items-dashboard/dashboardRequestLinks';
import usersLinks from './../../../constants/menu-items-dashboard/dashboardUsersLinks';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const menu = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		url: '/dashboard',
		icon: <DashboardIcon />,
	},
];

const Sidebar = () => {
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const authContext = useContext(AuthContext);

	return (
		<Drawer variant="permanent" open={open}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					paddingY: 2,
				}}
			>
				<img src="/favicon.ico" alt="logo" />
			</Box>
			<Box sx={{ mt: 3 }}>
				<List>
					{menu.map((item, index) => {
						const isCurrentRoute = location.pathname === `${item.url}`;
						let listItemProps = {
							component: forwardRef((props, ref) => (
								<Link
									key={index}
									ref={ref}
									{...props}
									to={`${config.basename}${item.url}`}
								/>
							)),
						};
						return (
							<ListItem
								key={index}
								disablePadding
								sx={{
									display: 'block',
									backgroundColor: isCurrentRoute ? '#ff8000' : 'transparent',
								}}
							>
								<ListItemButton
									{...listItemProps}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										color: isCurrentRoute ? 'white' : 'inherit',
										px: 'auto',
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
											color: isCurrentRoute ? 'white' : 'inherit',
										}}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.title}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>

				<Divider />
				<List
					subheader={
						open && (
							<ListSubheader component="div">
								{requestLinks?.title}
							</ListSubheader>
						)
					}
				>
					{requestLinks?.children?.map((item, index) => {
						const isCurrentRoute = location.pathname === `${item.url}`;
						let listItemProps = {
							component: forwardRef((props, ref) => (
								<Link
									key={index}
									ref={ref}
									{...props}
									to={`${config.basename}${item.url}`}
								/>
							)),
						};
						return (
							<>
								{item.allowedRoles.includes(
									authContext.authState.userInfo.role
								) && (
									<ListItem
										key={index}
										disablePadding
										sx={{
											display: 'block',
											backgroundColor: isCurrentRoute
												? '#ff8000'
												: 'transparent',
										}}
									>
										<ListItemButton
											{...listItemProps}
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 'auto',
												color: isCurrentRoute ? 'white' : 'inherit',
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
													color: isCurrentRoute ? 'white' : 'inherit',
												}}
											>
												{item.icon}
											</ListItemIcon>
											<ListItemText
												primary={item.title}
												sx={{ opacity: open ? 1 : 0 }}
											/>
										</ListItemButton>
									</ListItem>
								)}
							</>
						);
					})}
				</List>
				{authContext.authState.userInfo.role === 'superAdmin' && (
					<>
						<Divider />
						<List
							subheader={
								open && (
									<ListSubheader component="div" id="nested-list-subheader">
										{usersLinks?.title}
									</ListSubheader>
								)
							}
						>
							{usersLinks.children.map((item, index) => {
								const isCurrentRoute = location.pathname === `${item.url}`;
								let listItemProps = {
									component: forwardRef((props, ref) => (
										<Link
											key={index}
											ref={ref}
											{...props}
											to={`${config.basename}${item.url}`}
										/>
									)),
								};
								return (
									<>
										{item.allowedRoles.includes(
											authContext.authState.userInfo.role
										) && (
											<ListItem
												key={index}
												disablePadding
												sx={{
													display: 'block',
													backgroundColor: isCurrentRoute
														? '#ff8000'
														: 'transparent',
												}}
											>
												<ListItemButton
													{...listItemProps}
													sx={{
														minHeight: 48,
														justifyContent: open ? 'initial' : 'center',
														color: isCurrentRoute ? 'white' : 'inherit',
														px: 2.5,
													}}
												>
													<ListItemIcon
														sx={{
															minWidth: 0,
															mr: open ? 3 : 'auto',
															justifyContent: 'center',
															color: isCurrentRoute ? 'white' : 'inherit',
														}}
													>
														{item.icon}
													</ListItemIcon>
													<ListItemText
														primary={item.title}
														sx={{ opacity: open ? 1 : 0 }}
													/>
												</ListItemButton>
											</ListItem>
										)}
									</>
								);
							})}
						</List>
					</>
				)}

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<IconButton onClick={() => setOpen(!open)}>
						{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</Box>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
