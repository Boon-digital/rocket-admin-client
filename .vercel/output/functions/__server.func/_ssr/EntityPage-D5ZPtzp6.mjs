import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { d as useNavigate } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_chunks/_libs/@tanstack/react-query.mjs";
import { i as n, j as f, k as i, l as s, o as s$1, q as n$1, r as a, t as m, u as n$2, v as m$1, w as n$3, x as n$4, y as s$2, z as s$3, A as s$4, B as l, C as w, D as s$5, E as c, F as p, G as s$6, H as s$7, I as s$8, J as m$2, K as s$9, L as s$a, M as c$1, n as n$5, N as m$3, O as m$4, P as s$b, g as n$6, e as s$c, f as s$d, Q as s$e, R as c$2, S as n$7, T as s$f, U as s$g, V as c$3, W as m$5, X as n$8, Y as c$4, Z as i$1, p as p$1, m as m$6, b as n$9, d as n$a, _ as s$h, $ as n$b, a0 as n$c, a1 as p$2, a2 as s$i, a3 as c$5, a4 as p$3, a5 as s$j, a6 as m$7, a7 as m$8, a8 as m$9, a9 as n$d, s as s$k, a as s$l } from "../_chunks/_libs/@phosphor-icons/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as entityRegistry, D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, e as DropdownMenuItem, d as DropdownMenuSeparator, u as useAuthStore, L as Label } from "./registry-BwWllmLA.mjs";
import { B as Button, b as buttonVariants } from "./button-CsifgKN3.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { p as pdf, S as StyleSheet } from "../_chunks/_libs/@react-pdf/renderer.mjs";
import { u as useReactTable, f as flexRender } from "../_chunks/_libs/@tanstack/react-table.mjs";
import { f as useSensors, h as useSensor, D as DndContext, i as closestCenter, j as KeyboardSensor, P as PointerSensor } from "../_chunks/_libs/@dnd-kit/core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, a as arrayMove, s as sortableKeyboardCoordinates, u as useSortable } from "../_chunks/_libs/@dnd-kit/sortable.mjs";
import { C as CSS } from "../_chunks/_libs/@dnd-kit/utilities.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { P as PageHeader } from "./PageHeader-C5oCW1oi.mjs";
import { H as format } from "../_libs/date-fns.mjs";
import { g as getCoreRowModel, a as getSortedRowModel } from "../_chunks/_libs/@tanstack/table-core.mjs";
import { g as getDefaultClassNames, D as DayPicker } from "../_libs/react-day-picker.mjs";
import { D as Document, P as Page, V as View, I as Image, T as Text, L as Link } from "../_chunks/_libs/@react-pdf/primitives.mjs";
import { R as Root2, T as Trigger, I as Icon, V as Value, P as Portal, C as Content2, a as Viewport, b as Item, c as ItemIndicator, d as ItemText, S as ScrollUpButton, e as ScrollDownButton } from "../_chunks/_libs/@radix-ui/react-select.mjs";
import { S as Slot } from "../_chunks/_libs/@radix-ui/react-slot.mjs";
import { R as Root2$1, T as Trigger$1, P as Portal$1, C as Content2$1 } from "../_chunks/_libs/@radix-ui/react-popover.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_chunks/_libs/@radix-ui/react-checkbox.mjs";
import { R as Root, C as Content, a as Close, T as Title, D as Description, P as Portal$2, O as Overlay } from "../_chunks/_libs/@radix-ui/react-dialog.mjs";
function extractEntityId$2(entity) {
  if (typeof entity._id === "object" && "$oid" in entity._id) {
    return entity._id.$oid;
  }
  return String(entity._id);
}
const isServer$4 = typeof window === "undefined";
const origin$4 = isServer$4 ? "http://localhost:3001" : "";
const BASE$4 = `${origin$4}/api/v1/stays`;
async function fetchStaysByIds(ids) {
  if (ids.length === 0) return [];
  const res = await fetch(`${BASE$4}/by-ids?ids=${ids.map(encodeURIComponent).join(",")}`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
async function fetchStaysByHotelId(hotelId) {
  const res = await fetch(`${BASE$4}?hotelId=${encodeURIComponent(hotelId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
async function fetchStaysByGuestId(guestId) {
  const res = await fetch(`${BASE$4}?guestIds=${encodeURIComponent(guestId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
const isServer$3 = typeof window === "undefined";
const origin$3 = isServer$3 ? "http://localhost:3001" : "";
const BASE$3 = `${origin$3}/api/v1/contacts`;
async function fetchContactById(id) {
  const res = await fetch(`${BASE$3}/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
async function fetchContactsByCompanyId(companyId) {
  const res = await fetch(`${BASE$3}?general.companyId=${encodeURIComponent(companyId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
async function fetchContactsByHotelId(hotelId) {
  const res = await fetch(`${BASE$3}?general.hotelId=${encodeURIComponent(hotelId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
async function searchContacts(query) {
  const res = await fetch(`${BASE$3}/search?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
const isServer$2 = typeof window === "undefined";
const origin$2 = isServer$2 ? "http://localhost:3001" : "";
const BASE$2 = `${origin$2}/api/v1/companies`;
async function fetchCompanyById(id) {
  const res = await fetch(`${BASE$2}/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
async function searchCompanies(query) {
  const res = await fetch(`${BASE$2}/search?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
function apiBase(path) {
  const isServer2 = typeof window === "undefined";
  const origin2 = isServer2 ? "http://localhost:3001" : "";
  return `${origin2}${path}`;
}
function makeEntityApi(entityKey) {
  const entry = entityRegistry[entityKey];
  const PATH = `/api/v1${entry.route}`;
  async function fetchById(id) {
    const res = await fetch(apiBase(`${PATH}/${id}`));
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  }
  async function search(query) {
    const res = await fetch(apiBase(`${PATH}/search?q=${encodeURIComponent(query)}&limit=10`));
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  }
  async function create(data) {
    const res = await fetch(apiBase(PATH), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Failed to create ${entityKey}: ${res.status}`);
    const json = await res.json();
    return json.data;
  }
  async function update(id, data) {
    const { _id, ...body } = data;
    const res = await fetch(apiBase(`${PATH}/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Failed to update ${entityKey}: ${res.status}`);
    const json = await res.json();
    return json.data;
  }
  async function remove(id) {
    const res = await fetch(apiBase(`${PATH}/${id}`), {
      method: "DELETE",
      credentials: "include"
    });
    if (!res.ok) throw new Error(`Failed to delete ${entityKey}: ${res.status}`);
  }
  async function fetchAll(params) {
    const qs = new URLSearchParams({
      page: String(params.page + 1),
      pageSize: String(params.pageSize)
    });
    if (params.search) qs.set("search", params.search);
    if (params.sortBy) qs.set("sortBy", params.sortBy);
    if (params.sortOrder) qs.set("sortOrder", params.sortOrder);
    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        qs.set(key, value);
      }
    }
    if (params.dateFilters) {
      for (const [key, range] of Object.entries(params.dateFilters)) {
        qs.set(`${key}[from]`, range.from);
        qs.set(`${key}[to]`, range.to);
      }
    }
    const res = await fetch(apiBase(`${PATH}?${qs}`));
    if (!res.ok) throw new Error(`Failed to fetch ${entityKey}: ${res.status}`);
    const json = await res.json();
    const { data, pagination } = json.data;
    return {
      data,
      pageCount: pagination.totalPages,
      totalRows: pagination.totalItems
    };
  }
  return { fetchById, search, fetchAll, create, update, remove };
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$3, { className: "size-3.5", weight: "light" })
        }
      )
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-slate-50 text-slate-700 border-slate-200 [a&]:hover:bg-slate-100 dark:bg-slate-950/50 dark:text-slate-400 dark:border-slate-800",
        secondary: "bg-gray-50 text-gray-700 border-gray-200 [a&]:hover:bg-gray-100 dark:bg-gray-950/50 dark:text-gray-400 dark:border-gray-800",
        destructive: "bg-red-50 text-red-700 border-red-200 [a&]:hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
        outline: "bg-transparent text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "border-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "border-transparent text-primary underline-offset-4 [a&]:hover:underline",
        // Subtle/soft variants with faint backgrounds and darker borders
        success: "bg-green-50 text-green-700 border-green-200 [a&]:hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200 [a&]:hover:bg-yellow-100 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800",
        info: "bg-blue-50 text-blue-700 border-blue-200 [a&]:hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
        purple: "bg-purple-50 text-purple-700 border-purple-200 [a&]:hover:bg-purple-100 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800",
        pink: "bg-pink-50 text-pink-700 border-pink-200 [a&]:hover:bg-pink-100 dark:bg-pink-950/50 dark:text-pink-400 dark:border-pink-800",
        orange: "bg-orange-50 text-orange-700 border-orange-200 [a&]:hover:bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function getBadgeVariant(value, variantMap, fallback = "default") {
  if (!value) return fallback;
  return variantMap[value.toLowerCase()] || fallback;
}
function TableBadgeCell({
  value,
  displayValue,
  variantMap,
  fallback = "-",
  capitalize = false
}) {
  if (!value) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: fallback });
  }
  const label = displayValue ?? value;
  const text = capitalize ? label.charAt(0).toUpperCase() + label.slice(1).toLowerCase() : label;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getBadgeVariant(value, variantMap), children: text });
}
const iconMap = {
  // Navigation & Actions
  ArrowDown: c,
  ArrowUp: s$5,
  ArrowUpDown: p,
  ArrowsDownUp: p,
  CaretDown: s$3,
  CaretUp: s$6,
  CaretLeft: s$7,
  CaretRight: s$8,
  CaretDoubleLeft: s$l,
  CaretDoubleRight: s$k,
  CaretUpDown: c$1,
  ChevronDown: s$3,
  ChevronUp: s$6,
  ChevronLeft: s$7,
  ChevronRight: s$8,
  ChevronDownIcon: s$3,
  ChevronUpIcon: s$6,
  ChevronLeftIcon: s$7,
  ChevronRightIcon: s$8,
  ChevronsLeft: s$l,
  ChevronsRight: s$k,
  ChevronsUpDown: c$1,
  // Common actions
  Check: n$3,
  X: n$2,
  Plus: n,
  Copy: s$2,
  Edit: a,
  PencilSimple: a,
  Save: m,
  FloppyDisk: m,
  Download: s$1,
  Upload: s$a,
  Search: f,
  SearchIcon: f,
  MagnifyingGlass: f,
  RotateCcw: i,
  ArrowCounterClockwise: i,
  // UI Elements
  MoreHorizontal: n$4,
  DotsThree: n$4,
  GripVertical: m$2,
  DotsSixVertical: m$2,
  Settings: n$d,
  Gear: n$d,
  Settings2: l,
  SlidersHorizontal: l,
  // Files & Documents
  File: s$9,
  FileText: s$h,
  Paperclip: m$9,
  Calendar: s$4,
  CalendarIcon: s$4,
  CalendarArrowUp: m$8,
  CalendarArrowDown: m$7,
  CalendarCheck: s$j,
  CalendarClock: s$j,
  Receipt: p$3,
  // Contact & Communication
  Envelope: c$5,
  Mail: c$5,
  Phone: s$i,
  MapPin: p$2,
  Hash: n$c,
  Tag: n$b,
  Note: s$h,
  // Entities & Buildings
  Users: n$a,
  Globe: n$9,
  Buildings: m$6,
  BuildingApartment: p$1,
  Hotel: p$1,
  Bed: n$5,
  BedDouble: n$5,
  Briefcase: i$1,
  Server: c$4,
  HardDrives: c$4,
  Home: n$8,
  House: n$8,
  // Finance
  CurrencyDollar: m$5,
  CurrencyEur: m$5,
  CircleDollarSign: m$5,
  CreditCard: c$3,
  Percent: s$g,
  // Status & Actions
  Prohibit: s$f,
  Ban: s$f,
  SealCheck: n$7,
  BadgeCheck: n$7,
  ShieldWarning: c$2,
  ShieldAlert: c$2,
  PaperPlaneTilt: m$1,
  SendHorizontal: m$1,
  // Communication
  ChatCircle: s$e,
  MessageSquare: s$e,
  // Theme
  Sun: s$d,
  Moon: s$c,
  Palette: n$6,
  // Status
  Circle: s$b,
  CircleDot: m$4,
  CircleDashed: m$4,
  Loader2: s,
  CircleNotch: s,
  // Text
  AlignLeft: m$3,
  TextAlignLeft: m$3
};
function getIcon(name) {
  return iconMap[name];
}
function getNestedValue$2(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
function accessorProps(key) {
  if (key.includes(".")) {
    return {
      id: key,
      accessorFn: (row) => getNestedValue$2(row, key)
    };
  }
  return { accessorKey: key };
}
function SortableHeader({ column, label, icon }) {
  const sorted = column.getIsSorted();
  const IconComponent = icon ? getIcon(icon) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "ghost",
      className: "!px-0",
      onClick: () => column.toggleSorting(sorted === "asc"),
      children: [
        IconComponent && /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "mr-1.5 h-4 w-4 text-muted-foreground", weight: "light" }),
        label,
        sorted === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(s$5, { className: "ml-2 h-4 w-4 text-primary", weight: "light" }) : sorted === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(c, { className: "ml-2 h-4 w-4 text-primary", weight: "light" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(p, { className: "ml-2 h-4 w-4 text-muted-foreground/50", weight: "light" })
      ]
    }
  );
}
function StaticHeader({ label, icon }) {
  const IconComponent = icon ? getIcon(icon) : null;
  if (!IconComponent) return label;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "h-4 w-4 text-muted-foreground", weight: "light" }),
    label
  ] });
}
function createBadgeColumn({
  accessorKey,
  header,
  variantMap,
  size = 120,
  minSize = 100,
  sortable = true,
  capitalize = false,
  formatValue: formatValue2,
  icon
}) {
  return {
    ...accessorProps(accessorKey),
    header: sortable ? ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHeader, { column, label: header, icon }) : () => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticHeader, { label: header, icon }),
    meta: { label: header },
    cell: ({ row }) => {
      const rawValue = row.getValue(accessorKey);
      const stringValue = rawValue != null ? String(rawValue) : void 0;
      const displayValue = formatValue2 && rawValue != null ? formatValue2(rawValue) : stringValue;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableBadgeCell,
        {
          value: stringValue,
          displayValue,
          variantMap,
          capitalize
        }
      );
    },
    size,
    minSize
  };
}
function createTextColumn({
  accessorKey,
  header,
  size = 200,
  minSize = 150,
  sortable = true,
  bold = false,
  fallback = "-",
  formatValue: formatValue2,
  icon
}) {
  return {
    ...accessorProps(accessorKey),
    header: sortable ? ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHeader, { column, label: header, icon }) : () => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticHeader, { label: header, icon }),
    meta: { label: header },
    cell: ({ row }) => {
      let value = row.getValue(accessorKey);
      if (value !== null && typeof value === "object") {
        value = Object.keys(value).length > 0 ? JSON.stringify(value) : void 0;
      }
      if (formatValue2 && value) {
        value = formatValue2(value);
      }
      const displayValue = value || fallback;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `truncate ${bold ? "font-medium" : ""}`, children: displayValue });
    },
    size,
    minSize
  };
}
function createCountColumn({
  accessorKey,
  header,
  size = 100,
  minSize = 80,
  sortable = true,
  icon,
  itemLabel
}) {
  return {
    ...accessorProps(accessorKey),
    header: sortable ? ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHeader, { column, label: header, icon }) : () => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticHeader, { label: header, icon }),
    meta: { label: header },
    cell: ({ row }) => {
      const value = row.getValue(accessorKey);
      const count = Array.isArray(value) ? value.length : 0;
      if (itemLabel) {
        const label = count === 1 ? itemLabel : `${itemLabel}s`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          count,
          " ",
          label
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm tabular-nums", children: count });
    },
    sortingFn: (rowA, rowB) => {
      const aVal = rowA.getValue(accessorKey);
      const bVal = rowB.getValue(accessorKey);
      const aCount = Array.isArray(aVal) ? aVal.length : 0;
      const bCount = Array.isArray(bVal) ? bVal.length : 0;
      return aCount - bCount;
    },
    size,
    minSize
  };
}
function createDateColumn({
  accessorKey,
  header,
  size = 150,
  minSize = 120,
  sortable = true,
  dateFormat,
  icon
}) {
  return {
    ...accessorProps(accessorKey),
    header: sortable ? ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHeader, { column, label: header, icon }) : () => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticHeader, { label: header, icon }),
    meta: { label: header },
    cell: ({ row }) => {
      const value = row.getValue(accessorKey);
      if (!value) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "-" });
      }
      const date = new Date(value);
      const formatted = dateFormat ? date.toLocaleDateString(void 0, dateFormat) : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "/");
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatted });
    },
    size,
    minSize
  };
}
function selectColumn() {
  return {
    id: "select",
    header: ({ table }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all"
      }
    ),
    cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row"
      }
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 40
  };
}
function actionsColumn(entityName, options) {
  return {
    id: "actions",
    cell: ({ row }) => {
      const entity = row.original;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(n$4, { className: "h-4 w-4", weight: "light" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          options?.onDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: (e) => {
                e.stopPropagation();
                options.onDuplicate(entity);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(s$2, { className: "h-4 w-4 mr-2", weight: "light" }),
                "Duplicate ",
                entityName?.toLowerCase() ?? "item"
              ]
            }
          ),
          options?.onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                className: "text-destructive focus:text-destructive",
                onClick: (e) => {
                  e.stopPropagation();
                  options.onDelete(entity);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(n$1, { className: "h-4 w-4 mr-2", weight: "light" }),
                  "Delete ",
                  entityName?.toLowerCase() ?? "item"
                ]
              }
            )
          ] })
        ] })
      ] });
    },
    size: 60,
    minSize: 60,
    maxSize: 60
  };
}
function tableColumnToColumnDef(col) {
  const type = col.type ?? "text";
  if (type === "badge") {
    const badgeCol = col;
    return createBadgeColumn({
      accessorKey: badgeCol.key,
      header: badgeCol.label,
      variantMap: badgeCol.variantMap,
      ...badgeCol.size !== void 0 && { size: badgeCol.size },
      ...badgeCol.minSize !== void 0 && { minSize: badgeCol.minSize },
      sortable: badgeCol.sortable ?? true,
      capitalize: badgeCol.capitalize,
      formatValue: badgeCol.badgeLabels ? (value) => badgeCol.badgeLabels[value] ?? value : void 0,
      icon: badgeCol.icon
    });
  }
  if (type === "date") {
    return createDateColumn({
      accessorKey: col.key,
      header: col.label,
      ...col.size !== void 0 && { size: col.size },
      ...col.minSize !== void 0 && { minSize: col.minSize },
      sortable: col.sortable ?? true,
      icon: col.icon
    });
  }
  if (type === "count") {
    const countCol = col;
    return createCountColumn({
      accessorKey: countCol.key,
      header: countCol.label,
      ...countCol.size !== void 0 && { size: countCol.size },
      ...countCol.minSize !== void 0 && { minSize: countCol.minSize },
      sortable: countCol.sortable ?? true,
      icon: countCol.icon,
      itemLabel: countCol.itemLabel
    });
  }
  if (type === "custom") {
    const customCol = col;
    const sortable = customCol.sortable ?? false;
    return {
      ...accessorProps(customCol.key),
      header: sortable ? ({ column }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHeader, { column, label: customCol.label, icon: customCol.icon }) : () => /* @__PURE__ */ jsxRuntimeExports.jsx(StaticHeader, { label: customCol.label, icon: customCol.icon }),
      meta: { label: customCol.label },
      cell: ({ row }) => customCol.cell(row.original),
      enableSorting: sortable,
      ...customCol.sortingFn && { sortingFn: customCol.sortingFn },
      ...customCol.size !== void 0 && { size: customCol.size },
      ...customCol.minSize !== void 0 && { minSize: customCol.minSize }
    };
  }
  const textCol = col;
  return createTextColumn({
    accessorKey: textCol.key,
    header: textCol.label,
    ...textCol.size !== void 0 && { size: textCol.size },
    ...textCol.minSize !== void 0 && { minSize: textCol.minSize },
    sortable: textCol.sortable ?? true,
    bold: textCol.bold,
    formatValue: textCol.formatValue,
    icon: textCol.icon
  });
}
function columnsFromConfig(config, options) {
  const columns = options?.showSelectColumn ? [selectColumn()] : [];
  for (const col of config.columns ?? []) {
    columns.push(tableColumnToColumnDef(col));
  }
  columns.push(actionsColumn(config.title, options));
  return columns;
}
function referenceColumnsFromConfig(cols) {
  return cols.map((col) => tableColumnToColumnDef(col));
}
function StatusBadge({
  status,
  subStatus,
  statusVariantMap,
  statusLabels,
  subStatusVariantMap,
  subStatusLabels
}) {
  if (subStatus) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getBadgeVariant(subStatus, subStatusVariantMap), children: subStatusLabels[subStatus] ?? subStatus });
  }
  if (!status) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "-" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getBadgeVariant(status, statusVariantMap), children: statusLabels[status] ?? status });
}
const STAY_STATUS_VARIANT_MAP$1 = {
  coming_up: "info",
  in_progress: "success",
  incomplete: "destructive",
  completed: "secondary",
  cancelled: "orange"
};
const STAY_STATUS_LABELS$1 = {
  coming_up: "Coming Up",
  in_progress: "In Progress",
  incomplete: "Incomplete",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STAY_SUB_STATUS_VARIANT_MAP$1 = {
  missing_purchase_commission: "purple",
  missing_purchase: "destructive",
  missing_commission: "warning",
  missing_commission_unpaid: "destructive",
  pending_payment: "warning",
  charge_and_invoice: "warning",
  charge_only: "warning",
  invoice_only: "warning",
  internal_no_charge: "secondary"
};
const STAY_SUB_STATUS_LABELS$1 = {
  missing_purchase_commission: "Missing Both",
  missing_purchase: "Missing Purchase",
  missing_commission: "Missing Commission",
  missing_commission_unpaid: "Missing Commission & Unpaid",
  pending_payment: "Pending Payment",
  charge_and_invoice: "Charge & Invoice",
  charge_only: "Charge Only",
  invoice_only: "Invoice Only",
  internal_no_charge: "Internal No Charge"
};
const BOOKING_STATUS_VARIANT_MAP$1 = {
  all_cancelled: "secondary",
  coming_up: "info",
  in_progress: "success",
  incomplete: "destructive",
  finished: "success"
};
const BOOKING_STATUS_LABELS$1 = {
  all_cancelled: "All Cancelled",
  coming_up: "Coming Up",
  in_progress: "In Progress",
  incomplete: "Incomplete",
  finished: "Finished"
};
const BOOKING_SUB_STATUS_VARIANT_MAP$1 = {
  doc_missing: "destructive",
  payment_pending: "warning",
  action_required: "orange"
};
const BOOKING_SUB_STATUS_LABELS$1 = {
  doc_missing: "Doc Missing",
  payment_pending: "Payment Pending",
  action_required: "Action Required"
};
const stayTableColumns = [
  { key: "hotelName", label: "Hotel Name", icon: "BuildingApartment", bold: true, size: 250, minSize: 180 },
  { key: "checkInDate", label: "Check-In", type: "date", icon: "CalendarArrowUp", size: 140, minSize: 120 },
  { key: "checkOutDate", label: "Check-Out", type: "date", icon: "CalendarArrowDown", size: 140, minSize: 120 },
  {
    key: "guestNames",
    label: "Guests",
    type: "custom",
    icon: "Users",
    cell: (row) => row.guestNames?.join(", ") || "-",
    size: 220,
    minSize: 150
  },
  {
    key: "status",
    label: "Status",
    type: "custom",
    sortable: true,
    cell: (row) => StatusBadge({
      status: row.status,
      subStatus: row.subStatus,
      statusVariantMap: STAY_STATUS_VARIANT_MAP$1,
      statusLabels: STAY_STATUS_LABELS$1,
      subStatusVariantMap: STAY_SUB_STATUS_VARIANT_MAP$1,
      subStatusLabels: STAY_SUB_STATUS_LABELS$1
    }),
    size: 200,
    minSize: 160
  }
];
const bookingTableColumns = [
  { key: "confirmationNo", label: "Booking reference", icon: "Hash", bold: true, size: 180, minSize: 150 },
  { key: "bookerName", label: "Booker", icon: "User", size: 200, minSize: 150 },
  { key: "companyName", label: "Client", icon: "Buildings", size: 250, minSize: 150 },
  {
    key: "status",
    label: "Status",
    type: "custom",
    cell: (row) => StatusBadge({
      status: row.status,
      subStatus: row.subStatus,
      statusVariantMap: BOOKING_STATUS_VARIANT_MAP$1,
      statusLabels: BOOKING_STATUS_LABELS$1,
      subStatusVariantMap: BOOKING_SUB_STATUS_VARIANT_MAP$1,
      subStatusLabels: BOOKING_SUB_STATUS_LABELS$1
    }),
    size: 200,
    minSize: 160
  },
  { key: "travelPeriodStart", label: "Travel Start", type: "date", icon: "CalendarArrowUp", size: 150, minSize: 120 },
  { key: "travelPeriodEnd", label: "Travel End", type: "date", icon: "CalendarArrowDown", size: 150, minSize: 120 },
  { key: "costCentre", label: "Cost Centre", icon: "Tag", size: 140, minSize: 100 }
];
const contactTableColumns = [
  { key: "general.firstName", label: "First Name", icon: "User", bold: true, size: 150, minSize: 100 },
  { key: "general.lastName", label: "Last Name", icon: "User", bold: true, size: 150, minSize: 100 },
  { key: "general.role", label: "Role", icon: "SealCheck", size: 120, minSize: 80 },
  { key: "general.email", label: "Email", icon: "Envelope", size: 220, minSize: 150 },
  { key: "general.phone", label: "Phone", icon: "Phone", sortable: false, size: 150, minSize: 120 }
];
function FieldLabel({ field, htmlFor, children }) {
  const IconComponent = field.icon ? getIcon(field.icon) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor, className: IconComponent ? "flex items-center gap-1.5" : void 0, children: [
    IconComponent && /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "size-4 text-muted-foreground", weight: "light" }),
    field.label,
    children
  ] });
}
function makeStatusBadgeField(config) {
  return function StatusBadgeFieldComponent({ field, value, allData }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatusBadge,
        {
          status: value,
          subStatus: allData?.subStatus,
          ...config
        }
      ) })
    ] });
  };
}
const isServer$1 = typeof window === "undefined";
const origin$1 = isServer$1 ? "http://localhost:3001" : "";
const BASE$1 = `${origin$1}/api/v1/bookings`;
async function fetchBookingsByCompanyId(companyId) {
  const res = await fetch(`${BASE$1}?companyId=${encodeURIComponent(companyId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
async function fetchBookingsByBookerId(bookerId) {
  const res = await fetch(`${BASE$1}?bookerId=${encodeURIComponent(bookerId)}&pageSize=1000`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.data;
}
async function fetchBookingByStayId(stayId) {
  if (!stayId) return [];
  const res = await fetch(`${BASE$1}/by-field/staySummaries.stayId/${encodeURIComponent(stayId)}`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
const isServer = typeof window === "undefined";
const origin = isServer ? "http://localhost:3001" : "";
const BASE = `${origin}/api/v1/hotels`;
async function fetchHotelById(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
async function fetchHotelsByIds(ids) {
  if (ids.length === 0) return [];
  const res = await fetch(`${BASE}/by-ids?ids=${ids.map(encodeURIComponent).join(",")}`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
async function searchHotels(query) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=10`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
const STAY_STATUS_VARIANT_MAP = {
  coming_up: "info",
  in_progress: "success",
  incomplete: "destructive",
  completed: "secondary",
  cancelled: "orange"
};
const STAY_STATUS_LABELS = {
  coming_up: "Coming Up",
  in_progress: "In Progress",
  incomplete: "Incomplete",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STAY_SUB_STATUS_VARIANT_MAP = {
  missing_purchase_commission: "purple",
  missing_purchase: "destructive",
  missing_commission: "warning",
  missing_commission_unpaid: "destructive",
  pending_payment: "warning",
  charge_and_invoice: "warning",
  charge_only: "warning",
  invoice_only: "warning",
  internal_no_charge: "secondary"
};
const STAY_SUB_STATUS_LABELS = {
  missing_purchase_commission: "Missing Both",
  missing_purchase: "Missing Purchase",
  missing_commission: "Missing Commission",
  missing_commission_unpaid: "Missing Commission & Unpaid",
  pending_payment: "Pending Payment",
  charge_and_invoice: "Charge & Invoice",
  charge_only: "Charge Only",
  invoice_only: "Invoice Only",
  internal_no_charge: "Internal No Charge"
};
const stayStatusBadgeField = makeStatusBadgeField({
  statusVariantMap: STAY_STATUS_VARIANT_MAP,
  statusLabels: STAY_STATUS_LABELS,
  subStatusVariantMap: STAY_SUB_STATUS_VARIANT_MAP,
  subStatusLabels: STAY_SUB_STATUS_LABELS
});
function makeStayConfig() {
  return {
    title: "Stay",
    titles: {
      view: "Stay Details",
      edit: "Edit Stay",
      create: "New Stay"
    },
    gridColumns: 8,
    columns: [
      {
        key: "hotelName",
        label: "Hotel Name",
        icon: "BuildingApartment",
        bold: true,
        size: 250,
        minSize: 180
      },
      {
        key: "guestIds",
        label: "Guests",
        type: "custom",
        icon: "Users",
        cell: (row) => row.guestNames?.join(", ") || "-",
        size: 200,
        minSize: 150
      },
      {
        key: "checkInDate",
        label: "Check-In",
        type: "date",
        icon: "CalendarArrowUp",
        size: 140,
        minSize: 120
      },
      {
        key: "checkOutDate",
        label: "Check-Out",
        type: "date",
        icon: "CalendarArrowDown",
        size: 140,
        minSize: 120
      },
      {
        key: "hotelConfirmationNo",
        label: "Hotel Conf. #",
        icon: "Hash",
        sortable: false,
        size: 150,
        minSize: 120
      },
      {
        key: "roomType",
        label: "Room Type",
        icon: "Bed",
        sortable: false,
        size: 180,
        minSize: 120
      },
      {
        key: "roomPrice",
        label: "Price",
        type: "custom",
        icon: "CurrencyDollar",
        sortable: true,
        cell: (row) => {
          if (!row.roomPrice) return "-";
          return `${row.roomPrice} ${row.roomCurrency || ""}`.trim();
        },
        sortingFn: (rowA, rowB) => {
          const a2 = parseFloat(rowA.original.roomPrice) || 0;
          const b = parseFloat(rowB.original.roomPrice) || 0;
          return a2 - b;
        },
        size: 120,
        minSize: 100
      },
      {
        key: "status",
        label: "Status",
        type: "custom",
        sortable: true,
        cell: (row) => StatusBadge({
          status: row.status,
          subStatus: row.subStatus,
          statusVariantMap: STAY_STATUS_VARIANT_MAP,
          statusLabels: STAY_STATUS_LABELS,
          subStatusVariantMap: STAY_SUB_STATUS_VARIANT_MAP,
          subStatusLabels: STAY_SUB_STATUS_LABELS
        }),
        size: 200,
        minSize: 160
      },
      {
        key: "confirmationNo",
        label: "Booking Conf. #",
        icon: "Hash",
        sortable: false,
        size: 150,
        minSize: 120
      }
    ],
    defaultValues: {
      prepaid: "no",
      roomPrice: "",
      roomCurrency: "EUR",
      taxAmount: "",
      taxCurrency: "EUR"
    },
    canCreate: false,
    canEdit: true,
    canDelete: true,
    copyFields: ["hotelId", "hotelName", "roomType", "roomPrice", "roomCurrency", "taxAmount", "taxCurrency", "paymentType", "paymentInstructions", "cancellations", "checkInDate", "checkOutDate", "adminRemarks", "cancelledReason"],
    onFieldChange: async (key, value, _data, setFields) => {
      if (key === "hotelId") {
        if (value) {
          const hotel = await fetchHotelById(value);
          setFields({ hotelName: hotel?.name ?? "" });
        } else {
          setFields({ hotelName: "" });
        }
      }
    },
    sections: [
      {
        rows: [
          {
            items: [
              {
                key: "status",
                label: "Status",
                type: "custom",
                readOnlyInEdit: true,
                hideInCreate: true,
                gridColumn: "span 4",
                component: stayStatusBadgeField
              },
              {
                key: "cancelledReason",
                label: "Cancellation Reason",
                type: "select",
                hideInCreate: true,
                readOnlyInEdit: false,
                gridColumn: "span 4",
                options: [
                  { value: "charge_and_invoice", label: "Charge & Invoice" },
                  { value: "charge_only", label: "Charge Only" },
                  { value: "invoice_only", label: "Invoice Only" },
                  { value: "internal_no_charge", label: "Internal No Charge" }
                ]
              }
            ]
          },
          {
            items: [
              {
                key: "hotelConfirmationNo",
                label: "Hotel Conf. no.",
                type: "text",
                icon: "Hash",
                placeholder: "Hotel confirmation number",
                gridColumn: "span 2"
              },
              {
                key: "hotelId",
                label: "Hotel",
                type: "search-reference",
                icon: "BuildingApartment",
                required: true,
                placeholder: "Search for a hotel...",
                gridColumn: "1 / span 2",
                gridRow: "1",
                searchConfig: {
                  entityType: "hotels",
                  fetchFunction: searchHotels,
                  fetchByIdFunction: fetchHotelById,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search hotels by name, city, or country..."
                }
              },
              {
                key: "checkInDate",
                label: "Check-In",
                type: "date",
                icon: "CalendarArrowUp",
                required: true,
                gridColumn: "span 2"
              },
              {
                key: "checkOutDate",
                label: "Check-Out",
                type: "date",
                icon: "CalendarArrowDown",
                required: true,
                gridColumn: "span 2",
                minDateField: "checkInDate"
              }
            ]
          },
          {
            items: [
              {
                key: "guestIds",
                label: "Guests",
                type: "multi-search-reference",
                icon: "Users",
                required: true,
                placeholder: "Search for a guest...",
                gridColumn: "1 / span 2",
                gridRow: "1",
                searchConfig: {
                  entityType: "contacts",
                  fetchFunction: searchContacts,
                  fetchByIdFunction: fetchContactById,
                  displayFields: ["general.firstName", "general.lastName"],
                  selectedDisplayFields: [
                    "general.firstName",
                    "general.lastName"
                  ],
                  searchPlaceholder: "Search guests by name or email..."
                }
              },
              {
                key: "roomType",
                label: "Room Type",
                type: "dependent-select",
                icon: "Bed",
                placeholder: "Select a room type",
                gridColumn: "3 / span 2",
                gridRow: "1",
                dependentSelectConfig: {
                  dependsOn: "hotelId",
                  fetchEntity: async (id) => {
                    const results = await fetchHotelsByIds([id]);
                    return results[0];
                  },
                  mapOptions: (hotel) => hotel?.roomTypes?.map((rt) => ({
                    value: rt,
                    label: rt
                  })) || [],
                  noParentMessage: "Select a hotel first"
                }
              },
              {
                key: "roomPrice",
                label: "Price",
                type: "currency",
                icon: "CurrencyDollar",
                placeholder: "Enter price",
                amountKey: "roomPrice",
                currencyKey: "roomCurrency",
                gridColumn: "1 / span 2",
                gridRow: "2"
              },
              {
                key: "taxAmount",
                label: "Tax",
                type: "currency",
                icon: "Receipt",
                placeholder: "Enter tax amount",
                amountKey: "taxAmount",
                currencyKey: "taxCurrency",
                gridColumn: "3 / span 2",
                gridRow: "2"
              },
              {
                key: "specialRequests",
                label: "Special Requests",
                type: "textarea",
                placeholder: "Enter special requests",
                gridColumn: "1 / span 4",
                gridRow: "3"
              },
              {
                key: "remarks",
                label: "Remarks",
                type: "textarea",
                placeholder: "Enter remarks",
                rows: 6,
                gridColumn: "1 / span 4",
                gridRow: "4"
              },
              {
                key: "adminRemarks",
                label: "Admin remarks (does NOT appear on confirmation)",
                type: "textarea",
                placeholder: "Internal admin remarks",
                rows: 4,
                gridColumn: "1 / span 4",
                gridRow: "5"
              },
              {
                kind: "group",
                label: "Payment Information",
                gridColumn: "5 / span 4",
                gridRow: "1 / span 5",
                columns: 1,
                fields: [
                  {
                    key: "purchaseInvoicePaid",
                    label: "Purchase invoice paid?",
                    type: "select",
                    options: [
                      { value: "not_paid", label: "Not paid" },
                      {
                        value: "paid_bank_transfer",
                        label: "Paid by Bank Transfer"
                      },
                      {
                        value: "paid_credit_card",
                        label: "Paid by Credit Card"
                      },
                      { value: "__custom__", label: "Custom ..." }
                    ]
                  },
                  {
                    key: "paymentCurrency",
                    label: "Payment Currency",
                    type: "select",
                    options: [
                      { value: "EUR", label: "EUR" },
                      { value: "GBP", label: "GBP" },
                      { value: "USD", label: "USD" },
                      { value: "CHF", label: "CHF" },
                      { value: "HUF", label: "HUF" },
                      { value: "PLN", label: "PLN" },
                      { value: "DKK", label: "DKK" },
                      { value: "CAD", label: "CAD" },
                      { value: "SEK", label: "SEK" },
                      { value: "HKD", label: "HKD" },
                      { value: "BRL", label: "BRL" },
                      { value: "TRY", label: "TRY" },
                      { value: "CZK", label: "CZK" },
                      { value: "ISK", label: "ISK" },
                      { value: "INR", label: "INR" },
                      { value: "NOK", label: "NOK" },
                      { value: "RSD", label: "RSD" },
                      { value: "SGD", label: "SGD" },
                      { value: "JPY", label: "JPY" },
                      { value: "HRK", label: "HRK" },
                      { value: "BGN", label: "BGN" },
                      { value: "AUD", label: "AUD" },
                      { value: "NZD", label: "NZD" },
                      { value: "CNY", label: "CNY" },
                      { value: "MXN", label: "MXN" },
                      { value: "ZAR", label: "ZAR" },
                      { value: "AED", label: "AED" },
                      { value: "RON", label: "RON" },
                      { value: "ILS", label: "ILS" },
                      { value: "SAR", label: "SAR" },
                      { value: "MAD", label: "MAD" }
                    ]
                  },
                  {
                    key: "paymentDeadline",
                    label: "Payment Deadline",
                    type: "date",
                    icon: "CalendarClock"
                  },
                  {
                    key: "paymentDate",
                    label: "Payment Date",
                    type: "date",
                    icon: "CalendarCheck"
                  }
                ]
              }
            ]
          },
          {
            items: [
              {
                kind: "group",
                label: "Booking Terms",
                gridColumn: "span 4",
                columns: 1,
                fields: [
                  {
                    key: "paymentType",
                    label: "Payment Type",
                    type: "select",
                    icon: "CreditCard",
                    placeholder: "Select payment type",
                    options: [
                      {
                        value: "Above rate is including breakfast and excluding Citytax",
                        label: "Incl. BK, Exc. Citytax"
                      },
                      {
                        value: "Above rate is including breakfast and including Citytax",
                        label: "Incl. BK & Citytax"
                      },
                      {
                        value: "Above rate is excluding breakfast and including Citytax",
                        label: "Exc. BK, Incl. Citytax"
                      },
                      {
                        value: "Above rate is excluding breakfast and excluding Citytax",
                        label: "Exc. BK & Citytax"
                      },
                      {
                        value: "Above rate is including breakfast and excluding all taxes and fees",
                        label: "Incl. BK, Exc. All tax"
                      },
                      {
                        value: "Above rate is excluding breakfast, all taxes, and fees",
                        label: "Excl. BK & All tax"
                      }
                    ]
                  },
                  {
                    key: "paymentInstructions",
                    label: "Payment Instructions",
                    type: "select",
                    placeholder: "Select payment instructions",
                    options: [
                      {
                        value: "Room and breakfast charges, along with applicable taxes, will be billed to the credit card provided by Corporate Meeting Partner. Any additional expenses incurred during the stay will be settled by the guest upon check-out.",
                        label: "Creditcard: Room, breakfast and tax"
                      },
                      {
                        value: "Room and applicable tax charges will be billed to the credit card provided by Corporate Meeting Partner. Any additional expenses incurred during the stay will be settled by the guest upon check-out.",
                        label: "Creditcard: Room and tax"
                      },
                      {
                        value: "All charges will be billed to the credit card provided by Corporate Meeting Partner.",
                        label: "Creditcard: All charges"
                      },
                      {
                        value: "Room and breakfast charges, along with applicable taxes, will be invoiced to Corporate Meeting Partner. Any additional expenses will be settled by the guest upon check-out.",
                        label: "Billed: Room, breakfast and tax"
                      },
                      {
                        value: "Room and applicable tax charges will be invoiced to Corporate Meeting Partner. Any additional expenses will be settled by the guest upon check-out.",
                        label: "Billed: Room and tax"
                      },
                      {
                        value: "All charges will be invoiced to Corporate Meeting Partner.",
                        label: "Billed: All charges"
                      },
                      {
                        value: "All charges will be settled by the guest upon check-out.",
                        label: "Own Account"
                      },
                      { value: "__custom__", label: "Custom payment .." }
                    ]
                  },
                  {
                    key: "cancellations",
                    label: "Cancellations",
                    type: "select",
                    icon: "Prohibit",
                    placeholder: "Select cancellation policy",
                    options: [
                      {
                        value: "Cancellations made up to 24 hours prior to arrival will incur no charge. Cancellations made within this timeframe will be charged at 100% of the total cost.",
                        label: "24h"
                      },
                      {
                        value: "Cancellations made up to 48 hours prior to arrival will incur no charge. Cancellations made within this timeframe will be charged at 100% of the total cost.",
                        label: "48h"
                      },
                      {
                        value: "Cancellations made up to 72 hours prior to arrival will incur no charge. Cancellations made within this timeframe will be charged at 100% of the total cost.",
                        label: "72h"
                      },
                      {
                        value: "Non-Refundable Reservation – This booking cannot be canceled or modified without incurring charges.",
                        label: "Non-ref"
                      },
                      { value: "__custom__", label: "Custom cancellation .." }
                    ]
                  }
                ]
              },
              {
                kind: "group",
                label: "Invoice & Payment",
                gridColumn: "span 4",
                columns: 1,
                fields: [
                  {
                    key: "prepaid",
                    label: "Prepaid",
                    type: "select",
                    options: [
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ],
                    defaultValue: "no"
                  },
                  {
                    key: "purchaseInvoice",
                    label: "Purchase Invoice",
                    type: "text",
                    icon: "FileText",
                    placeholder: "Invoice number"
                  },
                  {
                    key: "commissionInvoice",
                    label: "Commission Invoice",
                    type: "text",
                    icon: "FileText",
                    placeholder: "Invoice number"
                  },
                  {
                    key: "purchaseInvoicePaidAmount",
                    label: "Total amount purchase invoice paid",
                    type: "currency",
                    icon: "CurrencyDollar",
                    placeholder: "Amount",
                    amountKey: "purchaseInvoicePaidAmount",
                    currencyKey: "purchaseInvoicePaidCurrency"
                  }
                ]
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Booking",
                type: "inverse-reference",
                gridColumn: "span 8",
                inverseReferenceConfig: {
                  entityType: "bookings",
                  fetchFunction: fetchBookingByStayId,
                  columns: referenceColumnsFromConfig(bookingTableColumns),
                  queryKey: "stay-booking",
                  defaultVisibleColumns: ["confirmationNo", "bookerName", "companyName", "costCentre", "status"],
                  emptyMessage: "No booking associated with this stay",
                  maxHeight: "200px",
                  routePath: "/bookings"
                }
              }
            ]
          }
        ]
      },
      {
        // Filter-only section — fields here are invisible in the panel but picked up by getFiltersFromConfig
        fields: [
          {
            key: "status",
            label: "Status",
            type: "select",
            hideInCreate: true,
            hideInEdit: true,
            hideInView: true,
            options: [
              { value: "coming_up", label: "Coming Up" },
              { value: "in_progress", label: "In Progress" },
              { value: "incomplete", label: "Incomplete" },
              { value: "missing_purchase_commission", label: "↳ Missing Both", field: "subStatus" },
              { value: "missing_purchase", label: "↳ Missing Purchase", field: "subStatus" },
              { value: "missing_commission", label: "↳ Missing Commission", field: "subStatus" },
              { value: "missing_commission_unpaid", label: "↳ Missing Commission & Unpaid", field: "subStatus" },
              { value: "pending_payment", label: "↳ Pending Payment", field: "subStatus" },
              { value: "charge_and_invoice", label: "↳ Charge & Invoice", field: "subStatus" },
              { value: "charge_only", label: "↳ Charge Only", field: "subStatus" },
              { value: "invoice_only", label: "↳ Invoice Only", field: "subStatus" },
              { value: "internal_no_charge", label: "↳ Internal No Charge", field: "subStatus" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" }
            ]
          }
        ]
      }
    ]
  };
}
function isFieldGroup(item) {
  return "kind" in item && item.kind === "group";
}
function getValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
function setValue(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const result = { ...obj };
  let current = result;
  for (const key of keys) {
    current[key] = { ...current[key] };
    current = current[key];
  }
  current[lastKey] = value;
  return result;
}
function isFieldVisible(field, mode, data) {
  if (field.showInMode && !field.showInMode.includes(mode)) {
    return false;
  }
  if (mode === "create" && field.hideInCreate) return false;
  if (mode === "edit" && field.hideInEdit) return false;
  if (mode === "view" && field.hideInView) return false;
  if (field.conditionalRender && data) {
    return field.conditionalRender(data);
  }
  return true;
}
function isFieldReadOnly(field, mode) {
  if (mode === "view") return true;
  if (mode === "edit" && field.readOnlyInEdit) return true;
  if (field.autoGenerate) return true;
  return false;
}
function formatValue(value, field) {
  if (value === null || value === void 0) return "-";
  if (typeof value === "object" && !Array.isArray(value)) {
    if (Object.keys(value).length === 0) return "-";
    try {
      return JSON.stringify(value);
    } catch {
      return "-";
    }
  }
  if (field.format) {
    return field.format(value);
  }
  switch (field.type) {
    case "date": {
      const date = new Date(value);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "/");
    }
    case "datetime": {
      const date = new Date(value);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "/") + " " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    }
    case "checkbox":
      return value ? "Yes" : "No";
    case "array":
      return Array.isArray(value) ? value.join(", ") : String(value);
    case "select":
      const option = field.options?.find((opt) => opt.value === value);
      return option?.label || String(value);
    default:
      return String(value);
  }
}
function getAllFields(section) {
  if (section.rows) {
    const fields = [];
    for (const row of section.rows) {
      for (const item of row.items) {
        if (isFieldGroup(item)) {
          fields.push(...item.fields);
        } else {
          fields.push(item);
        }
      }
    }
    return fields;
  }
  return section.fields || [];
}
function prepareForCopy(data, config, extraFieldsToClear) {
  const copy = structuredClone(data);
  delete copy._id;
  delete copy.old_id;
  delete copy.createdBy;
  delete copy.updatedBy;
  delete copy.updatedAt;
  copy.version = 1;
  delete copy.documents;
  const duplicateReferenceKeys = [];
  for (const section of config.sections) {
    for (const field of getAllFields(section)) {
      if (field.hideInCreate) {
        const keys = field.key.split(".");
        let obj = copy;
        for (let i2 = 0; i2 < keys.length - 1; i2++) {
          obj = obj?.[keys[i2]];
        }
        if (obj) {
          delete obj[keys[keys.length - 1]];
        }
      }
      if (field.type === "reference-table" && !field.showInMode?.includes("create")) {
        duplicateReferenceKeys.push(field.key);
      }
    }
  }
  if (duplicateReferenceKeys.length > 0) {
    copy._duplicateReferenceKeys = duplicateReferenceKeys;
  }
  if (config.copyFields) {
    for (const key of Object.keys(copy)) {
      if (key !== "_duplicateReferenceKeys" && !config.copyFields.includes(key)) {
        delete copy[key];
      }
    }
  }
  return copy;
}
function validateData(data, config) {
  const errors = {};
  config.sections.forEach((section) => {
    getAllFields(section).forEach((field) => {
      const value = getValue(data, field.key);
      if (field.required && (value === null || value === void 0 || value === "")) {
        errors[field.key] = `${field.label} is required`;
        return;
      }
      if (field.validation) {
        const error = field.validation(value, data);
        if (error) {
          errors[field.key] = error;
        }
      }
    });
  });
  if (config.onValidate) {
    const customErrors = config.onValidate(data);
    Object.assign(errors, customErrors);
  }
  return errors;
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$2, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(n$2, { weight: "light" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const formatDate$2 = (dateString) => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).replace(/ /g, "/");
  } catch {
    return dateString;
  }
};
const calculateNights$1 = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return "-";
  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
    return diffDays.toString();
  } catch {
    return "-";
  }
};
function StaySelectionModal({
  isOpen,
  onClose,
  stays,
  onGeneratePDF,
  isGenerating
}) {
  const [selectedStays, setSelectedStays] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (isOpen && stays.length > 0) {
      setSelectedStays(new Set(stays.map((s2) => s2._id)));
    }
  }, [isOpen, stays]);
  const selectAll = selectedStays.size === stays.length && stays.length > 0;
  const handleStayToggle = (stayId) => {
    const next = new Set(selectedStays);
    if (next.has(stayId)) {
      next.delete(stayId);
    } else {
      next.add(stayId);
    }
    setSelectedStays(next);
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStays(/* @__PURE__ */ new Set());
    } else {
      setSelectedStays(new Set(stays.map((s2) => s2._id)));
    }
  };
  const handleGeneratePDF = () => {
    onGeneratePDF(stays.filter((s2) => selectedStays.has(s2._id)));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Generate confirmation PDF" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Select the stays to include." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2.5 cursor-pointer select-none py-1",
        onClick: handleSelectAll,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: "select-all",
              checked: selectAll,
              onCheckedChange: handleSelectAll,
              onClick: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "select-all", className: "cursor-pointer text-sm leading-none", children: "Select all" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            selectedStays.size,
            " of ",
            stays.length
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto max-h-[320px] -mx-6 px-6 space-y-1", children: stays.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(n$5, { className: "size-8 mb-2 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No stays on this booking." })
    ] }) : stays.map((stay) => {
      const selected = selectedStays.has(stay._id);
      const nights = calculateNights$1(stay.checkInDate, stay.checkOutDate);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex items-center gap-2.5 rounded-sm px-2 py-3.5 cursor-pointer transition-colors",
            selected ? "bg-accent" : "hover:bg-accent/50"
          ),
          onClick: () => handleStayToggle(stay._id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: selected,
                onCheckedChange: () => handleStayToggle(stay._id),
                onClick: (e) => e.stopPropagation(),
                className: "shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate leading-none", children: stay.hotelName || "Unknown Hotel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                formatDate$2(stay.checkInDate),
                " – ",
                formatDate$2(stay.checkOutDate),
                stay.guestCount ? ` · ${stay.guestCount} guest${stay.guestCount !== 1 ? "s" : ""}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
              nights,
              "n"
            ] })
          ]
        },
        stay._id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, disabled: isGenerating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleGeneratePDF,
          disabled: selectedStays.size === 0 || isGenerating,
          size: "sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(w, { className: "size-4" }),
            isGenerating ? "Generating…" : "Generate PDF"
          ]
        }
      )
    ] })
  ] }) });
}
const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 120,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    fontSize: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  logo: {
    width: 80,
    objectFit: "contain"
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 10
  },
  companyName: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    textAlign: "right"
  },
  companyAddress: {
    marginBottom: 4,
    textAlign: "right"
  },
  confirmationSection: {
    marginTop: 20,
    marginBottom: 8
  },
  confirmationTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold"
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 6,
    flexWrap: "wrap"
  },
  detailLabel: {
    fontFamily: "Helvetica-Bold",
    width: 150
  },
  detailValue: {
    flex: 1,
    flexWrap: "wrap"
  },
  staySection: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 10,
    flexWrap: "wrap"
  },
  stayHeader: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8
  },
  stayDatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    marginBottom: 5
  },
  dateSection: {
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  dateSectionDivider: {
    width: 1,
    backgroundColor: "#dcdcdc",
    marginVertical: -8
  },
  stayDateLabel: {
    fontSize: 12
  },
  stayDateValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold"
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#c8c8c8"
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9
  },
  footerColumn: {
    flex: 1
  },
  footerCompanyName: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 4
  },
  footerText: {
    marginBottom: 4
  },
  pageNumber: {
    position: "absolute",
    top: -15,
    right: 0,
    fontSize: 9
  },
  link: {
    color: "#000000",
    textDecoration: "underline"
  },
  italicText: {
    fontFamily: "Helvetica-Oblique"
  },
  closingSection: {
    marginTop: 20
  },
  closingText: {
    marginBottom: 8
  }
});
const formatDate$1 = (dateString) => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).replace(/ /g, "/");
  } catch (error) {
    return dateString;
  }
};
const calculateNights = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) return "-";
  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
    return diffDays.toString();
  } catch (error) {
    return "-";
  }
};
const formatGuestNames = (stay) => {
  if (!stay.guestIds || stay.guestIds.length === 0) {
    return "-";
  }
  if (stay.guestNames && Array.isArray(stay.guestNames) && stay.guestNames.length > 0) {
    return stay.guestNames.join(", ");
  }
  const count = stay.guestIds.length;
  return count === 1 ? "1 guest" : `${count} guests`;
};
const getCostCenterLabel = (code) => {
  const costCenters = {
    CC1: "Cost Centre 1",
    CC2: "Cost Centre 2",
    CC3: "Cost Centre 3"
  };
  return costCenters[code] || code || "-";
};
const getBookerName = (bookerData, bookerId) => {
  if (!bookerData) return bookerId || "-";
  const firstName = bookerData.general?.firstName || "";
  const lastName = bookerData.general?.lastName || "";
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return bookerId || "-";
};
const Footer = ({
  confirmationEntity
}) => {
  const selectedEntity = confirmationEntity || "Corporate Meeting Partner B.V.";
  const entityDetails = selectedEntity === "Corporate Meeting Partner (UK) Ltd." ? {
    name: "Corporate Meeting Partner (UK) Ltd.",
    addressLine1: "59 St. Martin's Lane",
    addressLine2: "London, WC2N 4JS (UK)",
    phone: "Tel. +44 (0)20 4579 0714",
    line1: "Companies House: 15675410",
    tids: "TIDS by IATA: 96172016"
  } : {
    name: "Corporate Meeting Partner B.V.",
    addressLine1: "Dorpsstraat 20",
    addressLine2: "2361 BB Warmond (NL)",
    phone: "Tel. +31 (0)85 0030 395",
    line1: "ICC: 77251563",
    tids: "TIDS by IATA: 96075464"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.footer, fixed: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.pageNumber, wrap: false, render: ({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.footerContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.footerColumn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerCompanyName, wrap: true, children: entityDetails.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: entityDetails.addressLine1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: entityDetails.addressLine2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: entityDetails.line1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: entityDetails.tids })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.footerColumn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: entityDetails.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: "www.corporatemeetingpartner.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.footerText, wrap: true, children: "reservations@corporatemeetingpartner.com" })
      ] })
    ] })
  ] });
};
const ReactPDFDocument = (props) => {
  const { bookingData, stays, companyData, bookerData, userName, logoUrl } = props;
  const confirmationNumber = bookingData.confirmationNo || bookingData._id;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.header, children: [
      logoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { style: styles.logo, src: logoUrl }),
      companyData && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.companyInfo, children: [
        companyData.name && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.companyName, wrap: true, children: companyData.name }),
        companyData.address && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.companyAddress, wrap: true, children: companyData.address }),
        (companyData.postal_code || companyData.city) && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.companyAddress, wrap: true, children: [companyData.postal_code, companyData.city].filter(Boolean).join(" ") }),
        companyData.country && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.companyAddress, wrap: true, children: companyData.country })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: styles.confirmationSection, wrap: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.confirmationTitle, wrap: true, children: [
      "Confirmation ",
      confirmationNumber
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "By order of:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: getBookerName(bookerData, bookingData.bookerId) })
    ] }),
    bookingData.confirmationDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Confirmation Date:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: formatDate$1(bookingData.confirmationDate) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Cost centre:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: getCostCenterLabel(bookingData.costCentre) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Travel Period:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.detailValue, wrap: true, children: [
        formatDate$1(bookingData.travelPeriodStart),
        " to",
        " ",
        formatDate$1(bookingData.travelPeriodEnd)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Guarantee:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: "Reservation is guaranteed for payment and (late) arrival." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Privacy Policy:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          style: [styles.detailValue, styles.link],
          src: "https://www.corporatemeetingpartner.com/privacy-policy",
          children: "Privacy Policy confirmations"
        }
      )
    ] }),
    stays && stays.length > 0 ? stays.map((stay, index) => {
      const nights = calculateNights(stay.checkInDate, stay.checkOutDate);
      const nightsText = parseInt(nights) === 1 ? `${nights} Night` : `${nights} Nights`;
      const guestNamesForTitle = formatGuestNames(stay);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.staySection, wrap: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.stayHeader, wrap: true, children: [
          "Stay: ",
          guestNamesForTitle,
          " - ",
          nightsText
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.stayDatesContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: styles.dateSection, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.stayDateLabel, children: [
            "Check-in:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.stayDateValue, children: formatDate$1(stay.checkInDate) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: styles.dateSectionDivider }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: styles.dateSection, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.stayDateLabel, children: [
            "Check-out:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.stayDateValue, children: formatDate$1(stay.checkOutDate) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Hotel:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.hotelName || "Unknown hotel" })
        ] }),
        (stay.hotelAddress || stay.hotelPostcode || stay.hotelCity || stay.hotelCountry) && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Hotel address:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: [
            stay.hotelAddress,
            [stay.hotelPostcode, stay.hotelCity].filter(Boolean).join(" "),
            stay.hotelCountry
          ].filter(Boolean).join(", ") })
        ] }),
        stay.hotelConfirmationNo && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Hotel Confirmation No.:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.hotelConfirmationNo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Room Type:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.roomType || "-" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Room Price:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.roomPrice ? `${stay.roomPrice} ${stay.roomCurrency || ""} per night` : "-" })
        ] }),
        stay.paymentType && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.paymentType })
        ] }),
        stay.roomPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: [styles.detailValue, styles.italicText], wrap: true, children: "Quoted rates reflect average nightly prices and may vary with changes in stay duration or room type" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Guests:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: formatGuestNames(stay) })
        ] }),
        stay.taxAmount && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Total Estimated Tax:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles.detailValue, wrap: true, children: [
            stay.taxAmount,
            " ",
            stay.taxCurrency || ""
          ] })
        ] }),
        stay.specialRequests && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Special Requests:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.specialRequests })
        ] }),
        stay.remarks && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Remarks:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.remarks })
        ] }),
        stay.paymentInstructions && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Payment Instructions:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.paymentInstructions })
        ] }),
        stay.cancellations && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.detailsRow, wrap: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailLabel, children: "Cancellation Policy:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.detailValue, wrap: true, children: stay.cancellations })
        ] })
      ] }, stay._id || index);
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: styles.staySection, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.italicText, children: "No stays associated with this booking" }) }),
    stays && stays.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.closingSection, wrap: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.closingText, wrap: true, children: "Thank you for booking with us, we hope you and/or your guest(s) have a pleasant stay!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.closingText, wrap: true, children: "With best regards," }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.closingText, wrap: true, children: userName })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Footer,
      {
        confirmationEntity: bookingData.confirmationEntity
      }
    )
  ] }) });
};
class VercelBlobStorage {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/v1/upload", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload failed: ${text}`);
    }
    const result = await response.json();
    return {
      id: crypto.randomUUID(),
      name: file.name,
      size: result.size ?? file.size,
      type: result.contentType ?? file.type,
      url: result.url,
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  async delete(_id, url) {
    if (!url) return;
    const params = new URLSearchParams({ url });
    const response = await fetch(`/api/v1/upload?${params}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Delete failed: ${text}`);
    }
  }
  getUrl(_id) {
    return null;
  }
}
const fileStorage = new VercelBlobStorage();
function normalizePdfStay(stay) {
  const normalizeAmountField = (val) => {
    if (!val) return void 0;
    if (typeof val === "string") return val;
    if (typeof val === "object" && val.amount != null) return String(val.amount);
    return String(val);
  };
  const normalizeCurrencyField = (val) => {
    if (!val) return void 0;
    if (typeof val === "string") return val;
    if (typeof val === "object" && val.currency != null) return String(val.currency);
    return void 0;
  };
  return {
    ...stay,
    roomPrice: normalizeAmountField(stay.roomPrice),
    roomCurrency: normalizeCurrencyField(stay.roomCurrency) ?? normalizeCurrencyField(stay.roomPrice),
    taxAmount: normalizeAmountField(stay.taxAmount),
    taxCurrency: normalizeCurrencyField(stay.taxCurrency) ?? normalizeCurrencyField(stay.taxAmount)
  };
}
function sortStaysByCheckInDate(stays) {
  return [...stays].sort((a2, b) => {
    if (!a2.checkInDate && !b.checkInDate) return 0;
    if (!a2.checkInDate) return 1;
    if (!b.checkInDate) return -1;
    return new Date(a2.checkInDate).getTime() - new Date(b.checkInDate).getTime();
  });
}
async function uploadPDFToDocuments(blob, filename, bookingId, existingDocuments) {
  try {
    const file = new File([blob], filename, { type: "application/pdf" });
    const uploaded = await fileStorage.upload(file);
    const updatedDocuments = [...existingDocuments, uploaded];
    const response = await fetch(`/api/v1/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ documents: updatedDocuments })
    });
    if (!response.ok) {
      console.error("[pdf] Failed to patch booking documents:", await response.text());
    }
  } catch (err) {
    console.error("[pdf] Error uploading PDF to documents:", err);
  }
}
function DownloadPDFButton({
  bookingData,
  staySummaries,
  documents = [],
  isDirty
}) {
  const { user } = useAuthStore();
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [companyData, setCompanyData] = reactExports.useState(null);
  const [bookerData, setBookerData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (bookingData.companyId) {
      fetchCompanyById(bookingData.companyId).then((c2) => setCompanyData(c2)).catch(() => setCompanyData(null));
    } else {
      setCompanyData(null);
    }
  }, [bookingData.companyId]);
  reactExports.useEffect(() => {
    if (bookingData.bookerId) {
      fetchContactById(bookingData.bookerId).then((c2) => setBookerData(c2)).catch(() => setBookerData(null));
    } else {
      setBookerData(null);
    }
  }, [bookingData.bookerId]);
  const handleGeneratePDF = async (selectedSummaries) => {
    setIsGenerating(true);
    setShowModal(false);
    try {
      const fullStays = await fetchStaysByIds(selectedSummaries.map((s2) => s2._id));
      const hotelIds = [...new Set(
        fullStays.map((s2) => {
          const id = s2.hotelId;
          if (!id) return null;
          return typeof id === "object" ? id.$oid : String(id);
        }).filter(Boolean)
      )];
      const hotels = hotelIds.length > 0 ? await fetchHotelsByIds(hotelIds) : [];
      const hotelsMap = /* @__PURE__ */ new Map();
      hotels.forEach((h) => {
        const id = typeof h._id === "object" ? h._id.$oid : String(h._id);
        hotelsMap.set(id, h);
      });
      const preparedStays = await Promise.all(
        fullStays.map(async (stay) => {
          const stayId = typeof stay.hotelId === "object" ? stay.hotelId.$oid : stay.hotelId ? String(stay.hotelId) : void 0;
          const hotel = stayId ? hotelsMap.get(stayId) : void 0;
          const guestNames = [];
          if (stay.guestIds && stay.guestIds.length > 0) {
            for (const guestId of stay.guestIds) {
              try {
                const contact = await fetchContactById(String(guestId));
                if (contact) {
                  const firstName = contact.general?.firstName || "";
                  const lastName = contact.general?.lastName || "";
                  const fullName = `${firstName} ${lastName}`.trim();
                  if (fullName) guestNames.push(fullName);
                }
              } catch {
              }
            }
          }
          const enriched = {
            ...stay,
            hotelAddress: hotel?.address ?? stay.hotelAddress,
            hotelPostcode: hotel?.postal_code ?? stay.hotelPostcode,
            hotelCity: hotel?.city ?? stay.hotelCity,
            hotelCountry: hotel?.country ?? stay.hotelCountry,
            guestNames
          };
          return normalizePdfStay(enriched);
        })
      );
      const sorted = sortStaysByCheckInDate(preparedStays);
      const logoUrl = new URL("/cmp_logo.png", window.location.origin).href;
      const userName = user?.name || "CMP Team";
      const blob = await pdf(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReactPDFDocument,
          {
            bookingData,
            stays: sorted,
            companyData,
            bookerData,
            userName,
            logoUrl
          }
        )
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      const filename = `confirmation_${bookingData.confirmationNo || bookingData._id}.pdf`;
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      uploadPDFToDocuments(blob, filename, bookingData._id, documents);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setShowModal(true),
          disabled: isGenerating || isDirty,
          type: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(w, { className: "size-4 mr-2" }),
            isGenerating ? "Generating…" : "Confirmation PDF"
          ]
        }
      ),
      isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Save changes before downloading" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaySelectionModal,
      {
        isOpen: showModal,
        onClose: () => setShowModal(false),
        stays: staySummaries,
        onGeneratePDF: handleGeneratePDF,
        isGenerating
      }
    )
  ] });
}
function DownloadPDFButtonField({ mode, allData, isDirty }) {
  if (mode !== "view" || !allData) return null;
  const id = typeof allData._id === "object" ? allData._id.$oid : String(allData._id);
  const bookingData = {
    _id: id,
    confirmationNo: allData.confirmationNo,
    confirmationDate: allData.confirmationDate,
    travelPeriodStart: allData.travelPeriodStart,
    travelPeriodEnd: allData.travelPeriodEnd,
    costCentre: allData.costCentre,
    notes: allData.notes,
    companyId: allData.companyId,
    bookerId: allData.bookerId,
    confirmationEntity: allData.confirmationEntity
  };
  const staySummaries = (allData.staySummaries ?? []).map((s2) => ({
    _id: s2.stayId,
    hotelName: s2.hotelName,
    checkInDate: s2.checkInDate,
    checkOutDate: s2.checkOutDate,
    guestCount: s2.guestNames?.length ?? 0
  }));
  const documents = Array.isArray(allData.documents) ? allData.documents : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DownloadPDFButton,
    {
      bookingData,
      staySummaries,
      documents,
      isDirty
    }
  ) });
}
function formatDate(dateString) {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).replace(/ /g, "/");
  } catch {
    return dateString;
  }
}
function SendConfirmationButtonField({
  mode,
  allData,
  onChange,
  onRequestSave
}) {
  if (mode !== "view" || !allData) return null;
  const [isSending, setIsSending] = reactExports.useState(false);
  const [bookerData, setBookerData] = reactExports.useState(null);
  const bookerId = typeof allData.bookerId === "object" ? allData.bookerId.$oid : allData.bookerId;
  reactExports.useEffect(() => {
    if (!bookerId) {
      setBookerData(null);
      return;
    }
    fetchContactById(bookerId).then((c2) => setBookerData(c2)).catch(() => setBookerData(null));
  }, [bookerId]);
  const handleSend = async () => {
    setIsSending(true);
    try {
      const firstName = bookerData?.general?.firstName ?? "";
      const lastName = bookerData?.general?.lastName ?? "";
      const bookerFullName = `${firstName} ${lastName}`.trim();
      const bookerEmail = bookerData?.general?.email ?? "";
      const staySummaries = allData.staySummaries ?? [];
      const stayDetailsText = staySummaries.map((s2) => {
        const guestNames = s2.guestNames && s2.guestNames.length > 0 ? s2.guestNames.join(", ") : "N/A";
        return `Hotel: ${s2.hotelName || "N/A"}, Guest: ${guestNames}, Check-in: ${formatDate(s2.checkInDate)}, Check-out: ${formatDate(s2.checkOutDate)}`;
      }).join("\n");
      const subject = `Your hotel confirmation: ${allData.confirmationNo ?? ""}`;
      const body = `Dear ${bookerFullName},

Thank you for making your reservation with us. Please find attached your booking confirmation for the following details:

${stayDetailsText}

Should you have any questions or need to make any changes, please do not hesitate to contact us directly.

We hope you and/or your guest(s) have a pleasant stay.`;
      try {
        await navigator.clipboard.writeText(body);
        toast.success("Email body copied to clipboard — paste it into your new email.");
      } catch {
        toast.error("Could not copy email body to clipboard.");
      }
      const bcc = "donotreply@corporatemeetingpartner.com";
      const mailtoUrl = `mailto:${encodeURIComponent(bookerEmail)}?subject=${encodeURIComponent(subject)}&bcc=${encodeURIComponent(bcc)}`;
      window.open(mailtoUrl, "_blank");
      if (!allData.confirmationSent) {
        onChange?.("confirmationSent", true);
        if (!allData.statusManuallySet) {
          onChange?.("status", "upcoming_confirmation_sent");
        }
        const saved = await onRequestSave?.();
        if (saved) {
          toast.success("Confirmation marked as sent.");
        }
      }
    } finally {
      setIsSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: handleSend,
        disabled: isSending,
        type: "button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(m$1, { className: "size-4 mr-2" }),
          isSending ? "Sending…" : "Send Confirmation"
        ]
      }
    ),
    allData.confirmationSent && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-700 dark:text-green-400 mt-1 flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(n$3, { className: "size-3" }),
      "Confirmation sent"
    ] })
  ] });
}
const stayApi = makeEntityApi("stays");
const BOOKING_STATUS_VARIANT_MAP = {
  all_cancelled: "secondary",
  coming_up: "info",
  in_progress: "success",
  incomplete: "destructive",
  finished: "success"
};
const BOOKING_STATUS_LABELS = {
  all_cancelled: "All Cancelled",
  coming_up: "Coming Up",
  in_progress: "In Progress",
  incomplete: "Incomplete",
  finished: "Finished"
};
const BOOKING_SUB_STATUS_VARIANT_MAP = {
  doc_missing: "destructive",
  payment_pending: "warning",
  action_required: "orange"
};
const BOOKING_SUB_STATUS_LABELS = {
  doc_missing: "Doc Missing",
  payment_pending: "Payment Pending",
  action_required: "Action Required"
};
const bookingStatusBadgeField = makeStatusBadgeField({
  statusVariantMap: BOOKING_STATUS_VARIANT_MAP,
  statusLabels: BOOKING_STATUS_LABELS,
  subStatusVariantMap: BOOKING_SUB_STATUS_VARIANT_MAP,
  subStatusLabels: BOOKING_SUB_STATUS_LABELS
});
function makeBookingConfig() {
  return {
    title: "Booking",
    titles: {
      view: "Booking Details",
      edit: "Edit Booking",
      create: "New Booking"
    },
    gridColumns: 6,
    columns: [
      {
        key: "confirmationNo",
        label: "Booking reference",
        bold: true,
        size: 180,
        minSize: 150
      },
      {
        key: "bookerName",
        label: "Booker",
        icon: "User",
        size: 200,
        minSize: 150
      },
      {
        key: "companyName",
        label: "Client",
        icon: "Buildings",
        size: 250,
        minSize: 150
      },
      {
        key: "hotelNames",
        label: "Hotel(s)",
        type: "custom",
        icon: "BuildingApartment",
        sortable: false,
        cell: (row) => {
          const names = row.staySummaries?.map((s2) => s2.hotelName).filter(Boolean) ?? [];
          const unique = [...new Set(names)];
          return unique.join(", ") || "-";
        },
        size: 220,
        minSize: 150
      },
      {
        key: "costCentre",
        label: "Cost Centre",
        icon: "CurrencyDollar",
        sortable: false,
        size: 120,
        minSize: 100
      },
      {
        key: "status",
        label: "Status",
        type: "custom",
        cell: (row) => StatusBadge({
          status: row.status,
          subStatus: row.subStatus,
          statusVariantMap: BOOKING_STATUS_VARIANT_MAP,
          statusLabels: BOOKING_STATUS_LABELS,
          subStatusVariantMap: BOOKING_SUB_STATUS_VARIANT_MAP,
          subStatusLabels: BOOKING_SUB_STATUS_LABELS
        }),
        size: 200,
        minSize: 160
      },
      {
        key: "travelPeriodStart",
        label: "Travel Start",
        type: "date",
        icon: "CalendarArrowUp",
        size: 150,
        minSize: 120
      },
      {
        key: "travelPeriodEnd",
        label: "Travel End",
        type: "date",
        icon: "CalendarArrowDown",
        size: 150,
        minSize: 120
      },
      {
        key: "guests",
        label: "Guests",
        type: "custom",
        icon: "Users",
        cell: (row) => {
          const names = row.staySummaries?.flatMap((s2) => s2.guestNames ?? []) ?? [];
          const unique = [...new Set(names)];
          return unique.join(", ") || "-";
        },
        size: 250,
        minSize: 150
      },
      {
        key: "documents",
        label: "Documents",
        type: "custom",
        icon: "Paperclip",
        cell: (row) => row.documents?.map((d) => d.name).join(", ") || "-",
        size: 200,
        minSize: 150,
        sortable: true,
        sortingFn: (rowA, rowB) => {
          const a2 = rowA.original.documents?.[0]?.name || "";
          const b = rowB.original.documents?.[0]?.name || "";
          return a2.localeCompare(b);
        }
      }
    ],
    defaultValues: {
      status: "upcoming_no_action",
      confirmationSent: false,
      version: 1,
      confirmationDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    },
    canCreate: true,
    canEdit: true,
    canDelete: true,
    copyFields: ["bookerId", "bookerName", "companyId", "companyName", "costCentre", "confirmationEntity"],
    // When duplicating a booking, also copy its stays as new drafts linked to the new booking
    onDuplicate: async (item, _baseCopy) => {
      const summaries = item.staySummaries ?? [];
      if (summaries.length === 0) return {};
      const stayIds = summaries.map((s2) => s2.stayId).filter(Boolean);
      if (stayIds.length === 0) return {};
      const fullStays = await fetchStaysByIds(stayIds);
      if (fullStays.length === 0) return {};
      const stayConfig = makeStayConfig();
      return { _stayCopies: fullStays.map((stay) => prepareForCopy(stay, stayConfig)) };
    },
    // Strip _stayCopies from the payload before the API call; stash it for onAfterCreate
    onBeforeCreate: async (payload, extraPayload) => {
      if (payload._stayCopies) {
        extraPayload._stayCopies = payload._stayCopies;
        delete payload._stayCopies;
      }
    },
    // After the booking is created, create the duplicated stays linked to the new booking
    onAfterCreate: async (newBookingId, extraPayload, queryClient) => {
      const stayCopies = extraPayload._stayCopies ?? [];
      if (stayCopies.length === 0) return;
      for (const stay of stayCopies) {
        await stayApi.create({ ...stay, bookingId: newBookingId });
      }
      await queryClient.invalidateQueries({ queryKey: ["bookings", "detail", newBookingId] });
    },
    onFieldChange: async (key, value, _data, setFields, mode) => {
      if (key === "bookerId") {
        if (value) {
          const contact = await fetchContactById(value);
          if (contact) {
            const bookerName = [contact.general?.firstName, contact.general?.lastName].filter(Boolean).join(" ");
            const patches = { bookerName };
            if (mode === "create" && contact.general?.companyId && !_data.companyId) {
              patches.companyId = contact.general.companyId;
              const company = await fetchCompanyById(contact.general.companyId);
              patches.companyName = company?.name ?? "";
            }
            setFields(patches);
          }
        } else {
          setFields({ bookerName: "" });
        }
      }
      if (key === "companyId") {
        if (value) {
          const company = await fetchCompanyById(value);
          setFields({ companyName: company?.name ?? "" });
        } else {
          setFields({ companyName: "" });
        }
      }
    },
    sections: [
      {
        rows: [
          {
            items: [
              {
                key: "confirmationNo",
                label: "Booking reference",
                type: "auto-generate",
                icon: "Hash",
                gridColumn: "span 2",
                autoGenerateConfig: {
                  generate: () => {
                    const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
                    const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "");
                    const rand = Array.from(
                      { length: 4 },
                      () => CHARSET[Math.floor(Math.random() * CHARSET.length)]
                    ).join("");
                    return `${date}-${rand}`;
                  }
                }
              },
              {
                key: "travelPeriodStart",
                label: "Travel Start",
                type: "date",
                icon: "CalendarArrowUp",
                readOnlyInEdit: true,
                hideInCreate: true,
                gridColumn: "span 2"
              },
              {
                key: "travelPeriodEnd",
                label: "Travel End",
                type: "date",
                icon: "CalendarArrowDown",
                readOnlyInEdit: true,
                hideInCreate: true,
                gridColumn: " span 2"
              },
              {
                key: "bookerId",
                label: "Booker",
                type: "search-reference",
                icon: "User",
                required: true,
                placeholder: "Search for a contact...",
                gridColumn: "span 2",
                gridRow: "2",
                searchConfig: {
                  entityType: "contacts",
                  fetchFunction: searchContacts,
                  fetchByIdFunction: fetchContactById,
                  displayFields: [
                    "general.firstName",
                    "general.lastName",
                    "general.email"
                  ],
                  selectedDisplayFields: [
                    "general.firstName",
                    "general.lastName"
                  ],
                  searchPlaceholder: "Search contacts by name or email..."
                }
              },
              {
                key: "companyId",
                label: "Client",
                type: "search-reference",
                icon: "Buildings",
                placeholder: "Search for a client...",
                gridColumn: "span 2",
                gridRow: "2",
                searchConfig: {
                  entityType: "companies",
                  fetchFunction: searchCompanies,
                  fetchByIdFunction: fetchCompanyById,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search companies by name..."
                }
              },
              {
                key: "confirmationDate",
                label: "Confirmation Date",
                type: "date",
                icon: "CalendarCheck",
                gridColumn: "span 2",
                hideInCreate: true
              }
            ]
          },
          {
            items: [
              {
                key: "costCentre",
                label: "Cost Centre",
                type: "text",
                icon: "CurrencyDollar",
                placeholder: "Enter cost centre",
                gridColumn: "span 2"
              },
              {
                key: "salesInvoice",
                label: "Sales Invoice",
                type: "text",
                icon: "Receipt",
                placeholder: "Enter invoice number",
                gridColumn: "3 / span 2"
              },
              {
                key: "status",
                label: "Status",
                type: "custom",
                readOnlyInEdit: true,
                hideInCreate: true,
                gridColumn: "span 2",
                component: bookingStatusBadgeField
              }
            ]
          },
          {
            items: [
              {
                key: "confirmationEntity",
                label: "Confirmation Entity",
                type: "select",
                gridColumn: "span 2",
                options: [
                  {
                    value: "Corporate Meeting Partner B.V.",
                    label: "CMP B.V."
                  },
                  {
                    value: "Corporate Meeting Partner (UK) Ltd.",
                    label: "CMP (UK) Ltd."
                  }
                ]
              },
              {
                key: "confirmationSent",
                label: "Confirmation Sent",
                type: "checkbox",
                icon: "PaperPlaneTilt",
                defaultValue: false,
                gridColumn: " 5 / span 4"
              }
            ]
          },
          {
            items: [
              {
                key: "notes",
                label: "Admin remarks (does NOT appear on confirmation)",
                type: "textarea",
                placeholder: "Enter any notes",
                gridColumn: "1 / span 4",
                gridRow: "1"
              },
              {
                kind: "group",
                label: "Confirmation",
                gridColumn: "5 / span 2",
                gridRow: "1 / span 2",
                columns: 1,
                fields: [
                  {
                    key: "pdfDownload",
                    label: "Confirmation PDF",
                    type: "custom",
                    component: DownloadPDFButtonField,
                    hideInCreate: true,
                    hideInEdit: true
                  },
                  {
                    key: "sendConfirmation",
                    label: "Send Confirmation",
                    type: "custom",
                    component: SendConfirmationButtonField,
                    hideInCreate: true,
                    hideInEdit: true
                  }
                ]
              },
              {
                key: "documents",
                label: "Documents",
                type: "file-upload",
                icon: "Paperclip",
                gridColumn: "1 / span 4",
                gridRow: "2",
                accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png",
                maxFileSize: 10 * 1024 * 1024,
                maxFiles: 10
              }
            ]
          },
          {
            items: [
              {
                key: "staySummaries",
                label: "Related Stays",
                type: "reference-table",
                gridColumn: "span 6",
                referenceConfig: {
                  entityType: "stays",
                  // fetchFunction is used as fallback and for modal row fetches
                  fetchFunction: fetchStaysByIds,
                  getEntityIds: (parentData) => (parentData?.staySummaries ?? []).map((s2) => s2.stayId).filter(Boolean),
                  columns: referenceColumnsFromConfig([
                    ...stayTableColumns,
                    { key: "price", label: "Price", icon: "CurrencyDollar", size: 120, minSize: 80 }
                  ]),
                  queryKey: "booking-stays",
                  emptyMessage: "No stays associated with this booking",
                  maxHeight: "400px",
                  modalConfig: {
                    get entityConfig() {
                      return makeStayConfig();
                    },
                    // Fetch full stay document when opening the modal
                    fetchById: async (id) => fetchStaysByIds([id]).then((stays) => stays[0]),
                    idKey: "stayId",
                    canAdd: true,
                    // Pre-fill the new stay with this booking's ID so the server
                    // can sync staySummaries back on save
                    getInitialData: (parentData) => ({
                      bookingId: parentData?._id?.$oid ?? parentData?._id
                    }),
                    onSave: async (data, isNew) => {
                      if (isNew) {
                        const created = await stayApi.create(data);
                        const id = typeof created._id === "object" ? created._id.$oid : String(created._id);
                        return id;
                      } else {
                        const id = typeof data._id === "object" ? data._id.$oid : String(data._id);
                        await stayApi.update(id, data);
                      }
                    },
                    // After creation the server has already synced staySummaries,
                    // so we only need to invalidate the booking query — no client-side
                    // mutation of parentData required.
                    onCreated: async (_newId, _parentData) => {
                    },
                    onDelete: async (data) => {
                      const id = data.stayId ?? (typeof data._id === "object" ? data._id.$oid : String(data._id));
                      await stayApi.remove(id);
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        // Filter-only section — invisible in panel, picked up by getFiltersFromConfig
        fields: [
          {
            key: "status",
            label: "Status",
            type: "select",
            hideInCreate: true,
            hideInEdit: true,
            hideInView: true,
            options: [
              { value: "all_cancelled", label: "All Cancelled" },
              { value: "coming_up", label: "Coming Up" },
              { value: "in_progress", label: "In Progress" },
              { value: "incomplete", label: "Incomplete" },
              { value: "doc_missing", label: "↳ Doc Missing", field: "subStatus" },
              { value: "payment_pending", label: "↳ Payment Pending", field: "subStatus" },
              { value: "action_required", label: "↳ Action Required", field: "subStatus" },
              { value: "finished", label: "Finished" }
            ]
          }
        ]
      }
    ]
  };
}
const ROOM_TYPE_SUGGESTIONS = [
  "Classic Double Room",
  "Classic KING Room",
  "Classic Room",
  "Classic Single Room",
  "Classic TWIN Room",
  "Comfort Double Room",
  "Comfort KING room",
  "Comfort Room",
  "Comfort Twin Room",
  "Deluxe Double Room",
  "Deluxe KING Room",
  "Deluxe King Room",
  "Deluxe Queen Room",
  "Deluxe Room",
  "Double Room",
  "Executive Double Room",
  "Executive King Room",
  "Executive Room",
  "Executive Studio",
  "Junior Suite",
  "KING Room",
  "King Guest Room",
  "King Room",
  "King Superior Room",
  "Premium Double Room",
  "Premium King Room",
  "Premium Room",
  "Queen Room",
  "Standard Double Room",
  "Standard KING Room",
  "Standard King Room",
  "Standard Queen Room",
  "Standard Room",
  "Standard Single Room",
  "Standard TWIN Room",
  "Standard Twin Room",
  "Studio Suite",
  "Superior Double Room",
  "Superior KING Room",
  "Superior King Room",
  "Superior Queen Room",
  "Superior Room",
  "Superior Suite",
  "Superior TWIN Room",
  "Superior Twin Room",
  "Twin Room"
];
function makeHotelConfig() {
  return {
    title: "Hotel",
    titles: {
      view: "Hotel Details",
      edit: "Edit Hotel",
      create: "New Hotel"
    },
    gridColumns: 6,
    columns: [
      { key: "name", label: "Hotel Name", icon: "BuildingApartment", bold: true, size: 250, minSize: 150 },
      {
        key: "address",
        label: "Address",
        icon: "MapPin",
        sortable: false,
        type: "custom",
        size: 200,
        minSize: 150,
        cell: (row) => {
          const parts = [row.address, row.postal_code].filter(Boolean).join(", ");
          return parts || "-";
        }
      },
      { key: "city", label: "City", icon: "MapPin", size: 150, minSize: 100 },
      {
        key: "country",
        label: "Country",
        icon: "Globe",
        size: 120,
        minSize: 100,
        formatValue: (v) => typeof v === "string" ? v.toUpperCase() : v
      },
      { key: "phone", label: "Phone", icon: "Phone", sortable: false, size: 150, minSize: 120 },
      { key: "email", label: "Email", icon: "Envelope", size: 200, minSize: 150 },
      { key: "creditDetails", label: "Credit Details", icon: "CreditCard", sortable: true, size: 200, minSize: 150 },
      { key: "commissionDetails", label: "Commission Details", icon: "Percent", sortable: false, size: 200, minSize: 150 }
    ],
    defaultValues: {
      roomTypes: []
    },
    canCreate: true,
    canEdit: true,
    canDelete: true,
    sections: [
      {
        rows: [
          {
            items: [
              {
                kind: "group",
                label: "Name, Address, City",
                gridColumn: "span 6",
                columns: 2,
                fields: [
                  {
                    key: "name",
                    label: "Hotel Name",
                    type: "text",
                    required: true,
                    placeholder: "Enter hotel name",
                    gridColumn: "span 2"
                  },
                  {
                    key: "address",
                    label: "Address",
                    type: "text",
                    placeholder: "Enter street address"
                  },
                  {
                    key: "country",
                    label: "Country",
                    type: "text",
                    placeholder: "e.g., NL, ES, FR"
                  },
                  {
                    key: "postal_code",
                    label: "Postal Code",
                    type: "text",
                    placeholder: "Enter postal code"
                  },
                  {
                    key: "city",
                    label: "City",
                    type: "text",
                    placeholder: "Enter city"
                  }
                ]
              }
            ]
          },
          {
            items: [
              {
                key: "email",
                label: "Email",
                type: "email",
                icon: "Envelope",
                placeholder: "Enter email address",
                gridColumn: "span 3"
              },
              {
                key: "phone",
                label: "Phone",
                type: "phone",
                icon: "Phone",
                placeholder: "Enter phone number",
                gridColumn: "span 2"
              }
            ]
          },
          {
            items: [
              {
                key: "roomTypes",
                label: "Room Types",
                type: "tag-input",
                icon: "Bed",
                placeholder: "Type to search or add room types...",
                gridColumn: "span 3",
                suggestions: ROOM_TYPE_SUGGESTIONS
              },
              {
                key: "parentHotelId",
                label: "Parent Hotel",
                type: "search-reference",
                icon: "BuildingApartment",
                placeholder: "Search for a hotel...",
                gridColumn: "span 3",
                searchConfig: {
                  entityType: "hotels",
                  fetchFunction: searchHotels,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search hotels by name..."
                }
              }
            ]
          },
          {
            items: [
              {
                key: "creditDetails",
                label: "Credit Details",
                type: "textarea",
                placeholder: "Enter credit details",
                rows: 4,
                gridColumn: "span 3"
              },
              {
                key: "commissionDetails",
                label: "Commission Details",
                type: "textarea",
                placeholder: "Enter commission details",
                rows: 4,
                gridColumn: "span 3"
              }
            ]
          },
          {
            items: [
              {
                key: "notes",
                label: "Notes",
                type: "textarea",
                placeholder: "Enter any additional notes",
                rows: 4,
                gridColumn: "span 6"
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Stays",
                type: "inverse-reference",
                gridColumn: "span 6",
                inverseReferenceConfig: {
                  entityType: "stays",
                  fetchFunction: fetchStaysByHotelId,
                  columns: referenceColumnsFromConfig(stayTableColumns),
                  queryKey: "hotel-stays",
                  defaultVisibleColumns: ["guestIds", "checkInDate", "checkOutDate", "roomType", "status"],
                  emptyMessage: "No stays for this hotel",
                  routePath: "/stays"
                }
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Contacts",
                type: "inverse-reference",
                gridColumn: "span 6",
                inverseReferenceConfig: {
                  entityType: "contacts",
                  fetchFunction: fetchContactsByHotelId,
                  columns: referenceColumnsFromConfig(contactTableColumns),
                  queryKey: "hotel-contacts",
                  defaultVisibleColumns: ["general.firstName", "general.lastName", "general.role", "general.email"],
                  emptyMessage: "No contacts for this hotel",
                  routePath: "/contacts"
                }
              }
            ]
          }
        ]
      }
    ]
  };
}
function makeCompanyConfig() {
  return {
    title: "Client",
    titles: {
      view: "Client Details",
      edit: "Edit Client",
      create: "New Client"
    },
    gridColumns: 6,
    columns: [
      { key: "name", label: "Client Name", bold: true, size: 300, minSize: 200, icon: "Buildings" },
      {
        key: "address",
        label: "Address",
        sortable: false,
        type: "custom",
        icon: "MapPin",
        size: 250,
        minSize: 150,
        cell: (row) => {
          const parts = [row.address, row.postal_code].filter(Boolean).join(", ");
          return parts || "-";
        }
      },
      { key: "city", label: "City", size: 150, minSize: 100, icon: "MapPin" },
      {
        key: "country",
        label: "Country",
        size: 120,
        minSize: 100,
        icon: "Globe",
        formatValue: (v) => typeof v === "string" ? v.toUpperCase() : v
      },
      { key: "phone", label: "Phone", icon: "Phone", sortable: true, size: 200, minSize: 150 },
      { key: "email", label: "E-mail", icon: "Envelope", sortable: true, size: 200, minSize: 150 },
      { key: "remarks", label: "Remarks", icon: "ChatCircle", sortable: false, size: 200, minSize: 150 }
      // { key: 'parentCompanyName', label: 'Parent Client', size: 250, minSize: 150, icon: 'Briefcase' },
    ],
    defaultValues: {
      version: "1.0"
    },
    canCreate: true,
    canEdit: true,
    canDelete: true,
    sections: [
      {
        rows: [
          {
            items: [
              {
                kind: "group",
                label: "Name, Address, City",
                gridColumn: "span 6",
                columns: 2,
                fields: [
                  {
                    key: "name",
                    label: "Client Name",
                    type: "text",
                    required: true,
                    placeholder: "Enter client name",
                    gridColumn: "span 2"
                  },
                  {
                    key: "address",
                    label: "Address",
                    type: "text",
                    placeholder: "Enter street address"
                  },
                  {
                    key: "country",
                    label: "Country",
                    type: "text",
                    placeholder: "e.g., NL, DE, FR"
                  },
                  {
                    key: "postal_code",
                    label: "Postal Code",
                    type: "text",
                    placeholder: "Enter postal code"
                  },
                  {
                    key: "city",
                    label: "City",
                    type: "text",
                    placeholder: "Enter city"
                  }
                ]
              }
            ]
          },
          {
            items: [
              {
                key: "email",
                label: "E-mail",
                type: "email",
                icon: "Envelope",
                placeholder: "you@company.com",
                gridColumn: "span 3"
              },
              {
                key: "phone",
                label: "Phone number",
                type: "phone",
                icon: "Phone",
                placeholder: "0600000000",
                gridColumn: "span 2"
              }
            ]
          },
          {
            items: [
              {
                key: "remarks",
                label: "Remarks",
                type: "textarea",
                placeholder: "Enter any remarks",
                rows: 4,
                gridColumn: "span 3"
              },
              {
                key: "parentCompanyId",
                label: "Parent Client",
                type: "search-reference",
                placeholder: "Search for a client...",
                gridColumn: "span 3",
                icon: "Briefcase",
                searchConfig: {
                  entityType: "companies",
                  fetchFunction: searchCompanies,
                  fetchByIdFunction: fetchCompanyById,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search companies by name..."
                }
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Contacts",
                type: "inverse-reference",
                gridColumn: "span 6",
                inverseReferenceConfig: {
                  entityType: "contacts",
                  fetchFunction: fetchContactsByCompanyId,
                  columns: referenceColumnsFromConfig(contactTableColumns),
                  queryKey: "company-contacts",
                  defaultVisibleColumns: [
                    "general.firstName",
                    "general.lastName",
                    "general.role",
                    "general.email",
                    "general.phone"
                  ],
                  emptyMessage: "No contacts for this client",
                  routePath: "/contacts"
                }
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Bookings",
                type: "inverse-reference",
                gridColumn: "span 6",
                inverseReferenceConfig: {
                  entityType: "bookings",
                  fetchFunction: fetchBookingsByCompanyId,
                  columns: referenceColumnsFromConfig(bookingTableColumns),
                  queryKey: "company-bookings",
                  defaultVisibleColumns: [
                    "confirmationNo",
                    "bookerName",
                    "status",
                    "travelPeriodStart",
                    "travelPeriodEnd"
                  ],
                  emptyMessage: "No bookings for this client",
                  routePath: "/bookings"
                }
              }
            ]
          }
        ]
      }
    ]
  };
}
function makeContactConfig() {
  return {
    title: "Contact",
    titles: {
      view: "Contact Details",
      edit: "Edit Contact",
      create: "New Contact"
    },
    gridColumns: 6,
    columns: [
      {
        key: "general.role",
        label: "Role",
        icon: "SealCheck",
        size: 150,
        minSize: 100,
        formatValue: (v) => {
          const labels = {
            booker: "Booker",
            guest: "Guest",
            supplierContact: "Supplier Contact",
            companyContact: "Client Contact",
            both: "Booker & Guest"
          };
          return labels[v] ?? v;
        }
      },
      { key: "general.firstName", label: "First Name", icon: "User", bold: true, size: 180, minSize: 120 },
      { key: "general.lastName", label: "Last Name", icon: "User", bold: true, size: 180, minSize: 120 },
      { key: "general.email", label: "Email", icon: "Envelope", size: 250, minSize: 180 },
      { key: "general.phone", label: "Phone", icon: "Phone", sortable: false, size: 180, minSize: 120 },
      { key: "general.remarks", label: "Remarks", icon: "ChatCircle", sortable: false, size: 200, minSize: 150 }
    ],
    defaultValues: {
      general: {
        firstName: "",
        lastName: "",
        role: "booker"
      }
    },
    canCreate: true,
    canEdit: true,
    canDelete: true,
    sections: [
      {
        rows: [
          {
            items: [
              {
                kind: "group",
                label: "Name, Address, City",
                gridColumn: "span 6",
                gridRow: "1 / span 3",
                columns: 2,
                fields: [
                  {
                    key: "general.firstName",
                    label: "First Name",
                    type: "text",
                    required: true,
                    placeholder: "Enter first name"
                  },
                  {
                    key: "general.lastName",
                    label: "Last Name",
                    type: "text",
                    required: true,
                    placeholder: "Enter last name"
                  },
                  {
                    key: "general.address",
                    label: "Address",
                    type: "text",
                    placeholder: "Enter street address"
                  },
                  {
                    key: "general.country",
                    label: "Country",
                    type: "text",
                    placeholder: "e.g., NL, DE, FR"
                  },
                  {
                    key: "general.postalCode",
                    label: "Postal Code",
                    type: "text",
                    placeholder: "Enter postal code"
                  },
                  {
                    key: "general.city",
                    label: "City",
                    type: "text",
                    placeholder: "Enter city"
                  }
                ]
              }
            ]
          },
          {
            items: [
              {
                key: "general.email",
                label: "Email",
                type: "email",
                icon: "Envelope",
                placeholder: "Enter email address",
                gridColumn: "span 3"
              },
              {
                key: "general.phone",
                label: "Phone",
                type: "phone",
                icon: "Phone",
                placeholder: "Enter phone number",
                gridColumn: "span 2"
              }
            ]
          },
          {
            items: [
              // {
              //   key: 'general.title',
              //   label: 'Title',
              //   type: 'select',
              //   options: [
              //     { value: 'mr', label: 'Mr.' },
              //     { value: 'ms', label: 'Ms.' },
              //     { value: 'mrs', label: 'Mrs.' },
              //     { value: 'dr', label: 'Dr.' },
              //   ],
              //   gridColumn: 'span 3',
              // },
              {
                key: "general.role",
                label: "Role",
                type: "select",
                icon: "SealCheck",
                options: [
                  { value: "booker", label: "Booker" },
                  { value: "guest", label: "Guest" },
                  { value: "supplierContact", label: "Supplier Contact" },
                  { value: "companyContact", label: "Client Contact" },
                  { value: "both", label: "Booker & Guest" }
                ],
                defaultValue: "booker",
                gridColumn: "span 3"
              },
              {
                key: "general.companyId",
                label: "Client",
                type: "search-reference",
                icon: "Buildings",
                placeholder: "Search for a client...",
                gridColumn: "span 3",
                searchConfig: {
                  entityType: "companies",
                  fetchFunction: searchCompanies,
                  fetchByIdFunction: fetchCompanyById,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search companies by name..."
                }
              },
              {
                key: "general.hotelId",
                label: "Hotel",
                type: "search-reference",
                icon: "BuildingApartment",
                placeholder: "Search for a hotel...",
                gridColumn: "span 3",
                searchConfig: {
                  entityType: "hotels",
                  fetchFunction: searchHotels,
                  fetchByIdFunction: fetchHotelById,
                  displayFields: ["name", "city", "country"],
                  selectedDisplayFields: ["name"],
                  searchPlaceholder: "Search hotels by name, city, or country..."
                }
              },
              {
                key: "general.remarks",
                label: "Remarks",
                type: "textarea",
                placeholder: "Enter any remarks",
                rows: 4,
                gridColumn: "span 6"
              }
            ]
          },
          {
            items: [
              {
                key: "_id.$oid",
                label: "Bookings as booker",
                type: "inverse-reference",
                hideLabel: false,
                gridColumn: "span 6",
                conditionalRender: (data) => {
                  const role = data?.general?.role;
                  return role === "booker" || role === "both";
                },
                inverseReferenceConfig: {
                  entityType: "bookings",
                  fetchFunction: fetchBookingsByBookerId,
                  columns: referenceColumnsFromConfig(bookingTableColumns),
                  queryKey: "contact-bookings",
                  defaultVisibleColumns: ["confirmationNo", "companyName", "status", "travelPeriodStart"],
                  emptyMessage: "No bookings for this contact",
                  maxHeight: "400px",
                  routePath: "/bookings"
                }
              },
              {
                key: "_id.$oid",
                label: "Stays as guest",
                type: "inverse-reference",
                hideLabel: false,
                gridColumn: "span 6",
                conditionalRender: (data) => {
                  const role = data?.general?.role;
                  return role === "guest" || role === "both";
                },
                inverseReferenceConfig: {
                  entityType: "stays",
                  fetchFunction: fetchStaysByGuestId,
                  columns: referenceColumnsFromConfig(stayTableColumns),
                  queryKey: "contact-stays",
                  defaultVisibleColumns: ["hotelName", "checkInDate", "checkOutDate", "status"],
                  emptyMessage: "No stays for this contact",
                  maxHeight: "400px",
                  routePath: "/stays"
                }
              }
            ]
          }
        ]
      }
    ]
  };
}
const configFactories = {
  bookings: makeBookingConfig,
  stays: makeStayConfig,
  hotels: makeHotelConfig,
  companies: makeCompanyConfig,
  contacts: makeContactConfig
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(s$7, { className: cn("size-4", className2), weight: "light", ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              s$8,
              {
                className: cn("size-4", className2),
                weight: "light",
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(s$3, { className: cn("size-4", className2), weight: "light", ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger$1, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2$1,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s$3, { className: "size-4 opacity-50", weight: "light" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$3, { className: "size-4", weight: "light" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(s$6, { className: "size-4", weight: "light" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(s$3, { className: "size-4", weight: "light" })
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function DataTableServer({
  columns,
  fetchData,
  queryKey,
  onRowClick,
  searchPlaceholder = "Search...",
  defaultPageSize = 10,
  headerActions,
  filters = [],
  activeRowId,
  getRowId
}) {
  const validColumnIds = reactExports.useMemo(() => {
    const ids = /* @__PURE__ */ new Set();
    for (const col of columns) {
      const id = col.id ?? col.accessorKey;
      if (id) ids.add(String(id));
    }
    return ids;
  }, [columns]);
  const [sorting, setSorting] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(`table-sorting:${queryKey}`);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return parsed.filter((s2) => validColumnIds.has(s2.id));
    } catch {
      return [];
    }
  });
  const [columnOrder, setColumnOrder] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(`table-column-order:${queryKey}`);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((id) => validColumnIds.has(id));
      return filtered.length === parsed.length ? filtered : [];
    } catch {
      return [];
    }
  });
  const [rowSelection, setRowSelection] = reactExports.useState({});
  const [globalFilter, setGlobalFilter] = reactExports.useState("");
  const [debouncedFilter, setDebouncedFilter] = reactExports.useState("");
  const [activeFilters, setActiveFilters] = reactExports.useState({});
  const [activeDateFilters, setActiveDateFilters] = reactExports.useState({});
  const [filterResetKey, setFilterResetKey] = reactExports.useState(0);
  const [pagination, setPagination] = reactExports.useState({
    pageIndex: 0,
    pageSize: defaultPageSize
  });
  reactExports.useEffect(() => {
    localStorage.setItem(`table-sorting:${queryKey}`, JSON.stringify(sorting));
  }, [sorting, queryKey]);
  reactExports.useEffect(() => {
    if (columnOrder.length > 0) {
      localStorage.setItem(`table-column-order:${queryKey}`, JSON.stringify(columnOrder));
    }
  }, [columnOrder, queryKey]);
  reactExports.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilter(globalFilter);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [globalFilter]);
  const resolvedFilters = reactExports.useMemo(() => {
    const resolved = {};
    for (const [columnId, value] of Object.entries(activeFilters)) {
      const filter = filters.find((f2) => f2.columnId === columnId);
      const option = filter?.type === "select" ? filter.options.find((o) => o.value === value) : void 0;
      const targetField = option?.field ?? columnId;
      resolved[targetField] = value;
    }
    return resolved;
  }, [activeFilters, filters]);
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, debouncedFilter, pagination.pageIndex, pagination.pageSize, sorting, resolvedFilters, activeDateFilters],
    queryFn: () => fetchData({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      search: debouncedFilter,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0] ? sorting[0].desc ? "desc" : "asc" : void 0,
      filters: resolvedFilters,
      dateFilters: activeDateFilters
    }),
    placeholderData: (previousData) => previousData
  });
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount ?? -1,
    state: { sorting, columnOrder: columnOrder.length > 0 ? ["select", ...columnOrder.filter((id) => id !== "select" && id !== "actions"), "actions"] : columnOrder, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true
  });
  const [isExporting, setIsExporting] = reactExports.useState(false);
  const handleExportCsv = reactExports.useCallback(async () => {
    setIsExporting(true);
    try {
      const allData = await fetchData({
        page: 0,
        pageSize: 999999,
        search: debouncedFilter,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0] ? sorting[0].desc ? "desc" : "asc" : void 0,
        filters: resolvedFilters,
        dateFilters: activeDateFilters
      });
      const visibleColumns = table.getVisibleLeafColumns().filter((col) => col.id !== "select" && col.id !== "actions");
      const headers = visibleColumns.map((col) => col.id);
      const escapeCsv = (value) => {
        const str = value == null ? "" : String(value);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };
      const rows = allData.data.map(
        (row) => visibleColumns.map((col) => {
          const value = row[col.id];
          return escapeCsv(value);
        }).join(",")
      );
      const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const date = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
      link.href = url;
      link.download = `${queryKey}-export-${date}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }, [fetchData, debouncedFilter, sorting, activeFilters, activeDateFilters, table, queryKey]);
  const hasActiveFilters = Object.keys(activeFilters).length > 0 || Object.keys(activeDateFilters).length > 0 || globalFilter !== "";
  const tableColumnIds = new Set(table.getAllColumns().map((c2) => c2.id));
  const visibleFilters = filters.filter((f2) => tableColumnIds.has(f2.columnId));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "@container flex-1 min-w-0 min-h-0 flex flex-col overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(f, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground", weight: "light" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: searchPlaceholder,
            value: globalFilter,
            onChange: (e) => setGlobalFilter(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      visibleFilters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden @3xl:inline-flex items-center", children: [
        visibleFilters.map((filter, index) => {
          const isFirst = index === 0;
          const isLast = index === visibleFilters.length - 1 && !hasActiveFilters;
          const roundedClass = cn(
            !isFirst && "-ml-px rounded-l-none",
            !isLast && "rounded-r-none"
          );
          return filter.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: activeFilters[filter.columnId] ?? "all",
              onValueChange: (value) => {
                setActiveFilters((prev) => {
                  if (value === "all") {
                    const { [filter.columnId]: _, ...rest } = prev;
                    return rest;
                  }
                  return { ...prev, [filter.columnId]: value };
                });
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: cn("h-9 w-auto", roundedClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: filter.label }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "all", children: [
                    "All ",
                    filter.label
                  ] }),
                  filter.options.filter((option) => option.value !== "").map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value))
                ] })
              ]
            },
            filter.columnId
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            DateRangeFilterButton,
            {
              filter,
              value: activeDateFilters[filter.columnId],
              className: roundedClass,
              onChange: (range) => {
                setActiveDateFilters((prev) => {
                  if (!range) {
                    const { [filter.columnId]: _, ...rest } = prev;
                    return rest;
                  }
                  return { ...prev, [filter.columnId]: range };
                });
                setPagination((prev) => ({ ...prev, pageIndex: 0 }));
              }
            },
            `${filter.columnId}-${filterResetKey}`
          );
        }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "-ml-px rounded-l-none h-9 gap-1",
            onClick: () => {
              setActiveFilters({});
              setActiveDateFilters({});
              setGlobalFilter("");
              setFilterResetKey((k) => k + 1);
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(i, { className: "h-3 w-3", weight: "light" }),
              "Reset"
            ]
          }
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(s, { className: "h-4 w-4 animate-spin", weight: "light" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-r-none", onClick: handleExportCsv, disabled: isExporting, children: isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(s, { className: "h-4 w-4 animate-spin", weight: "light" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s$1, { className: "h-4 w-4", weight: "light" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ColumnSettingsPopover,
            {
              table,
              columnOrder,
              onColumnOrderChange: setColumnOrder,
              buttonClassName: "rounded-l-none -ml-px"
            }
          )
        ] }),
        headerActions
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("overflow-x-auto px-6", activeRowId && "pr-0"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { style: { tableLayout: "fixed", width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: headerGroup.headers.map((header) => {
        const isActions = header.column.id === "actions";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableHead,
          {
            style: { width: header.getSize() },
            className: isActions && !activeRowId ? "sticky right-0 z-20 bg-background" : "",
            children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
          },
          header.id
        );
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s, { className: "h-6 w-6 animate-spin", weight: "light" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading..." })
      ] }) }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center text-red-500", children: "Error loading data" }) }) : table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => {
        const isActive = activeRowId != null && getRowId != null && getRowId(row.original) === activeRowId;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableRow,
          {
            "data-state": row.getIsSelected() ? "selected" : isActive ? "selected" : void 0,
            onClick: () => onRowClick?.(row.original),
            className: onRowClick ? "cursor-pointer" : "",
            children: row.getVisibleCells().map((cell) => {
              const isActions = cell.column.id === "actions";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableCell,
                {
                  style: { width: cell.column.getSize() },
                  className: isActions && !activeRowId ? "sticky right-0 bg-[hsl(var(--background))] [tr[data-state=selected]_&]:bg-[hsl(var(--muted))] truncate" : "truncate",
                  children: flexRender(cell.column.columnDef.cell, cell.getContext())
                },
                cell.id
              );
            })
          },
          row.id
        );
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden @3xl:flex flex-1 text-sm text-muted-foreground", children: [
        data?.totalRows ?? 0,
        " result(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden @2xl:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Rows per page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: `${pagination.pageSize}`,
              onValueChange: (value) => table.setPageSize(Number(value)),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: pagination.pageSize }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { side: "top", children: [10, 20, 30, 40, 50].map((pageSize) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
          "Page ",
          pagination.pageIndex + 1,
          " of ",
          table.getPageCount()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "rounded-r-none",
              onClick: () => table.previousPage(),
              disabled: !table.getCanPreviousPage() || isLoading,
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "rounded-l-none -ml-px",
              onClick: () => table.nextPage(),
              disabled: !table.getCanNextPage() || isLoading,
              children: "Next"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SortableColumnItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: "flex items-center gap-1 rounded-sm px-1 py-1.5 text-sm capitalize hover:bg-accent",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "cursor-grab touch-none text-muted-foreground hover:text-foreground",
            ...attributes,
            ...listeners,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(m$2, { className: "h-4 w-4", weight: "light" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: label })
      ]
    }
  );
}
function ColumnSettingsPopover({ table, columnOrder, onColumnOrderChange, buttonClassName }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const reorderable = table.getAllColumns().filter((c2) => c2.id !== "select" && c2.id !== "actions");
  const orderedColumns = columnOrder.length > 0 ? [...reorderable].sort((a2, b) => {
    const aIdx = columnOrder.indexOf(a2.id);
    const bIdx = columnOrder.indexOf(b.id);
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  }) : reorderable;
  const columnIds = orderedColumns.map((c2) => c2.id);
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = columnIds.indexOf(active.id);
    const newIndex = columnIds.indexOf(over.id);
    const newOrder = arrayMove(columnIds, oldIndex, newIndex);
    onColumnOrderChange(newOrder);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: buttonClassName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(l, { className: "h-4 w-4", weight: "light" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { align: "end", className: "w-52 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: columnIds, strategy: verticalListSortingStrategy, children: orderedColumns.map((column) => {
      const label = column.columnDef.meta?.label ?? column.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SortableColumnItem,
        {
          id: column.id,
          label
        },
        column.id
      );
    }) }) }) })
  ] });
}
function DateRangeFilterButton({
  filter,
  value,
  onChange,
  className
}) {
  const [dateRange, setDateRange] = reactExports.useState(
    value ? { from: new Date(value.from), to: new Date(value.to) } : void 0
  );
  const handleSelect = (range) => {
    setDateRange(range);
    if (range?.from && range.to) {
      onChange({
        from: format(range.from, "yyyy-MM-dd"),
        to: format(range.to, "yyyy-MM-dd")
      });
    }
  };
  const handleClear = (e) => {
    e.stopPropagation();
    setDateRange(void 0);
    onChange(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: cn(
          "h-9 gap-2 font-normal",
          !value && "text-muted-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s$4, { className: "h-4 w-4", weight: "light" }),
          value ? `${format(new Date(value.from), "MMM d")} - ${format(new Date(value.to), "MMM d")}` : filter.label,
          value && /* @__PURE__ */ jsxRuntimeExports.jsx(
            n$2,
            {
              className: "h-3 w-3 opacity-50 hover:opacity-100",
              weight: "light",
              onClick: handleClear
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Calendar,
      {
        mode: "range",
        selected: dateRange,
        onSelect: handleSelect,
        numberOfMonths: 2
      }
    ) })
  ] });
}
function getFiltersFromConfig(config) {
  return config.sections.flatMap((section) => {
    const allFields = [];
    if (section.rows) {
      for (const row of section.rows) {
        for (const item of row.items) {
          if (item.kind === "group") {
            allFields.push(...item.fields);
          } else {
            allFields.push(item);
          }
        }
      }
    } else if (section.fields) {
      allFields.push(...section.fields);
    }
    return allFields.filter((field) => field.type === "select" && field.options || field.type === "date").map((field) => {
      if (field.type === "select") {
        return { type: "select", columnId: field.key, label: field.label, options: field.options };
      }
      return { type: "dateRange", columnId: field.key, label: field.label };
    });
  });
}
function CopyableValue({ value, className }) {
  const [copied, setCopied] = reactExports.useState(false);
  const isEmpty = !value || value === "-";
  const handleCopy = () => {
    if (isEmpty) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard", { duration: 1500 });
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group flex items-start gap-1 min-w-0",
        !isEmpty && "cursor-copy"
      ),
      onClick: handleCopy,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: cn("text-sm text-foreground truncate flex-1 select-none", className),
            title: value,
            children: value
          }
        ),
        !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground mt-px", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(n$3, { className: "size-3.5", weight: "light" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s$2, { className: "size-3.5", weight: "light" }) })
      ]
    }
  );
}
function TextField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: formatValue(value, field) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: field.key,
        type: field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text",
        value: typeof value === "object" ? "" : value || "",
        onChange: (e) => onChange(e.target.value),
        placeholder: field.placeholder,
        className: error ? "border-destructive" : ""
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function TextareaField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: formatValue(value, field), className: "line-clamp-3 whitespace-pre-wrap" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        id: field.key,
        value: value || "",
        onChange: (e) => onChange(e.target.value),
        placeholder: field.placeholder,
        rows: 1,
        className: `flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${error ? "border-destructive" : ""}`,
        style: { fieldSizing: "content", minHeight: 0 }
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
const CUSTOM_SENTINEL = "__custom__";
function SelectField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  const hasCustomOption = field.options?.some((o) => o.value === CUSTOM_SENTINEL);
  const isKnownValue = field.options?.some((o) => o.value === value);
  const isCustomActive = hasCustomOption && value !== void 0 && value !== null && value !== "" && !isKnownValue;
  const [customMode, setCustomMode] = reactExports.useState(isCustomActive);
  const [customText, setCustomText] = reactExports.useState(isCustomActive ? value : "");
  reactExports.useEffect(() => {
    if (isCustomActive) {
      setCustomMode(true);
      setCustomText(value);
    }
  }, []);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: formatValue(value, field) })
    ] });
  }
  const handleSelectChange = (newValue) => {
    if (newValue === CUSTOM_SENTINEL) {
      setCustomMode(true);
      setCustomText("");
      onChange("");
    } else {
      setCustomMode(false);
      setCustomText("");
      onChange(newValue);
    }
  };
  const handleCustomTextChange = (text) => {
    setCustomText(text);
    onChange(text);
  };
  const handleBackToSelect = () => {
    setCustomMode(false);
    setCustomText("");
    onChange("");
  };
  if (customMode) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: field.key,
            value: customText,
            onChange: (e) => handleCustomTextChange(e.target.value),
            placeholder: "Type custom value...",
            className: `flex-1 ${error ? "border-destructive" : ""}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleBackToSelect,
            className: "text-xs text-muted-foreground hover:text-foreground px-2",
            children: "✕"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: value || "", onValueChange: handleSelectChange, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: error ? "border-destructive" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: field.placeholder || "Select an option" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: field.options?.filter((option) => option.value !== "").map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function CheckboxField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  const checked = Boolean(value);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: formatValue(value, field) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          id: field.key,
          checked,
          onCheckedChange: (checked2) => onChange(Boolean(checked2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function DateField({ field, value, onChange, mode, error, allData }) {
  const readOnly = isFieldReadOnly(field, mode);
  const [open, setOpen] = reactExports.useState(false);
  const minDate = field.minDateField && allData?.[field.minDateField] ? new Date(allData[field.minDateField]) : void 0;
  const parseDateValue = (val) => {
    if (!val) return void 0;
    const date = new Date(val);
    if (isNaN(date.getTime())) return void 0;
    return date;
  };
  const dateValue = parseDateValue(value);
  const handleDateSelect = (date) => {
    if (date) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      onChange(`${yyyy}-${mm}-${dd}`);
      setOpen(false);
    }
  };
  const formatForInput = (val) => {
    if (!val) return "";
    const date = new Date(val);
    if (isNaN(date.getTime())) return "";
    if (field.type === "datetime") {
      return date.toISOString().slice(0, 16);
    }
    return date.toISOString().slice(0, 10);
  };
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: formatValue(value, field) })
    ] });
  }
  if (field.type === "datetime") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: field.key,
          type: "datetime-local",
          value: formatForInput(value),
          onChange: (e) => onChange(e.target.value),
          placeholder: field.placeholder,
          className: error ? "border-destructive" : ""
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground",
            error && "border-destructive"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(s$4, { className: "mr-2 h-4 w-4 shrink-0", weight: "light" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: dateValue ? dateValue.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "/") : field.placeholder || "Pick a date" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Calendar,
        {
          mode: "single",
          selected: dateValue,
          onSelect: handleDateSelect,
          disabled: minDate ? (date) => date < minDate : void 0,
          defaultMonth: minDate ?? dateValue,
          initialFocus: true
        }
      ) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function ArrayField({ field, value, onChange, mode, error, allData }) {
  const readOnly = isFieldReadOnly(field, mode);
  const arrayValue = Array.isArray(value) ? value : [];
  const hasItemConfig = field.arrayItemConfig?.fields && field.arrayItemConfig.fields.length > 0;
  if (!hasItemConfig) {
    if (readOnly) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", title: formatValue(value, field), children: formatValue(value, field) })
      ] });
    }
    const handleChange = (val) => {
      const items = val.split(",").map((item) => item.trim()).filter(Boolean);
      onChange(items);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: field.key,
          type: "text",
          value: arrayValue.join(", "),
          onChange: (e) => handleChange(e.target.value),
          placeholder: field.placeholder || "Comma-separated values",
          className: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${error ? "border-destructive" : ""}`
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
    ] });
  }
  const itemFields = field.arrayItemConfig.fields;
  if (readOnly) {
    if (arrayValue.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No items" })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: arrayValue.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-muted/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: itemFields.map((itemField) => {
        const fieldValue = item[itemField.key];
        const displayValue = itemField.type === "password" ? fieldValue ? "••••••••" : "-" : formatValue(fieldValue, itemField);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: itemField.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", title: displayValue, children: displayValue })
        ] }, itemField.key);
      }) }) }, index)) })
    ] });
  }
  const handleItemChange = (index, fieldKey, newValue) => {
    const newArray = [...arrayValue];
    newArray[index] = { ...newArray[index], [fieldKey]: newValue };
    onChange(newArray);
  };
  const handleAddItem = () => {
    const newItem = {};
    itemFields.forEach((f2) => {
      newItem[f2.key] = f2.defaultValue ?? "";
    });
    onChange([...arrayValue, newItem]);
  };
  const handleRemoveItem = (index) => {
    const newArray = arrayValue.filter((_, i2) => i2 !== index);
    onChange(newArray);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: arrayValue.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: itemFields.map((itemField) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldRenderer,
        {
          field: { ...itemField, key: `${field.key}[${index}].${itemField.key}` },
          value: item[itemField.key],
          onChange: (newValue) => handleItemChange(index, itemField.key, newValue),
          mode,
          allData
        }
      ) }, itemField.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
          onClick: () => handleRemoveItem(index),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$1, { className: "h-4 w-4", weight: "light" })
        }
      )
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        onClick: handleAddItem,
        className: "w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n, { className: "h-4 w-4 mr-2", weight: "light" }),
          "Add ",
          field.label?.replace(/s$/, "") || "Item"
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function ReferenceTable({
  entityType,
  entityIds,
  fetchFunction,
  queryKey,
  inlineData,
  columns,
  onRowClick,
  onDuplicate,
  onDelete,
  headerActions,
  emptyMessage = "No related items",
  maxHeight,
  className = ""
}) {
  const [sorting, setSorting] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(`referenceTable-${queryKey}-sorting`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [columnOrder, setColumnOrder] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(`referenceTable-${queryKey}-columnOrder`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  reactExports.useEffect(() => {
    if (columnOrder.length > 0) {
      localStorage.setItem(`referenceTable-${queryKey}-columnOrder`, JSON.stringify(columnOrder));
    }
  }, [columnOrder, queryKey]);
  reactExports.useEffect(() => {
    localStorage.setItem(`referenceTable-${queryKey}-sorting`, JSON.stringify(sorting));
  }, [sorting, queryKey]);
  const { data: fetchedItems = [], isLoading, error } = useQuery({
    queryKey: [queryKey, entityIds],
    queryFn: () => fetchFunction(entityIds),
    enabled: entityIds.length > 0 && !inlineData,
    staleTime: 5 * 60 * 1e3
    // 5 minutes
  });
  const items = inlineData ?? fetchedItems;
  const tableColumns = onDuplicate || onDelete ? [
    ...columns,
    {
      id: "actions",
      header: "",
      size: 44,
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(n$4, { className: "h-4 w-4", weight: "light" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Actions" }),
          onDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DropdownMenuItem,
            {
              onClick: (e) => {
                e.stopPropagation();
                onDuplicate(row.original);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(s$2, { className: "h-4 w-4 mr-2", weight: "light" }),
                "Duplicate"
              ]
            }
          ),
          onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                className: "text-destructive focus:text-destructive",
                onClick: (e) => {
                  e.stopPropagation();
                  if (confirm(`Delete this ${entityType}? This cannot be undone.`)) {
                    onDelete(row.original);
                  }
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(n$1, { className: "h-4 w-4 mr-2", weight: "light" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  ] : columns;
  const table = useReactTable({
    data: items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnOrder: columnOrder.length > 0 ? ["select", ...columnOrder.filter((id) => id !== "select" && id !== "actions"), "actions"] : columnOrder
    }
  });
  if (inlineData ? items.length === 0 : entityIds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      headerActions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: headerActions }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border bg-muted/30 p-8 text-center text-sm text-muted-foreground", children: emptyMessage })
    ] });
  }
  if (!inlineData && isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" })
    ] });
  }
  if (!inlineData && error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive", children: [
      "Failed to load related ",
      entityType,
      " data"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-2 w-full ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " ",
        items.length === 1 ? "item" : "items"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        headerActions,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReferenceColumnSettingsPopover,
          {
            columns: tableColumns.filter((c2) => c2.id !== "actions"),
            columnOrder,
            onColumnOrderChange: setColumnOrder
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-md border overflow-auto w-full",
        style: { maxHeight },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-background z-10", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: headerGroup.headers.map((header) => {
            const isActions = header.column.id === "actions";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableHead,
              {
                style: isActions ? { width: header.getSize() } : void 0,
                className: isActions ? "sticky right-0 bg-background z-20" : "",
                children: header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )
              },
              header.id
            );
          }) }, headerGroup.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableRow,
            {
              className: onRowClick ? "cursor-pointer" : "",
              onClick: () => onRowClick?.(row.original),
              children: row.getVisibleCells().map((cell) => {
                const isActions = cell.column.id === "actions";
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TableCell,
                  {
                    style: isActions ? { width: cell.column.getSize() } : void 0,
                    className: isActions ? "sticky right-0 bg-[hsl(var(--background))] [tr[data-state=selected]_&]:bg-[hsl(var(--muted))] p-1" : "",
                    children: flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  },
                  cell.id
                );
              })
            },
            row.id
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: columns.length,
              className: "h-24 text-center text-muted-foreground",
              children: emptyMessage
            }
          ) }) })
        ] })
      }
    )
  ] });
}
function SortableReferenceColumnItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: "flex items-center gap-1 rounded-sm px-1 py-1.5 text-sm capitalize hover:bg-accent",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "cursor-grab touch-none text-muted-foreground hover:text-foreground",
            ...attributes,
            ...listeners,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(m$2, { className: "h-4 w-4", weight: "light" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: label })
      ]
    }
  );
}
function ReferenceColumnSettingsPopover({ columns, columnOrder, onColumnOrderChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const columnItems = columns.map((col) => {
    const id = "accessorKey" in col ? col.accessorKey : col.id;
    const label = typeof col.header === "string" ? col.header : col.meta?.label ?? id;
    return { id, label };
  });
  const orderedItems = columnOrder.length > 0 ? [...columnItems].sort((a2, b) => {
    const aIdx = columnOrder.indexOf(a2.id);
    const bIdx = columnOrder.indexOf(b.id);
    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  }) : columnItems;
  const columnIds = orderedItems.map((c2) => c2.id);
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = columnIds.indexOf(active.id);
    const newIndex = columnIds.indexOf(over.id);
    const newOrder = arrayMove(columnIds, oldIndex, newIndex);
    onColumnOrderChange(newOrder);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(l, { className: "h-4 w-4", weight: "light" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { align: "end", className: "w-52 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: columnIds, strategy: verticalListSortingStrategy, children: orderedItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SortableReferenceColumnItem,
      {
        id: item.id,
        label: item.label
      },
      item.id
    )) }) }) })
  ] });
}
function EntityModal({
  isOpen,
  onClose,
  data,
  config,
  onSave,
  defaultMode = "view",
  initialMode,
  originPoint
}) {
  const [mounted, setMounted] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(false);
  const activeOrigin = reactExports.useRef(void 0);
  const panelRef = reactExports.useRef(null);
  const transformOrigin = reactExports.useMemo(() => {
    const origin2 = activeOrigin.current;
    if (!origin2) return "center center";
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = vh * 0.02;
    const modalHeight = vh * 0.96;
    const modalTop = (vh - modalHeight) / 2;
    const gridColumns = config.gridColumns || 8;
    const columnWidth = 90;
    const modalWidth = gridColumns * columnWidth + (gridColumns - 1) * 12 + 48;
    const modalRight = vw - margin;
    const modalLeft = modalRight - modalWidth;
    const originX = origin2.x - modalLeft;
    const originY = origin2.y - modalTop;
    return `${originX}px ${originY}px`;
  }, [activeOrigin.current, config.gridColumns]);
  reactExports.useEffect(() => {
    if (isOpen) {
      activeOrigin.current = originPoint;
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        activeOrigin.current = void 0;
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, originPoint]);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") panelRef.current?.requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!mounted) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/50 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]",
        style: { opacity: visible ? 1 : 0 },
        onClick: () => panelRef.current?.requestClose()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative z-10 h-[96vh] mr-[2vh] overflow-hidden rounded-lg bg-background shadow-xl transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)] [&>div]:h-full [&>div]:max-h-[96vh] [&>div]:border-0",
        style: {
          transform: visible ? "scale(1)" : "scale(0)",
          transformOrigin
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailPanel,
          {
            ref: panelRef,
            isOpen: true,
            onClose,
            data,
            config,
            onSave,
            mode: initialMode,
            defaultMode,
            allowModeSwitch: true,
            cancelClosesPanel: true
          }
        )
      }
    )
  ] });
}
function ReferenceTableField(props) {
  const { field, value, mode, onRequestSave, isDirty, allData } = props;
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [modalData, setModalData] = reactExports.useState(null);
  const [modalMode, setModalMode] = reactExports.useState("view");
  const [modalInitialMode, setModalInitialMode] = reactExports.useState(void 0);
  const [clickOrigin, setClickOrigin] = reactExports.useState();
  const lastClickPos = reactExports.useRef({ x: 0, y: 0 });
  const referenceConfig = field.referenceConfig;
  const modalConfig = referenceConfig?.modalConfig;
  const handleRowClick = reactExports.useCallback(async (row) => {
    if (!modalConfig) {
      referenceConfig?.onRowClick?.(row);
      return;
    }
    if (isDirty && onRequestSave) {
      const saved = await onRequestSave();
      if (!saved) return;
    }
    const idKey = modalConfig.idKey || "_id.$oid";
    const id = idKey.split(".").reduce((obj, key) => obj?.[key], row);
    if (modalConfig.fetchById && id) {
      try {
        const fullData = await modalConfig.fetchById(id);
        setModalData(fullData);
      } catch {
        toast.error("Failed to load entity data");
        return;
      }
    } else {
      setModalData(row);
    }
    setClickOrigin({ ...lastClickPos.current });
    setModalMode("view");
    setModalInitialMode(void 0);
    setModalOpen(true);
  }, [modalConfig, referenceConfig, isDirty, onRequestSave]);
  const handleAdd = reactExports.useCallback(async () => {
    if (!modalConfig) return;
    if (isDirty && onRequestSave) {
      const saved = await onRequestSave();
      if (!saved) return;
    }
    const initialData = modalConfig.getInitialData?.(allData) ?? null;
    setModalData(initialData);
    setClickOrigin({ ...lastClickPos.current });
    setModalMode("edit");
    setModalInitialMode("create");
    setModalOpen(true);
  }, [modalConfig, isDirty, onRequestSave, allData]);
  const handleDuplicate = reactExports.useCallback(async (row) => {
    if (!modalConfig) return;
    if (isDirty && onRequestSave) {
      const saved = await onRequestSave();
      if (!saved) return;
    }
    const idKey = modalConfig.idKey || "_id.$oid";
    const id = idKey.split(".").reduce((obj, key) => obj?.[key], row);
    let fullData = row;
    if (modalConfig.fetchById && id) {
      try {
        fullData = await modalConfig.fetchById(id) ?? row;
      } catch {
        toast.error("Failed to load entity data");
        return;
      }
    }
    const copied = prepareForCopy(fullData, modalConfig.entityConfig);
    const initialData = modalConfig.getInitialData?.(allData) ?? {};
    setModalData({ ...copied, ...initialData });
    setClickOrigin({ ...lastClickPos.current });
    setModalMode("edit");
    setModalInitialMode("create");
    setModalOpen(true);
  }, [modalConfig, isDirty, onRequestSave, allData]);
  const handleDelete = reactExports.useCallback(async (row) => {
    if (!modalConfig?.onDelete) return;
    try {
      await modalConfig.onDelete(row);
      toast.success("Deleted successfully");
      const parentEntityKey = allData?._entityKey;
      const parentId = allData?._id?.$oid ?? allData?._id;
      if (referenceConfig?.queryKey) {
        queryClient.invalidateQueries({ queryKey: [referenceConfig.queryKey] });
      }
      if (parentEntityKey) {
        queryClient.invalidateQueries({ queryKey: [parentEntityKey] });
        if (parentId) {
          queryClient.refetchQueries({ queryKey: [parentEntityKey, "detail", String(parentId)] });
        }
      }
    } catch {
      toast.error("Failed to delete");
    }
  }, [modalConfig, queryClient, referenceConfig, allData]);
  const handleModalClose = reactExports.useCallback(() => {
    setModalOpen(false);
    setModalData(null);
    setModalInitialMode(void 0);
  }, []);
  const handleModalSave = reactExports.useCallback(async (data, isNew) => {
    let newId;
    if (modalConfig?.onSave) {
      newId = await modalConfig.onSave(data, isNew);
    }
    if (isNew && newId && modalConfig?.onCreated) {
      await modalConfig.onCreated(newId, allData);
    }
    if (referenceConfig?.queryKey) {
      queryClient.invalidateQueries({ queryKey: [referenceConfig.queryKey] });
    }
    const parentEntityKey = allData?._entityKey;
    if (parentEntityKey) {
      queryClient.invalidateQueries({ queryKey: [parentEntityKey] });
    }
    if (isNew) {
      handleModalClose();
    }
  }, [modalConfig, queryClient, referenceConfig?.queryKey, allData, handleModalClose]);
  if (!referenceConfig) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-destructive", children: "Reference configuration missing" });
  }
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  if (mode === "create" && !field.showInMode?.includes("create")) {
    const duplicateKeys = allData?._duplicateReferenceKeys ?? [];
    if (duplicateKeys.includes(field.key)) {
      const entityLabel = referenceConfig.entityType ?? "Items";
      const label = entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          label,
          " copied! ",
          label,
          " will be visible after creating the copy."
        ] })
      ] });
    }
    return null;
  }
  if (mode === "view" || mode === "edit") {
    const {
      entityType,
      fetchFunction,
      getInlineData,
      getEntityIds,
      inlineIdField = "id",
      columns,
      queryKey,
      onRowClick,
      emptyMessage,
      maxHeight
    } = referenceConfig;
    const inlineRows = getInlineData ? getInlineData(allData) : void 0;
    const entityIds = inlineRows ? inlineRows.map((row) => row[inlineIdField]).filter(Boolean) : getEntityIds ? getEntityIds(allData) : ids;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", onClickCapture: (e) => {
      lastClickPos.current = { x: e.clientX, y: e.clientY };
    }, children: [
      !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReferenceTable,
        {
          entityType,
          entityIds,
          fetchFunction,
          queryKey,
          inlineData: inlineRows,
          columns,
          onRowClick: modalConfig ? handleRowClick : onRowClick,
          onDuplicate: modalConfig?.canAdd ? handleDuplicate : void 0,
          onDelete: modalConfig?.onDelete ? handleDelete : void 0,
          headerActions: modalConfig?.canAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "h-8", onClick: handleAdd, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n, { className: "h-4 w-4 mr-2", weight: "light" }),
            "Add ",
            referenceConfig.entityType
          ] }),
          emptyMessage: emptyMessage || `No ${entityType} data`,
          maxHeight
        }
      ),
      modalConfig && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntityModal,
        {
          isOpen: modalOpen,
          onClose: handleModalClose,
          data: modalData,
          config: modalConfig.entityConfig,
          onSave: handleModalSave,
          defaultMode: modalMode,
          initialMode: modalInitialMode,
          originPoint: clickOrigin
        }
      )
    ] });
  }
  return null;
}
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e,
    {
      "data-slot": "command",
      className: cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      ),
      ...props
    }
  );
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(f, { className: "size-4 shrink-0 opacity-50", weight: "light" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          _e.Input,
          {
            "data-slot": "command-input",
            className: cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.List,
    {
      "data-slot": "command-list",
      className: cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      ),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function SearchReferenceField(props) {
  const { field, value, onChange, mode, error } = props;
  const [open, setOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [selectedItemLabel, setSelectedItemLabel] = reactExports.useState(null);
  const isDisabled = mode === "view" || field.readOnlyInEdit;
  reactExports.useEffect(() => {
    if (!value || !field.searchConfig?.fetchFunction) {
      setSelectedItemLabel(null);
      return;
    }
    const fetchSelectedItem = async () => {
      try {
        const fieldsToDisplay = field.searchConfig.selectedDisplayFields || field.searchConfig.displayFields;
        if (field.searchConfig.fetchByIdFunction) {
          const result = await field.searchConfig.fetchByIdFunction(value);
          if (result) {
            const label = fieldsToDisplay.map((fieldKey) => getNestedValue$1(result, fieldKey)).filter(Boolean).join(" - ");
            setSelectedItemLabel(label);
          }
          return;
        }
        const results = await field.searchConfig.fetchFunction(value);
        if (results && results.length > 0) {
          const result = results[0];
          const label = fieldsToDisplay.map((fieldKey) => getNestedValue$1(result, fieldKey)).filter(Boolean).join(" - ");
          setSelectedItemLabel(label);
        }
      } catch (err) {
        console.error("Error fetching selected item:", err);
        setSelectedItemLabel(null);
      }
    };
    fetchSelectedItem();
  }, [value, field.searchConfig, options]);
  reactExports.useEffect(() => {
    if (!field.searchConfig?.fetchFunction || searchQuery.length < 1) {
      setOptions([]);
      return;
    }
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const results = await field.searchConfig.fetchFunction(searchQuery);
        const mappedOptions = results.map((result) => ({
          value: field.searchConfig.valueKey ? getNestedValue$1(result, field.searchConfig.valueKey) : extractEntityId$1(result),
          label: field.searchConfig.displayFields.map((fieldKey) => getNestedValue$1(result, fieldKey)).filter(Boolean).join(" - ")
        }));
        setOptions(mappedOptions);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, field.searchConfig]);
  const selectedLabel = selectedItemLabel || value;
  if (isDisabled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: selectedLabel || "-" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          className: cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            error && "border-red-500"
          ),
          disabled: isDisabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: value ? selectedLabel : field.placeholder || "Search..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(c$1, { className: "ml-2 h-4 w-4 shrink-0 opacity-50", weight: "light" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "p-0 w-[var(--radix-popover-trigger-width)]", align: "start", sideOffset: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { shouldFilter: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommandInput,
          {
            placeholder: field.searchConfig?.searchPlaceholder || "Type to search...",
            value: searchQuery,
            onValueChange: setSearchQuery
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: isLoading ? "Loading..." : "No results found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CommandItem,
            {
              value: option.value,
              onSelect: () => {
                onChange(option.value === value ? "" : option.value);
                setOpen(false);
                setSearchQuery("");
              },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: option.label })
            },
            option.value
          )) })
        ] })
      ] }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500", children: error })
  ] });
}
function getNestedValue$1(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
function extractEntityId$1(entity) {
  if (!entity?._id) return entity?.id ?? "";
  if (typeof entity._id === "object" && "$oid" in entity._id) {
    return entity._id.$oid;
  }
  return String(entity._id);
}
const CURRENCIES = [
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "USD", label: "USD" },
  { value: "CHF", label: "CHF" },
  { value: "HUF", label: "HUF" },
  { value: "PLN", label: "PLN" },
  { value: "DKK", label: "DKK" },
  { value: "CAD", label: "CAD" },
  { value: "SEK", label: "SEK" },
  { value: "HKD", label: "HKD" },
  { value: "BRL", label: "BRL" },
  { value: "TRY", label: "TRY" },
  { value: "CZK", label: "CZK" },
  { value: "ISK", label: "ISK" },
  { value: "INR", label: "INR" },
  { value: "NOK", label: "NOK" },
  { value: "RSD", label: "RSD" },
  { value: "SGD", label: "SGD" },
  { value: "JPY", label: "JPY" },
  { value: "HRK", label: "HRK" },
  { value: "BGN", label: "BGN" },
  { value: "AUD", label: "AUD" },
  { value: "NZD", label: "NZD" },
  { value: "CNY", label: "CNY" },
  { value: "MXN", label: "MXN" },
  { value: "ZAR", label: "ZAR" },
  { value: "AED", label: "AED" },
  { value: "RON", label: "RON" },
  { value: "ILS", label: "ILS" },
  { value: "SAR", label: "SAR" },
  { value: "MAD", label: "MAD" },
  { value: "THB", label: "THB" },
  { value: "KRW", label: "KRW" }
];
function CurrencyField({ field, value, onChange, onChangeMulti, mode, error, allData }) {
  const readOnly = isFieldReadOnly(field, mode);
  const { amountKey, currencyKey } = field;
  const isFlat = !!(amountKey && currencyKey);
  const amount = isFlat ? String(allData?.[amountKey] ?? "") : value?.amount ?? "";
  const currency = isFlat ? String(allData?.[currencyKey] ?? "EUR") : value?.currency ?? "EUR";
  const handleAmountChange = (newAmount) => {
    if (isFlat) {
      onChangeMulti?.({ [amountKey]: newAmount, [currencyKey]: currency });
    } else {
      onChange({ amount: newAmount, currency });
    }
  };
  const handleCurrencyChange = (newCurrency) => {
    if (isFlat) {
      onChangeMulti?.({ [amountKey]: amount, [currencyKey]: newCurrency });
    } else {
      onChange({ amount, currency: newCurrency });
    }
  };
  if (readOnly) {
    const displayValue = amount ? `${amount} ${currency}` : "-";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: displayValue })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: field.key,
          type: "text",
          value: amount,
          onChange: (e) => handleAmountChange(e.target.value),
          placeholder: field.placeholder || "Enter amount",
          className: `flex-1 ${error ? "border-destructive" : ""}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: currency, onValueChange: handleCurrencyChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CURRENCIES.map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c2.value, children: c2.label }, c2.value)) })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function InverseReferenceField(props) {
  const { field, mode, allData } = props;
  const navigate = useNavigate();
  const config = field.inverseReferenceConfig;
  if (!config) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-destructive", children: "Inverse reference configuration missing" });
  }
  if (mode === "create") {
    return null;
  }
  const rawId = allData?._id;
  const entityId = typeof rawId === "string" ? rawId : typeof rawId === "object" && rawId !== null && "$oid" in rawId ? rawId.$oid : "";
  const columns = config.columns ?? [];
  const handleRowClick = (row) => {
    if (!config.routePath) return;
    const rawRowId = row._id;
    const rowId = typeof rawRowId === "string" ? rawRowId : typeof rawRowId === "object" && rawRowId !== null && "$oid" in rawRowId ? rawRowId.$oid : void 0;
    if (rowId) {
      navigate({ to: config.routePath, search: { id: rowId } });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: " rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceTable,
      {
        entityType: config.entityType,
        entityIds: entityId ? [entityId] : [],
        fetchFunction: (ids) => config.fetchFunction(ids[0]),
        queryKey: config.queryKey,
        columns,
        defaultVisibleColumns: config.defaultVisibleColumns,
        onRowClick: config.routePath ? handleRowClick : void 0,
        emptyMessage: config.emptyMessage || `No ${config.entityType} data`,
        maxHeight: config.maxHeight,
        className: ""
      }
    ) })
  ] });
}
function TagInputField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  const tags = Array.isArray(value) ? value : [];
  const [inputValue, setInputValue] = reactExports.useState("");
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [highlightedIndex, setHighlightedIndex] = reactExports.useState(-1);
  const inputRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const suggestions = field.suggestions ?? [];
  const filteredSuggestions = inputValue.trim() ? suggestions.filter(
    (s2) => s2.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s2)
  ) : [];
  const addTag = reactExports.useCallback((tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [tags, onChange]);
  const removeTag = reactExports.useCallback((index) => {
    onChange(tags.filter((_, i2) => i2 !== index));
  }, [tags, onChange]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        addTag(filteredSuggestions[highlightedIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      tags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.map((tag, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: tag }, i2)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "-" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", ref: containerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-wrap gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${error ? "border-destructive" : ""}`,
        onClick: () => inputRef.current?.focus(),
        children: [
          tags.map((tag, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 shrink-0", children: [
            tag,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  removeTag(i2);
                },
                className: "rounded-full hover:bg-muted-foreground/20 p-0.5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$2, { className: "h-3 w-3", weight: "light" })
              }
            )
          ] }, i2)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[120px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                id: field.key,
                type: "text",
                value: inputValue,
                onChange: (e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                  setHighlightedIndex(-1);
                },
                onFocus: () => setShowSuggestions(true),
                onBlur: () => {
                  setTimeout(() => setShowSuggestions(false), 200);
                },
                onKeyDown: handleKeyDown,
                placeholder: tags.length === 0 ? field.placeholder || "Type and press Enter" : "",
                className: "w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm h-6"
              }
            ),
            showSuggestions && filteredSuggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-full mt-1 z-50 w-64 max-h-48 overflow-y-auto rounded-md border bg-popover shadow-md", children: filteredSuggestions.map((suggestion, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `w-full text-left px-3 py-1.5 text-sm hover:bg-accent ${i2 === highlightedIndex ? "bg-accent" : ""}`,
                onMouseDown: (e) => {
                  e.preventDefault();
                  addTag(suggestion);
                },
                children: suggestion
              },
              suggestion
            )) })
          ] })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function FileUploadField({ field, value, onChange, mode, error }) {
  const readOnly = isFieldReadOnly(field, mode);
  const files = Array.isArray(value) ? value : [];
  const inputRef = reactExports.useRef(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const maxFiles = field.maxFiles ?? 10;
  const maxFileSize = field.maxFileSize ?? 10 * 1024 * 1024;
  const handleFiles = reactExports.useCallback(async (fileList) => {
    const remaining = maxFiles - files.length;
    const toUpload = Array.from(fileList).slice(0, remaining);
    const uploaded = [];
    for (const f2 of toUpload) {
      if (f2.size > maxFileSize) continue;
      const result = await fileStorage.upload(f2);
      uploaded.push(result);
    }
    if (uploaded.length > 0) {
      onChange([...files, ...uploaded]);
    }
  }, [files, onChange, maxFiles, maxFileSize]);
  const removeFile = reactExports.useCallback((id) => {
    const file = files.find((f2) => f2.id === id);
    fileStorage.delete(id, file?.url);
    onChange(files.filter((f2) => f2.id !== id));
  }, [files, onChange]);
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      files.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: files.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: f2.url,
          download: f2.name,
          className: "flex items-center gap-2 text-sm rounded-md px-2 py-1.5 -mx-2 hover:bg-accent cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(s$9, { className: "h-4 w-4 shrink-0 text-muted-foreground", weight: "light" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: f2.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
              "(",
              formatFileSize(f2.size),
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(s$1, { className: "h-4 w-4 shrink-0 text-muted-foreground ml-auto", weight: "light" })
          ]
        }
      ) }, f2.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No files uploaded" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 text-sm cursor-pointer transition-colors ${dragOver ? "border-ring bg-accent/50" : error ? "border-destructive" : "border-input hover:border-ring"}`,
        onClick: () => inputRef.current?.click(),
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s$a, { className: "h-6 w-6 text-muted-foreground", weight: "light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Drag files here or click to browse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              id: field.key,
              type: "file",
              multiple: true,
              accept: field.accept,
              className: "hidden",
              onChange: (e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }
              }
            }
          )
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: files.map((f2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(s$9, { className: "h-4 w-4 shrink-0 text-muted-foreground", weight: "light" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: f2.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
        "(",
        formatFileSize(f2.size),
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon-xs",
          onClick: () => removeFile(f2.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$2, { className: "h-3 w-3", weight: "light" })
        }
      )
    ] }, f2.id)) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function DependentSelectField({ field, value, onChange, mode, error, allData }) {
  const readOnly = isFieldReadOnly(field, mode);
  const config = field.dependentSelectConfig;
  const [options, setOptions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const prevParentId = reactExports.useRef(void 0);
  const parentId = config ? allData?.[config.dependsOn] : void 0;
  reactExports.useEffect(() => {
    if (!config) return;
    if (prevParentId.current !== void 0 && prevParentId.current !== parentId) {
      onChange("");
    }
    prevParentId.current = parentId;
    if (!parentId) {
      setOptions([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    config.fetchEntity(parentId).then((entity) => {
      if (cancelled) return;
      setOptions(config.mapOptions(entity));
      setLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setOptions([]);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [parentId, config]);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", title: formatValue(value, field), children: formatValue(value, field) })
    ] });
  }
  const noParent = !parentId;
  const placeholder = noParent ? config?.noParentMessage || "Select a parent first" : loading ? "Loading..." : field.placeholder || "Select an option";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: value || "",
        onValueChange: onChange,
        disabled: noParent,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: `w-full ${error ? "border-destructive" : ""}`, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(s, { className: "h-3.5 w-3.5 shrink-0 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "Loading..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: options.filter((option) => option.value !== "").length === 0 && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 px-3 text-sm text-muted-foreground", children: noParent ? config?.noParentMessage || "Select a parent first" : "No rooms for this hotel found" }) : options.filter((option) => option.value !== "").map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}
function extractEntityId(entity) {
  if (!entity?._id) return entity?.id ?? "";
  if (typeof entity._id === "object" && "$oid" in entity._id) {
    return entity._id.$oid;
  }
  return String(entity._id);
}
function MultiSearchReferenceField(props) {
  const { field, value, onChange, mode, error } = props;
  const readOnly = isFieldReadOnly(field, mode);
  const [open, setOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [selectedLabels, setSelectedLabels] = reactExports.useState({});
  const extractIds = (val) => {
    if (!Array.isArray(val)) return [];
    const itemKey = field.searchConfig?.itemValueKey;
    return val.map((item) => {
      if (typeof item === "string") return item;
      if (itemKey && typeof item === "object" && item !== null) {
        return String(item[itemKey] ?? "");
      }
      return String(item);
    }).filter(Boolean);
  };
  const selectedIds = extractIds(value);
  reactExports.useEffect(() => {
    if (selectedIds.length === 0 || !field.searchConfig?.fetchFunction) {
      setSelectedLabels({});
      return;
    }
    const fetchLabels = async () => {
      const fieldsToDisplay = field.searchConfig.selectedDisplayFields || field.searchConfig.displayFields;
      const newLabels = {};
      await Promise.all(
        selectedIds.map(async (id) => {
          if (selectedLabels[id]) {
            newLabels[id] = selectedLabels[id];
            return;
          }
          try {
            let result = null;
            if (field.searchConfig.fetchByIdFunction) {
              result = await field.searchConfig.fetchByIdFunction(id);
            } else {
              const results = await field.searchConfig.fetchFunction(id);
              result = results?.[0] ?? null;
            }
            if (result) {
              const label = fieldsToDisplay.map((fieldKey) => getNestedValue(result, fieldKey)).filter(Boolean).join(" ");
              newLabels[id] = label;
            }
          } catch (err) {
            console.error("Error fetching label for", id, err);
          }
        })
      );
      setSelectedLabels(newLabels);
    };
    fetchLabels();
  }, [JSON.stringify(selectedIds), field.searchConfig]);
  reactExports.useEffect(() => {
    if (!field.searchConfig?.fetchFunction || searchQuery.length < 1) {
      setOptions([]);
      return;
    }
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const results = await field.searchConfig.fetchFunction(searchQuery);
        const mappedOptions = results.map((result) => ({
          value: field.searchConfig.valueKey ? getNestedValue(result, field.searchConfig.valueKey) : extractEntityId(result),
          label: field.searchConfig.displayFields.map((fieldKey) => getNestedValue(result, fieldKey)).filter(Boolean).join(" - ")
        }));
        setOptions(mappedOptions);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, field.searchConfig]);
  const idsToValue = (ids) => {
    const itemKey = field.searchConfig?.itemValueKey;
    if (itemKey) {
      return ids.map((id) => ({ [itemKey]: id }));
    }
    return ids;
  };
  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      onChange(idsToValue(selectedIds.filter((v) => v !== id)));
    } else {
      onChange(idsToValue([...selectedIds, id]));
      const option = options.find((o) => o.value === id);
      if (option) {
        setSelectedLabels((prev) => ({ ...prev, [id]: option.label }));
      }
    }
    setSearchQuery("");
  };
  const handleRemove = (id) => {
    onChange(idsToValue(selectedIds.filter((v) => v !== id)));
  };
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      selectedIds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "max-w-full truncate", children: selectedLabels[id] || id }, id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "-" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    !field.hideLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" }) }),
    selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 max-w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: selectedLabels[id] || id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handleRemove(id),
          className: "rounded-full hover:bg-muted-foreground/20 p-0.5",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$2, { className: "h-3 w-3", weight: "light" })
        }
      )
    ] }, id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          className: cn(
            "w-full justify-between",
            !selectedIds.length && "text-muted-foreground",
            error && "border-red-500"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: selectedIds.length === 0 ? field.placeholder || "Search..." : "Add another..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(c$1, { className: "ml-2 h-4 w-4 shrink-0 opacity-50", weight: "light" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "p-0 w-[var(--radix-popover-trigger-width)]", align: "start", sideOffset: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { shouldFilter: false, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommandInput,
          {
            placeholder: field.searchConfig?.searchPlaceholder || "Type to search...",
            value: searchQuery,
            onValueChange: setSearchQuery
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: isLoading ? "Loading..." : "No results found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CommandItem,
            {
              value: option.value,
              onSelect: handleSelect,
              className: "overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  n$3,
                  {
                    className: cn(
                      "mr-2 h-4 w-4 shrink-0",
                      selectedIds.includes(option.value) ? "opacity-100" : "opacity-0"
                    ),
                    weight: "light"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: option.label })
              ]
            },
            option.value
          )) })
        ] })
      ] }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
