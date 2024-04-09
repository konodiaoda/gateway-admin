import React from "react"
import {Menu} from "@/layout/MenuList/types";
import {Divider, List, Typography, useTheme} from "@mui/material";

export interface NavGroupProps {
    item: Menu
}

export const NavGroup = ({item}: NavGroupProps) => {
    const theme = useTheme();
    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <></>
            case 'item':
                return <></>
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (<>
        <List
            subheader={
                item.title && (
                    <Typography variant="caption" sx={{...theme.typography.menuCaption}} display="block" gutterBottom>
                        {item.title}
                        {item.caption && (
                            <Typography variant="caption" sx={{...theme.typography.subMenuCaption}} display="block"
                                        gutterBottom>
                                {item.caption}
                            </Typography>
                        )}
                    </Typography>
                )
            }
        >
            {items}
        </List>
        {/* group divider */}
        <Divider sx={{mt: 0.25, mb: 1.25}}/>
    </>)
}