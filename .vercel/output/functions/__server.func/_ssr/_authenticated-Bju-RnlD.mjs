import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { O as Outlet, u as useRouterState, L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { s, a as s$1, n, c, p, m, b as n$1, d as n$2, e as s$2, f as s$3, g as n$3, h as c$1 } from "../_chunks/_libs/@phosphor-icons/react.mjs";
import { I as Image } from "../_chunks/_libs/@unpic/react.mjs";
import { a as appBranding, u as useSettingsStore, p as primaryColors } from "./router-BHIA70ZP.mjs";
import { u as useQuery } from "../_chunks/_libs/@tanstack/react-query.mjs";
import { u as useAuthStore, g as getEnabledEntities, D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, L as Label, e as DropdownMenuItem } from "./registry-BwWllmLA.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { B as Button } from "./button-CsifgKN3.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { P as Provider, R as Root3, T as Trigger, a as Portal, C as Content2, A as Arrow2 } from "../_chunks/_libs/@radix-ui/react-tooltip.mjs";
import { S as Slot } from "../_chunks/_libs/@radix-ui/react-slot.mjs";
import { R as Root, F as Fallback } from "../_chunks/_libs/@radix-ui/react-avatar.mjs";
import { R as Root$1, T as Thumb } from "../_chunks/_libs/@radix-ui/react-switch.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_chunks/_libs/@unpic/core.mjs";
import "../_libs/unpic.mjs";
import "../_chunks/_libs/@tanstack/query-core.mjs";
import "../_libs/sonner.mjs";
import "../_libs/zustand.mjs";
import "../_chunks/_libs/@radix-ui/react-dropdown-menu.mjs";
import "../_chunks/_libs/@radix-ui/primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
import "../_chunks/_libs/@radix-ui/react-context.mjs";
import "../_chunks/_libs/@radix-ui/react-use-controllable-state.mjs";
import "../_chunks/_libs/@radix-ui/react-use-layout-effect.mjs";
import "../_chunks/_libs/@radix-ui/react-primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-menu.mjs";
import "../_chunks/_libs/@radix-ui/react-collection.mjs";
import "../_chunks/_libs/@radix-ui/react-direction.mjs";
import "../_chunks/_libs/@radix-ui/react-dismissable-layer.mjs";
import "../_chunks/_libs/@radix-ui/react-use-callback-ref.mjs";
import "../_chunks/_libs/@radix-ui/react-use-escape-keydown.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-guards.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-scope.mjs";
import "../_chunks/_libs/@radix-ui/react-popper.mjs";
import "../_chunks/_libs/@floating-ui/react-dom.mjs";
import "../_chunks/_libs/@floating-ui/dom.mjs";
import "../_chunks/_libs/@floating-ui/core.mjs";
import "../_chunks/_libs/@floating-ui/utils.mjs";
import "../_chunks/_libs/@radix-ui/react-arrow.mjs";
import "../_chunks/_libs/@radix-ui/react-use-size.mjs";
import "../_chunks/_libs/@radix-ui/react-portal.mjs";
import "../_chunks/_libs/@radix-ui/react-presence.mjs";
import "../_chunks/_libs/@radix-ui/react-roving-focus.mjs";
import "../_chunks/_libs/@radix-ui/react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_chunks/_libs/@radix-ui/react-label.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_chunks/_libs/@radix-ui/react-visually-hidden.mjs";
import "../_chunks/_libs/@radix-ui/react-use-is-hydrated.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_chunks/_libs/@radix-ui/react-use-previous.mjs";
function CompanyLogo() {
  const { theme } = useSettingsStore();
  const logoSrc = theme === "dark" ? appBranding.logoDark : appBranding.logoLight;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Image,
    {
      src: logoSrc,
      alt: "Company Logo",
      width: 40,
      height: 40,
      className: "h-10 w-10"
    }
  ) });
}
async function fetchCurrentUser() {
  const res = await fetch("/auth/me", { credentials: "include" });
  if (!res.ok) throw new Error("Unauthenticated");
  return res.json();
}
function useAuth() {
  const setUser = useAuthStore((s2) => s2.setUser);
  const user = useAuthStore((s2) => s2.user);
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const data = await fetchCurrentUser();
      setUser(data);
      return data;
    },
    retry: false,
    staleTime: 1e3 * 60 * 5
    // 5 minutes
  });
  return {
    user,
    isLoading: query.isLoading,
    isAuthenticated: query.isSuccess,
    isUnauthenticated: query.isError
  };
}
async function logout() {
  await fetch("/auth/logout", { method: "POST", credentials: "include" });
  useAuthStore.getState().setUser(null);
  window.location.href = "/login";
}
function Avatar({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      "data-size": size,
      className: cn(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs",
        className
      ),
      ...props
    }
  );
}
function Switch({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "switch",
      "data-size": size,
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const colorNames = {
  blue: "Blue",
  green: "Green",
  red: "Red",
  purple: "Purple",
  orange: "Orange",
  pink: "Pink",
  teal: "Teal",
  black: "Black"
};
function getInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n2) => n2[0].toUpperCase()).join("");
}
function UserAvatar({ user, isCollapsed }) {
  const initials = getInitials(user.name);
  const { theme, primaryColor, setTheme, setPrimaryColor } = useSettingsStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: `w-full overflow-hidden text-nowrap ${isCollapsed ? "justify-center" : "justify-start"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-4 w-4 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-[9px]", children: initials }) }),
          !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 truncate", children: user.name })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { side: "right", align: "end", className: "w-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuLabel, { className: "font-normal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-2 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(s$2, { className: "h-4 w-4", weight: "light" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s$3, { className: "h-4 w-4", weight: "light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "avatar-dark-mode", className: "cursor-pointer font-normal", children: "Dark mode" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "avatar-dark-mode",
            checked: theme === "dark",
            onCheckedChange: (checked) => setTheme(checked ? "dark" : "light")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n$3, { className: "h-4 w-4", weight: "light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Primary color" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.keys(primaryColors).map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            title: colorNames[color],
            onClick: () => setPrimaryColor(color),
            className: `h-5 w-5 rounded-sm transition-transform hover:scale-110 ${primaryColor === color ? "ring-2 ring-offset-1 ring-foreground" : ""}`,
            style: { backgroundColor: primaryColors[color] }
          },
          color
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: logout, className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(c$1, { className: "mr-2 h-4 w-4" }),
        "Log out"
      ] })
    ] })
  ] });
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_WIDTH = "14rem";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children
}) {
  const [_open, _setOpen] = reactExports.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = reactExports.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );
  const state = open ? "expanded" : "collapsed";
  const contextValue = reactExports.useMemo(
    () => ({
      state,
      open,
      setOpen
    }),
    [state, open, setOpen]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children }) });
}
function Sidebar({
  className,
  children,
  ...props
}) {
  const { state } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      "data-state": state,
      style: { "--sidebar-width": SIDEBAR_WIDTH },
      className: cn(
        "bg-sidebar text-sidebar-foreground flex h-full flex-col border-r transition-[width] duration-600 ease-[cubic-bezier(0.4,0,0.6,1)]",
        state === "expanded" ? "w-(--sidebar-width)" : "w-[68px]",
        className
      ),
      ...props,
      children
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-auto p-4 group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { state } = useSidebar();
  const button = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed",
        ...tooltip
      }
    )
  ] });
}
const iconMap = {
  Users: n$2,
  Globe: n$1,
  Buildings: m,
  BuildingApartment: p,
  BookOpen: c,
  Bed: n
};
const menuItems = getEnabledEntities().map((entity) => ({
  title: entity.namePlural,
  url: entity.route,
  icon: iconMap[entity.icon] ?? n$1
}));
function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const pathname = useRouterState({ select: (s2) => s2.location.pathname });
  const { user } = useAuth();
  const handleToggle = () => {
    if (isCollapsed) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const isCollapsed = state === "collapsed";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarHeader, { className: "flex-row items-center justify-between overflow-hidden", children: [
      !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyLogo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          onClick: handleToggle,
          children: isCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(s, { className: "h-4 w-4", weight: "light" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s$1, { className: "h-4 w-4", weight: "light" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { children: menuItems.map((item, index) => {
      if ("type" in item && item.type === "separator") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" }, `separator-${index}`);
      }
      const Icon = item.icon;
      const isActive = pathname.startsWith(item.url);
      const button = /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
        !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
      ] }) });
      if (!isCollapsed) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: button }, item.title);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "right", children: item.title })
      ] }, item.title);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarFooter, { children: [
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { user, isCollapsed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 px-4 py-2 text-xs text-muted-foreground text-nowrap", children: !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: appBranding.footerText }) })
    ] })
  ] });
}
function AuthenticatedLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  AuthenticatedLayout as component
};
