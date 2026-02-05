import { NavLink, Outlet, useLocation } from "react-router";
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
const renderItem: RenderItemFunction = (item, key, _index, _level, location) => {
    if (!isNavigationLink(item)) {
        return null;
    }

    const { label, linkProps, additionalProps } = item;
    const isRouteActive = location === linkProps.to;

    return (
        <li key={key}>
            <NavLink
                {...linkProps}
                {...additionalProps}
                style={({ isActive }) => (isActive || isRouteActive) ? navItemActiveStyle : navItemStyle}
            >
                {label}
            </NavLink>
        </li>
    );
};

// Signature: (elements, key, index, level) => ReactNode
const renderSection: RenderSectionFunction = (elements, key) => (
    <ul key={key} style={navListStyle}>
        {elements}
    </ul>
);

export function RootLayout() {
    const location = useLocation();
    const navigationItems = useNavigationItems();
    const navigationElements = useRenderedNavigationItems(
        navigationItems,
        renderItem,
        renderSection,
        location.pathname as unknown as never
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
