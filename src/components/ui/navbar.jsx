import {Link, NavLink} from "react-router-dom";
import {Button, buttonVariants} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useTheme} from "@/hooks/useTheme";
import {useTransactions} from "@/hooks/useTransactions";

const navLinks = [
  {to: "/", label: "Dashboard", end: true},
  {to: "/summary", label: "Summary", end: false},
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { resetTransactions } = useTransactions();

  function handleReset() {
    const confirmed = window.confirm(
      "Clear all transactions? This can't be undone."
    );
    if (confirmed) resetTransactions();
  }

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

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon" aria-label="Settings menu" />}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              className="border border-border bg-popover text-popover-foreground"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link to="/about" />}>About</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleReset}>
                Reset transactions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink to="/addTransaction" className={buttonVariants({ size: "sm" })}>
            Add transaction
          </NavLink>
        </div>
      </div>
    </nav>
  );
}