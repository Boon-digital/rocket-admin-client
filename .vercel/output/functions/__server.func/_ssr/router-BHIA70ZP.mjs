import { D as redirect } from "../_chunks/_libs/@tanstack/router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { b as QueryClient } from "../_chunks/_libs/@tanstack/query-core.mjs";
import { Q as QueryClientProvider } from "../_chunks/_libs/@tanstack/react-query.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/main-BrP_S2L6.css";
const appBranding = {
  appName: "Miceflow Admin",
  appTitle: "Miceflow Admin",
  footerText: "Miceflow Admin v2.0.1",
  logoLight: "/mice_logo_lightmode.svg",
  logoDark: "/miceflow_logo_darkmode.svg"
};
const defaultRoute = "/bookings";
const primaryColors = {
  blue: "hsl(221.2 83.2% 53.3%)",
  green: "hsl(142.1 76.2% 36.3%)",
  red: "hsl(0 84.2% 60.2%)",
  purple: "hsl(262.1 83.3% 57.8%)",
  orange: "hsl(24.6 95% 53.1%)",
  pink: "hsl(326.1 100% 74.4%)",
  teal: "hsl(181 40.6% 56.5%)",
  // #63BCBD
  black: "hsl(0 0% 9%)"
};
const useSettingsStore = create()(
  persist(
    (set) => ({
      theme: "light",
      language: "en",
      primaryColor: "blue",
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }))
    }),
    {
      name: "settings-storage"
    }
  )
);
function ThemeProvider({ children }) {
  const { theme, primaryColor } = useSettingsStore();
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    const color = primaryColors[primaryColor];
    const hslValue = color.replace("hsl(", "").replace(")", "");
    root.style.setProperty("--primary", hslValue);
    root.style.setProperty("--ring", hslValue);
  }, [primaryColor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60,
      refetchOnWindowFocus: false
    }
  }
});
const Route$f = createRootRoute({
  notFoundComponent: () => null,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: appBranding.appTitle }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "flex h-screen w-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "bottom-right" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$e = () => import("./login-S3sZxJ6L.mjs");
const Route$e = createFileRoute("/login")({
  beforeLoad: async () => {
    try {
      const res = await fetch("/auth/me", {
        credentials: "include"
      });
      if (res.ok) throw redirect({
        to: "/"
      });
    } catch (err) {
      if (err?.isRedirect) throw err;
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./_authenticated-Bju-RnlD.mjs");
const Route$d = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    try {
      const res = await fetch("/auth/me", {
        credentials: "include"
      });
      if (!res.ok) throw redirect({
        to: "/login"
      });
    } catch (err) {
      if (err?.isRedirect) throw err;
      throw redirect({
        to: "/login"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-BTU5dmpx.mjs");
const Route$c = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: defaultRoute,
      search: {
        id: void 0
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./_authenticated.tasks-DBM3aBv8.mjs");
const Route$b = createFileRoute("/_authenticated/tasks")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./_authenticated.stays-Bn-6JOwm.mjs");
const Route$a = createFileRoute("/_authenticated/stays")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  validateSearch: (search) => ({
    id: search.id || void 0
  })
});
const $$splitComponentImporter$9 = () => import("./_authenticated.servers-BTU5dmpx.mjs");
const Route$9 = createFileRoute("/_authenticated/servers")({
  beforeLoad: () => {
    throw redirect({
      to: "/companies",
      search: {
        id: void 0
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./_authenticated.pages-4cwWsEOZ.mjs");
const Route$8 = createFileRoute("/_authenticated/pages")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./_authenticated.inbox-kShTOqFI.mjs");
const Route$7 = createFileRoute("/_authenticated/inbox")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./_authenticated.hotels-D5sfmrZy.mjs");
const Route$6 = createFileRoute("/_authenticated/hotels")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  validateSearch: (search) => ({
    id: search.id || void 0
  })
});
const $$splitComponentImporter$5 = () => import("./_authenticated.domains-BTU5dmpx.mjs");
const Route$5 = createFileRoute("/_authenticated/domains")({
  beforeLoad: () => {
    throw redirect({
      to: "/hotels",
      search: {
        id: void 0
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./_authenticated.dashboard-eSMqgRh1.mjs");
const Route$4 = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./_authenticated.customers-BTU5dmpx.mjs");
const Route$3 = createFileRoute("/_authenticated/customers")({
  beforeLoad: () => {
    throw redirect({
      to: "/contacts",
      search: {
        id: void 0
      }
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./_authenticated.contacts-D9J1IVur.mjs");
const Route$2 = createFileRoute("/_authenticated/contacts")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  validateSearch: (search) => ({
    id: search.id || void 0
  })
});
const $$splitComponentImporter$1 = () => import("./_authenticated.companies-B5bVQvBW.mjs");
const Route$1 = createFileRoute("/_authenticated/companies")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (search) => ({
    id: search.id || void 0
  })
});
const $$splitComponentImporter = () => import("./_authenticated.bookings-C0yXKyzN.mjs");
const Route = createFileRoute("/_authenticated/bookings")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  validateSearch: (search) => ({
    id: search.id || void 0
  })
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$f
});
const AuthenticatedRoute = Route$d.update({
  id: "/_authenticated",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const AuthenticatedTasksRoute = Route$b.update({
  id: "/tasks",
  path: "/tasks",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedStaysRoute = Route$a.update({
  id: "/stays",
  path: "/stays",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedServersRoute = Route$9.update({
  id: "/servers",
  path: "/servers",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedPagesRoute = Route$8.update({
  id: "/pages",
  path: "/pages",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedInboxRoute = Route$7.update({
  id: "/inbox",
  path: "/inbox",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedHotelsRoute = Route$6.update({
  id: "/hotels",
  path: "/hotels",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedDomainsRoute = Route$5.update({
  id: "/domains",
  path: "/domains",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedDashboardRoute = Route$4.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedCustomersRoute = Route$3.update({
  id: "/customers",
  path: "/customers",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedContactsRoute = Route$2.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedCompaniesRoute = Route$1.update({
  id: "/companies",
  path: "/companies",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedBookingsRoute = Route.update({
  id: "/bookings",
  path: "/bookings",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedRouteChildren = {
  AuthenticatedBookingsRoute,
  AuthenticatedCompaniesRoute,
  AuthenticatedContactsRoute,
  AuthenticatedCustomersRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedDomainsRoute,
  AuthenticatedHotelsRoute,
  AuthenticatedInboxRoute,
  AuthenticatedPagesRoute,
  AuthenticatedServersRoute,
  AuthenticatedStaysRoute,
  AuthenticatedTasksRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$a as R,
  ThemeProvider as T,
  appBranding as a,
  Route$6 as b,
  Route$2 as c,
  Route$1 as d,
  Route as e,
  primaryColors as p,
  router as r,
  useSettingsStore as u
};
