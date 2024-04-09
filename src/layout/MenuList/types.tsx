import {TablerIconsProps} from "@tabler/icons-react";
import * as  allIcons from '@tabler/icons-react';

type  MenuTypes = 'group' | 'collapse' | 'item'

export interface Menu {
    id: string,
    title?: string
    caption?: string,
    type: MenuTypes,
    children: MenuItem[]
}

export interface MenuItem {
    id: string,
    url?: string
    title?: string
    caption?: string,
    type?: MenuTypes,
    icon?: (props: TablerIconsProps) => JSX.Element;
    target?: boolean | string
    external?: boolean
    breadcrumbs?: boolean
    children?: MenuItem[]
}

export const menuItems: Menu[] = [{
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: allIcons["IconDashboard"],
            breadcrumbs: false
        }
    ]
}, {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: allIcons["IconKey"],
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
}, {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/utils/util-typography',
            icon: allIcons["IconTypography"],
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: allIcons["IconPalette"],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: allIcons["IconShadow"],
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: allIcons["IconWindmill"],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    external: true,
                    target: '_blank',
                    url: 'https://mui.com/material-ui/material-icons/',
                    breadcrumbs: false
                }
            ]
        }
    ]
}, {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: allIcons["IconBrandChrome"],
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: allIcons["IconHelp"],
            external: true,
            target: true
        }
    ]
}
]

