import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { B as Button } from "./button-CsifgKN3.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { T as ThemeProvider, u as useSettingsStore, a as appBranding } from "./router-BHIA70ZP.mjs";
import { R as Root } from "../_chunks/_libs/@radix-ui/react-separator.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_chunks/_libs/@radix-ui/react-slot.mjs";
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/@tanstack/react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_chunks/_libs/@tanstack/query-core.mjs";
import "../_chunks/_libs/@tanstack/react-query.mjs";
import "../_libs/sonner.mjs";
import "../_libs/zustand.mjs";
import "../_chunks/_libs/@radix-ui/react-primitive.mjs";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function MicrosoftIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 21 21", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "1", width: "9", height: "9", fill: "#F25022" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "11", y: "1", width: "9", height: "9", fill: "#7FBA00" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "11", width: "9", height: "9", fill: "#00A4EF" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "11", y: "11", width: "9", height: "9", fill: "#FFB900" })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z", fill: "#FBBC05" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
  ] });
}
function LoginPanel() {
  const theme = useSettingsStore((s) => s.theme);
  const logo = theme === "dark" ? appBranding.logoDark : appBranding.logoDark;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-8 left-8 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: appBranding.appName, className: "h-8 w-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-1/2 h-full relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/newyorkithink.webp", alt: "", className: "w-full h-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full flex items-center justify-center px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight text-center", children: "Sign in to Miceflow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Use your organisation account to continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/auth/microsoft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MicrosoftIcon, {}),
          "Continue with Microsoft"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/auth/google", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
          "Continue with Google"
        ] }) })
      ] })
    ] }) })
  ] });
}
function LoginPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen w-screen overflow-hidden bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPanel, {}) }) });
}
export {
  LoginPage as component
};
