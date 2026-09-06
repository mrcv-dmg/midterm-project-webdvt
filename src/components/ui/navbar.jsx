import { Link, NavLink } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useTheme } from "@/context/themeContext";
import { useTransactions } from "@/context/transactionContext";

const navLinks = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/summary", label: "Summary", end: false },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { resetTransactions } = useTransactions();

  function handleReset() {
    const confirmed = window.confirm(
      "Reset all transactions? This can't be undone."
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
              )
            )
          }
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="capsule" aria-label="Settings menu" />}
            >
              Options
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
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