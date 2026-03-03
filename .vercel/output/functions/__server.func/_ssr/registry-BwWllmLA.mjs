import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { c as create } from "../_libs/zustand.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, L as Label2, S as Separator2, I as Item2 } from "../_chunks/_libs/@radix-ui/react-dropdown-menu.mjs";
import { R as Root } from "../_chunks/_libs/@radix-ui/react-label.mjs";
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      className: cn("h-fit", className),
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Label2,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator2,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const entityRegistry = {
  bookings: {
    name: "Booking",
    namePlural: "Bookings",
    icon: "BookOpen",
    route: "/bookings",
    idField: "_id",
    idFormat: "mongodb",
    jsonFile: "BOOKINGS_MOCKDATA.json",
    searchFields: [
      "confirmationNo",
      "bookerName",
      "companyName",
      "costCentre",
      "staySummaries.hotelName",
      "staySummaries.guestNames",
      "notes"
    ],
    enabled: true,
    description: "Manage travel bookings",
    order: 1
  },
  stays: {
    name: "Stay",
    namePlural: "Stays",
    icon: "Bed",
    route: "/stays",
    idField: "_id",
    idFormat: "mongodb",
    jsonFile: "STAY_MOCKDATA.json",
    searchFields: [
      "hotelName",
      "hotelConfirmationNo",
      "confirmationNo",
      "roomType",
      "status",
      "reference",
      "guestNames"
    ],
    enabled: true,
    description: "Manage individual hotel stays",
    order: 2,
    // Stays are denormalized into bookings.staySummaries — invalidate bookings cache on any stay write
    invalidatesOnWrite: ["bookings"]
  },
  hotels: {
    name: "Hotel",
    namePlural: "Hotels",
    icon: "BuildingApartment",
    route: "/hotels",
    idField: "_id",
    idFormat: "mongodb",
    jsonFile: "HOTEL_MOCKDATA.json",
    searchFields: ["name", "city", "country", "email"],
    enabled: true,
    description: "Manage hotel partners",
    order: 3
  },
  companies: {
    name: "Client",
    namePlural: "Clients",
    icon: "Buildings",
    route: "/companies",
    idField: "_id",
    idFormat: "mongodb",
    jsonFile: "COMPANIES_MOCKDATA.json",
    searchFields: ["name", "city", "country", "address"],
    enabled: true,
    description: "Manage client accounts",
    order: 4
  },
  contacts: {
    name: "Contact",
    namePlural: "Contacts",
    icon: "Users",
    route: "/contacts",
    idField: "_id",
    idFormat: "mongodb",
    jsonFile: "CONTACT_MOCKDATA.json",
    searchFields: [
      "general.firstName",
      "general.lastName",
      "general.email",
      "general.phone",
      "general.role"
    ],
    enabled: true,
    description: "Manage booker contacts and their details",
    order: 5
  }
};
function getEnabledEntities() {
  return Object.values(entityRegistry).filter((entity) => entity.enabled).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
export {
  DropdownMenu as D,
  Label as L,
  DropdownMenuTrigger as a,
  DropdownMenuContent as b,
  DropdownMenuLabel as c,
  DropdownMenuSeparator as d,
  DropdownMenuItem as e,
  entityRegistry as f,
  getEnabledEntities as g,
  useAuthStore as u
};
