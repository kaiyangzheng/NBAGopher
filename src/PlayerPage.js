import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha, createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { green, orange, blue } from '@material-ui/core/colors';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }, search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: orange[500]
        }
    }
})

export default function PlayerPage() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div classsName="App">
                <header className="App-header">
                    <AppBar position="static">
                        <ToolBar color="primary">
                            <IconButton edge="start" className={classes.menuButton}>
                                <MenuIcon></MenuIcon>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>Player</Typography >
                            <div className={classes.search} style={{ marginRight: "1rem" }}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <IconButton>
                                <AccountCircle></AccountCircle>
                            </IconButton>
                        </ToolBar>
                    </AppBar>
                </header>
                <Container>
                </Container>
            </div>
        </ThemeProvider>

    )
}