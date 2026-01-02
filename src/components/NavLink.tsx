import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive }) =>
          cn(
            // base style (Netflix)
            "relative text-sm transition-colors",
            isActive
              ? "text-white font-semibold"
              : "text-gray-300 hover:text-white",
            className
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <>
            {props.children}

            {/* Netflix underline */}
            {isActive && (
              <span
                className="
                  absolute -bottom-2 left-0 right-0
                  h-[2px] bg-[#E50914]
                  rounded-full
                "
              />
            )}
          </>
        )}
      </RouterNavLink>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
