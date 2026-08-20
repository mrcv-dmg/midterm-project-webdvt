import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/summary", label: "Summary", end: false },
];

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
      <NavLink to="/" className="font-heading text-lg font-semibold tracking-tight">
        Personal Budget Tracker
      </NavLink>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
        <div className="flex items-center gap-4 font-sans text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/addTransaction" className={buttonVariants({ size: "sm" })}>
          Add transaction
        </NavLink>
      </div>
    </nav>
  );
}