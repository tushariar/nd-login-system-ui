import { Home, Package2 } from 'lucide-react';
import Link from 'next/link';
import MenuItem from './MenuItem';

export function DesktopMenus() {
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <MenuItem href="/dashboard">
                <Home className="h-4 w-4" />
                Dashboard
            </MenuItem>
        </nav>
    );
}

export function MobileMenus() {
    return (
        <nav className="grid gap-2 text-lg font-medium">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Login System</span>
            </Link>
            <MenuItem href="/dashboard" type="mobile">
                <Home className="h-4 w-4" />
                Dashboard
            </MenuItem>
        </nav>
    );
}