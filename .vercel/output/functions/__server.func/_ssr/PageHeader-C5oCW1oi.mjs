import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { e as useMatches, L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { X as n, I as s } from "../_chunks/_libs/@phosphor-icons/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { S as Slot } from "../_chunks/_libs/@radix-ui/react-slot.mjs";
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(s, { weight: "light" })
    }
  );
}
function DynamicBreadcrumb() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const pathname = currentMatch?.pathname || "/";
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const formattedLabel = segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return {
      path,
      label: formattedLabel
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(n, { className: "h-4 w-4", weight: "light" }) }) }) }),
    breadcrumbs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: index === breadcrumbs.length - 1 ? (
        // Last item is the current page (not clickable)
        /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { children: crumb.label })
      ) : (
        // Other items are clickable links
        /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: crumb.path, children: crumb.label }) })
      ) })
    ] }, crumb.path)) })
  ] }) });
}
function PageHeader({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-16 shrink-0 items-center gap-4 px-6 justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicBreadcrumb, {}),
    children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children })
  ] });
}
export {
  PageHeader as P
};
