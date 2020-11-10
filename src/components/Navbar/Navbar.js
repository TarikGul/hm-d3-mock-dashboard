import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Divider } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/MenuIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: 100,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginTop: 10,
    },
    appBar: {
        height: 60
    },
    title: {
        paddingTop: 5,
    },
    accoundIcon: {
        alignSelf: 'end',
    }
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h4" color="inherit">
                        Hellometer Dashboard
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        edge='end'
                        // onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;