import {
    Camera,
    House,
    type Icon,
    LibraryBig,
    MonitorIcon,
    User,
} from "lucide-svelte";

type MenuItem = {
    id: string;
    label: string;
    icon?: {
        component: typeof Icon;
        props?: Record<string, string | number | boolean>;
    };
    href: string;
};

/** The icons for the menu items */
const icons: Record<string, MenuItem["icon"]> = {
    homeIcon: {
        component: House,
        props: {
            size: 32,
        },
    },
    aboutIcon: {
        component: User,
        props: {
            size: 32,
        },
    },
    projectsIcon: {
        component: MonitorIcon,
        props: {
            size: 32,
        },
    },
    skillsIcon: {
        component: LibraryBig,
        props: {
            size: 32,
        },
    },
    cameraIcon: {
        component: Camera,
        props: {
            size: 32,
        },
    },
};

/**
 * The various different menu items for navigating the portfolio
 */
export const menuItems: MenuItem[] = [
    { id: "1", label: "Home", icon: icons["homeIcon"], href: "/" },
    { id: "2", label: "About", icon: icons["aboutIcon"], href: "/test" },
    { id: "3", label: "Projects", icon: icons["projectsIcon"], href: "/foo" },
    { id: "4", label: "Skills", icon: icons["skillsIcon"], href: "/" },
    { id: "5", label: "Photos", icon: icons["cameraIcon"], href: "/" },
];
