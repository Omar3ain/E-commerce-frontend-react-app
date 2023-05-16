import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CategoryFilter from './CategoryFilter'
const drawerWidth = 150;

export default function Filters() {

    return (
        <>
            <List
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,   
                    padding:1,
                }}
                variant="permanent"
                anchor="left"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Filters
                    </ListSubheader>
                }
                >
                <CategoryFilter/>
            </List>
        </>
    );
}

