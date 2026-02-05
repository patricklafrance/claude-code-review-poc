import { NavLink, Outlet } from "react-router";
import {
    useNavigationItems,
    useRenderedNavigationItems,
    isNavigationLink,
    type RenderItemFunction,
    type RenderSectionFunction
} from "@squide/firefly";
import {
    navStyle,
    navListStyle,
    navItemStyle,
    navItemActiveStyle
} from "../shared/styles.ts";

// Signature: (item, key, index, level) => ReactNode
const renderItem: RenderItemFunction = (item, key) => {
    if (!isNavigationLink(item)) {
        return null;
    }

    const { label, linkProps, additionalProps } = item;

    return (
        <li key={key}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                style={({ isActive }) => isActive ? navItemActiveStyle : navItemStyle}
            >
                {label}
            </NavLink>
        </li>
    );
};

// Signature: (elements, key, index, level) => ReactNode
const renderSection: RenderSectionFunction = (elements, key, _index, _level, collapsed) => (
    <ul key={key} style={navListStyle}>
        {collapsed ? null : elements}
    </ul>
);

export function RootLayout() {
    const navigationItems = useNavigationItems();
    const navigationElements = useRenderedNavigationItems(
        navigationItems,
        renderItem,
        renderSection,
        { collapsed: false } as unknown as never
    );

    return (
        <>
            <nav style={navStyle}>
                {navigationElements}
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}
