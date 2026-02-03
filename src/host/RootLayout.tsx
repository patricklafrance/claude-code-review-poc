import { Link, Outlet, useLocation } from "react-router";
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

interface RenderContext {
    pathname: string;
}

const renderItem: RenderItemFunction<RenderContext> = (item, key, context) => {
    if (!isNavigationLink(item)) {
        return null;
    }

    const { label, linkProps, additionalProps } = item;
    const pathname = context?.pathname ?? "/";
    const to = linkProps.to as string;
    const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));

    return (
        <li key={key}>
            <Link
                {...linkProps}
                {...additionalProps}
                style={isActive ? navItemActiveStyle : navItemStyle}
            >
                {label}
            </Link>
        </li>
    );
};

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
        { pathname: location.pathname }
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

