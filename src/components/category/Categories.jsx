import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 150;

export default function Categories() {

    return (
        <>
            <List
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,   
                }}
                variant="permanent"
                anchor="left"
                >
                {['category 1', 'category 2', 'category 3'].map((cat, index) => (
                    <ListItem key={cat} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={cat} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