const API_BASE = typeof window === "undefined" ? "http://localhost:3001" : "";
async function fetchDecrypted(entity, id, field) {
  const res = await fetch(`${API_BASE}/api/v1/credentials/decrypt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity, id, field })
  });
  if (!res.ok) throw new Error("Failed to decrypt");
  const json = await res.json();
  return json.data.plaintext;
}
function PasswordField({ field, value, onChange, mode, error, allData }) {
  const readOnly = isFieldReadOnly(field, mode);
  const [revealed, setRevealed] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const isEncryptedValue = typeof value === "string" && value === "[encrypted]";
  const handleMouseEnter = reactExports.useCallback(async () => {
    if (!isEncryptedValue || revealed || loading) return;
    const entityKey = allData?._entityKey;
    const id = allData ? extractEntityId$2(allData) : "";
    if (!entityKey || !id) return;
    setLoading(true);
    try {
      const plaintext = await fetchDecrypted(entityKey, id, field.key);
      setRevealed(plaintext);
    } catch {
      setRevealed("Error decrypting");
    } finally {
      setLoading(false);
    }
  }, [isEncryptedValue, revealed, loading, allData, field.key]);
  const handleMouseLeave = reactExports.useCallback(() => {
    setRevealed(null);
  }, []);
  if (readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-foreground font-mono cursor-default select-none truncate",
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          title: isEncryptedValue ? "Hover to reveal" : revealed || void 0,
          children: loading ? "••••••••" : revealed ? revealed : isEncryptedValue ? "••••••••" : value || "-"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field, htmlFor: field.key, children: field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: field.key,
        type: "password",
        value: value || "",
        onChange: (e) => onChange(e.target.value),
        placeholder: field.placeholder,
        className: error ? "border-destructive" : "",
        autoComplete: "new-password"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
  ] });
}
function AutoGenerateField({ field, value }) {
  const config = field.autoGenerateConfig;
  const displayValue = value ? `${config?.displayPrefix ?? ""}${value}` : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CopyableValue, { value: displayValue })
  ] });
}
function BadgeField({ field, value }) {
  const displayValue = field.badgeLabels?.[value] ?? void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { field }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TableBadgeCell,
      {
        value,
        displayValue,
        variantMap: field.variantMap ?? {}
      }
    ) })
  ] });
}
function FieldRenderer(props) {
  const { field } = props;
  if (field.component) {
    const CustomComponent = field.component;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomComponent, { ...props });
  }
  switch (field.type) {
    case "text":
    case "email":
    case "phone":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { ...props });
    case "textarea":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TextareaField, { ...props });
    case "select":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { ...props });
    case "checkbox":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxField, { ...props });
    case "date":
    case "datetime":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DateField, { ...props });
    case "array":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrayField, { ...props });
    case "reference-table":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceTableField, { ...props });
    case "search-reference":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchReferenceField, { ...props });
    case "multi-search-reference":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MultiSearchReferenceField, { ...props });
    case "inverse-reference":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(InverseReferenceField, { ...props });
    case "currency":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyField, { ...props });
    case "tag-input":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TagInputField, { ...props });
    case "file-upload":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FileUploadField, { ...props });
    case "dependent-select":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DependentSelectField, { ...props });
    case "password":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordField, { ...props });
    case "auto-generate":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AutoGenerateField, { ...props });
    case "badge":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeField, { ...props });
    case "nested":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Nested fields not yet implemented" });
    case "custom":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Custom component not provided" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { ...props });
  }
}
const DetailPanel = reactExports.forwardRef(function DetailPanel2({
  isOpen,
  onClose,
  data,
  mode: initialMode,
  config,
  onSave,
  onDelete,
  defaultMode = "view",
  allowModeSwitch = true,
  cancelClosesPanel = false
}, ref) {
  const getInitialMode = () => {
    if (initialMode) return initialMode;
    if (!data) return "create";
    return defaultMode;
  };
  const [mode, setMode] = reactExports.useState(getInitialMode());
  const [formData, setFormData] = reactExports.useState(() => data ?? {});
  const [errors, setErrors] = reactExports.useState({});
  const [isDirty, setIsDirty] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (data) {
      setFormData(data);
      setMode(initialMode || defaultMode);
      setIsDirty(false);
    } else {
      setFormData({});
      setMode("create");
      setIsDirty(false);
    }
    setErrors({});
  }, [data, isOpen]);
  const getTitle = () => {
    if (config.titles) {
      if (mode === "create" && config.titles.create) return config.titles.create;
      if (mode === "edit" && config.titles.edit) return config.titles.edit;
      if (mode === "view" && config.titles.view) return config.titles.view;
    }
    if (mode === "create") return `New ${config.title}`;
    if (mode === "edit") return `Edit ${config.title}`;
    return config.title;
  };
  const handleFieldChange = (key, value) => {
    const next = setValue(formData, key, value);
    setFormData(next);
    setIsDirty(true);
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
    if (config.onFieldChange) {
      void config.onFieldChange(key, value, next, (patches) => {
        setFormData((prev) => ({ ...prev, ...patches }));
      }, mode);
    }
  };
  const handleMultiFieldChange = (patches) => {
    setFormData((prev) => ({ ...prev, ...patches }));
    setIsDirty(true);
  };
  const handleSave = async () => {
    const validationErrors = validateData(formData, config);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return;
    }
    setIsSubmitting(true);
    try {
      const isNew = mode === "create";
      if (config.onSave) {
        await config.onSave(formData, mode);
      } else if (onSave) {
        await onSave(formData, isNew);
      }
      toast.success(isNew ? "Created successfully" : "Saved successfully");
      setIsDirty(false);
      setMode("view");
    } catch (error) {
      toast.error("Failed to save: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRequestSave = async () => {
    const validationErrors = validateData(formData, config);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
      return false;
    }
    setIsSubmitting(true);
    try {
      const isNew = mode === "create";
      if (config.onSave) {
        await config.onSave(formData, mode);
      } else if (onSave) {
        await onSave(formData, isNew);
      }
      toast.success("Saved successfully");
      setIsDirty(false);
      return true;
    } catch (error) {
      toast.error("Failed to save: " + error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = () => {
    if (config.canEdit === false) {
      toast.error("Editing is not allowed");
      return;
    }
    setMode("edit");
  };
  const handleCancel = () => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        if (mode === "create" || cancelClosesPanel) {
          onClose();
        } else {
          setFormData(data);
          setMode("view");
          setIsDirty(false);
          setErrors({});
        }
      }
    } else {
      if (mode === "create" || cancelClosesPanel) {
        onClose();
      } else {
        setMode("view");
      }
    }
  };
  const handleClose = () => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    requestClose: handleClose
  }), [handleClose]);
  const gridColumns = config.gridColumns || 8;
  const columnWidth = 90;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `
        h-dvh bg-background overflow-y-auto border-l shrink-0
        transition-[max-width] duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]
        ${isOpen ? "" : "border-0 overflow-hidden"}
      `,
      style: {
        maxWidth: isOpen ? `${gridColumns * columnWidth + (gridColumns - 1) * 12 + 48}px` : "0px",
        width: "fit-content"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-background ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: getTitle() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            mode === "view" && onDelete && config.canDelete !== false && data && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive", onClick: () => onDelete(formData), children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$1, { className: "h-4 w-4", weight: "light" }) }),
            mode === "view" && allowModeSwitch && config.canEdit !== false && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleEdit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(a, { className: "h-4 w-4 mr-2", weight: "light" }),
              "Edit"
            ] }),
            (mode === "edit" || mode === "create") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleCancel,
                  disabled: isSubmitting,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleSave,
                  disabled: isSubmitting,
                  children: isSubmitting ? "Saving..." : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: mode === "create" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(n, { className: "h-4 w-4 mr-2", weight: "light" }),
                    "Create"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(m, { className: "h-4 w-4 mr-2", weight: "light" }),
                    "Save"
                  ] }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(n$2, { className: "h-4 w-4", weight: "light" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: config.sections.map(
          (section, sectionIdx) => section.rows ? (
            // Row-based layout
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
              section.label && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: section.label }),
              section.rows.map((row, rowIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid gap-y-6 gap-x-3",
                  style: {
                    gridTemplateColumns: `repeat(${gridColumns}, ${columnWidth}px)`
                  },
                  children: row.items.map((item) => {
                    if (isFieldGroup(item)) {
                      const visibleFields = item.fields.filter(
                        (f2) => isFieldVisible(f2, mode, formData)
                      );
                      if (visibleFields.length === 0) return null;
                      const innerColumns = item.columns || visibleFields.length;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            gridColumn: item.gridColumn || "span 1",
                            gridRow: item.gridRow,
                            minWidth: 0
                          },
                          children: [
                            item.label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground mb-2", children: item.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "grid gap-4",
                                style: {
                                  gridTemplateColumns: `repeat(${innerColumns}, 1fr)`
                                },
                                children: visibleFields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { gridColumn: field.gridColumn, gridRow: field.gridRow, minWidth: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  FieldRenderer,
                                  {
                                    field,
                                    value: getValue(formData, field.key),
                                    onChange: (value) => handleFieldChange(field.key, value),
                                    onChangeMulti: handleMultiFieldChange,
                                    mode,
                                    error: errors[field.key],
                                    allData: formData,
                                    onRequestSave: handleRequestSave,
                                    isDirty
                                  }
                                ) }, field.key))
                              }
                            ) })
                          ]
                        },
                        `group-${visibleFields.map((f2) => f2.key).join("-")}`
                      );
                    }
                    if (!isFieldVisible(item, mode, formData)) return null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          gridColumn: item.gridColumn || "span 1",
                          gridRow: item.gridRow,
                          minWidth: 0
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FieldRenderer,
                          {
                            field: item,
                            value: getValue(formData, item.key),
                            onChange: (value) => handleFieldChange(item.key, value),
                            onChangeMulti: handleMultiFieldChange,
                            mode,
                            error: errors[item.key],
                            allData: formData,
                            onRequestSave: handleRequestSave,
                            isDirty
                          }
                        )
                      },
                      item.key
                    );
                  })
                },
                rowIdx
              ))
            ] }, sectionIdx)
          ) : section.fields ? (
            // Legacy flat fields layout (backwards compat)
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid gap-y-6 gap-x-3",
                style: {
                  gridTemplateColumns: `repeat(${gridColumns}, ${columnWidth}px)`
                },
                children: [
                  section.label && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "text-sm font-medium text-muted-foreground",
                      style: { gridColumn: `1 / -1` },
                      children: section.label
                    }
                  ),
                  section.fields.filter((field) => isFieldVisible(field, mode, formData)).map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        gridColumn: field.gridColumn || "span 1",
                        gridRow: field.gridRow,
                        minWidth: 0
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FieldRenderer,
                        {
                          field,
                          value: getValue(formData, field.key),
                          onChange: (value) => handleFieldChange(field.key, value),
                          onChangeMulti: handleMultiFieldChange,
                          mode,
                          error: errors[field.key],
                          allData: formData,
                          onRequestSave: handleRequestSave,
                          isDirty
                        }
                      )
                    },
                    field.key
                  ))
                ]
              },
              sectionIdx
            )
          ) : null
        ) })
      ]
    }
  );
});
function EntityPage({ entityKey, id }) {
  const entry = entityRegistry[entityKey];
  const navigate = useNavigate();
  const [panelMode, setPanelMode] = reactExports.useState("view");
  const [isCreateMode, setIsCreateMode] = reactExports.useState(false);
  const [copyData, setCopyData] = reactExports.useState(null);
  const queryClient = useQueryClient();
  const entityConfig = reactExports.useMemo(() => configFactories[entityKey](), [entityKey]);
  const api = reactExports.useMemo(() => makeEntityApi(entityKey), [entityKey]);
  const panelConfig = reactExports.useMemo(
    () => copyData ? { ...entityConfig, titles: { ...entityConfig.titles, create: `Copy of ${entityConfig.title}` } } : entityConfig,
    [copyData, entityConfig]
  );
  const { data: fetchedItem } = useQuery({
    queryKey: [entityKey, "detail", id],
    queryFn: async () => api.fetchById(id),
    enabled: !!id && !isCreateMode
  });
  const rawItem = fetchedItem ?? null;
  const selectedItem = rawItem ? { ...rawItem, _entityKey: entityKey } : null;
  const isPanelOpen = !!id || isCreateMode;
  const handleRowClick = (item) => {
    setIsCreateMode(false);
    setPanelMode("view");
    navigate({ to: entry.route, search: { id: extractEntityId$2(item) } });
  };
  const buildInitialData = reactExports.useCallback(() => {
    const data = { ...entityConfig.defaultValues };
    for (const section of entityConfig.sections ?? []) {
      const fields = section.rows ? section.rows.flatMap((r) => r.items.flatMap((item) => item.kind === "group" ? item.fields : [item])) : section.fields ?? [];
      for (const field of fields) {
        if (field.autoGenerateConfig?.generate && !data[field.key]) {
          data[field.key] = field.autoGenerateConfig.generate();
        } else if (field.defaultValue !== void 0 && data[field.key] === void 0) {
          data[field.key] = field.defaultValue;
        }
      }
    }
    return data;
  }, [entityConfig]);
  const handleAddNew = () => {
    navigate({ to: entry.route, search: { id: void 0 } });
    setIsCreateMode(true);
    setPanelMode("create");
    setCopyData(buildInitialData());
  };
  const handleDuplicate = reactExports.useCallback(async (item) => {
    const baseCopy = prepareForCopy(item, entityConfig);
    const extra = entityConfig.onDuplicate ? await entityConfig.onDuplicate(item, baseCopy) : {};
    const copied = { ...baseCopy, ...extra };
    const defaults = buildInitialData();
    for (const key of Object.keys(defaults)) {
      if (!copied[key]) copied[key] = defaults[key];
    }
    navigate({ to: entry.route, search: { id: void 0 } });
    setIsCreateMode(true);
    setPanelMode("create");
    setCopyData(copied);
  }, [navigate, entityConfig, entry.route, buildInitialData]);
  const handleClosePanel = reactExports.useCallback(() => {
    setIsCreateMode(false);
    setCopyData(null);
    navigate({ to: entry.route, search: { id: void 0 } });
  }, [navigate, entry.route]);
  const invalidateRelated = reactExports.useCallback(async () => {
    for (const key of entry.invalidatesOnWrite ?? []) {
      await queryClient.invalidateQueries({ queryKey: [key] });
    }
  }, [entry.invalidatesOnWrite, queryClient]);
  const handleSave = reactExports.useCallback(async (data, isNew) => {
    if (isNew) {
      const { _duplicateReferenceKeys: _, ...payload } = data;
      const extraPayload = {};
      const cleanPayload = { ...payload };
      if (entityConfig.onBeforeCreate) {
        const result = await entityConfig.onBeforeCreate(cleanPayload, extraPayload);
        if (result) Object.assign(cleanPayload, result);
      }
      const created = await api.create(cleanPayload);
      const newId = extractEntityId$2(created);
      if (entityConfig.onAfterCreate) {
        await entityConfig.onAfterCreate(newId, extraPayload, queryClient);
      }
      await queryClient.invalidateQueries({ queryKey: [entityKey] });
      await queryClient.invalidateQueries({ queryKey: [entityKey, "detail", newId] });
      await invalidateRelated();
      setIsCreateMode(false);
      setCopyData(null);
      setPanelMode("view");
      navigate({ to: entry.route, search: { id: newId } });
    } else {
      const id2 = extractEntityId$2(data);
      await api.update(id2, data);
      await queryClient.invalidateQueries({ queryKey: [entityKey] });
      await queryClient.invalidateQueries({ queryKey: [entityKey, "detail", id2] });
      await invalidateRelated();
    }
  }, [api, queryClient, entityKey, entityConfig, invalidateRelated, navigate, entry.route]);
  const handleDelete = reactExports.useCallback(async (data) => {
    const id2 = extractEntityId$2(data);
    if (!confirm(`Delete this ${entry.name}? This cannot be undone.`)) return;
    await api.remove(id2);
    toast.success(`${entry.name} deleted`);
    await queryClient.invalidateQueries({ queryKey: [entityKey] });
    await invalidateRelated();
    handleClosePanel();
  }, [api, queryClient, entityKey, entry.name, invalidateRelated, handleClosePanel]);
  const columns = reactExports.useMemo(
    () => columnsFromConfig(entityConfig, { onDuplicate: handleDuplicate, onDelete: handleDelete }),
    [handleDuplicate, handleDelete, entityConfig]
  );
  const filters = reactExports.useMemo(() => getFiltersFromConfig(entityConfig), [entityConfig]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex flex-col flex-1 min-h-0 max-h-dvh", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DataTableServer,
        {
          columns,
          fetchData: api.fetchAll,
          queryKey: entityKey,
          onRowClick: handleRowClick,
          activeRowId: id,
          getRowId: (row) => extractEntityId$2(row),
          searchPlaceholder: `Search ${entry.namePlural.toLowerCase()}...`,
          defaultPageSize: 20,
          filters,
          headerActions: entityConfig.canCreate !== false && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAddNew, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n, { className: "h-4 w-4 mr-2", weight: "light" }),
            "Add ",
            entry.name
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DetailPanel,
      {
        isOpen: isPanelOpen,
        onClose: handleClosePanel,
        data: isCreateMode ? copyData : selectedItem,
        mode: panelMode,
        config: panelConfig,
        onSave: handleSave,
        onDelete: handleDelete
      }
    )
  ] });
}
export {
  EntityPage as E
};
