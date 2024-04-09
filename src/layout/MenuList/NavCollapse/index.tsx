import React, {useState} from "react"
import {Menu, MenuItem} from "@/layout/MenuList/types";
import {Icon, ListItemButton, Typography} from "@mui/material";
import {useCustomSettingStore} from "@/stores/customSettingStore";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export interface NavCollapseProps {
    menu: MenuItem
    level: number
}

const NavCollapse = ({menu, level}: NavCollapseProps) => {

    const [isOpen, borderRadius] = useCustomSettingStore((state) =>
        [
            state.isOpen,
            state.borderRadius
        ])
    const [selected, setSelected] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    }

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1}/>;
            case 'item':
                return <></>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = Icon ? (
        <Icon strokeWidth={1.5} size="1.3rem" style={{marginTop: 'auto', marginBottom: 'auto'}}/>
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (<>
        <ListItemButton
            sx={{
                borderRadius: `${borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={selected === menu.id}
            onClick={handleClick}
        >
        </ListItemButton>
    </>)
}