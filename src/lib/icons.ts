/**
 * Icon utility for Phosphor Icons
 * Provides a centralized icon system with dynamic icon lookup
 */
import {
  ArrowCounterClockwise,
  ArrowDown,
  ArrowUp,
  ArrowsDownUp,
  Bed,
  Briefcase,
  Buildings,
  BuildingApartment,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CalendarMinus,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  ChatCircle,
  Check,
  Circle,
  CircleDashed,
  CircleNotch,
  Coins,
  Copy,
  CreditCard,
  CurrencyDollar,
  DotsThree,
  DotsSixVertical,
  Download,
  Envelope,
  File,
  FileText,
  FloppyDisk,
  Gear,
  Globe,
  HardDrives,
  Hash,
  House,
  MagnifyingGlass,
  MapPin,
  Moon,
  Palette,
  Paperclip,
  PaperPlaneTilt,
  PencilSimple,
  Percent,
  Phone,
  Plus,
  Prohibit,
  Receipt,
  SealCheck,
  ShieldWarning,
  SlidersHorizontal,
  Sun,
  Tag,
  TextAlignLeft,
  Upload,
  Users,
  X,
  type Icon,
} from '@phosphor-icons/react'

// Export the Icon type for use in components
export type { Icon }
export type IconComponent = Icon

/**
 * Icon mapping for dynamic icon lookup
 * Maps icon names (used in configs) to Phosphor icon components
 */
export const iconMap: Record<string, Icon> = {
  // Navigation & Actions
  ArrowDown,
  ArrowUp,
  ArrowUpDown: ArrowsDownUp,
  ArrowsDownUp,
  CaretDown,
  CaretUp,
  CaretLeft,
  CaretRight,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretUpDown,
  ChevronDown: CaretDown,
  ChevronUp: CaretUp,
  ChevronLeft: CaretLeft,
  ChevronRight: CaretRight,
  ChevronDownIcon: CaretDown,
  ChevronUpIcon: CaretUp,
  ChevronLeftIcon: CaretLeft,
  ChevronRightIcon: CaretRight,
  ChevronsLeft: CaretDoubleLeft,
  ChevronsRight: CaretDoubleRight,
  ChevronsUpDown: CaretUpDown,

  // Common actions
  Check,
  X,
  Plus,
  Copy,
  Edit: PencilSimple,
  PencilSimple,
  Save: FloppyDisk,
  FloppyDisk,
  Download,
  Upload,
  Search: MagnifyingGlass,
  SearchIcon: MagnifyingGlass,
  MagnifyingGlass,
  RotateCcw: ArrowCounterClockwise,
  ArrowCounterClockwise,

  // UI Elements
  MoreHorizontal: DotsThree,
  DotsThree,
  GripVertical: DotsSixVertical,
  DotsSixVertical,
  Settings: Gear,
  Gear,
  Settings2: SlidersHorizontal,
  SlidersHorizontal,

  // Files & Documents
  File,
  FileText,
  Paperclip,
  Calendar,
  CalendarIcon: Calendar,
  CalendarArrowUp: CalendarPlus,
  CalendarArrowDown: CalendarMinus,
  CalendarCheck,
  CalendarClock: CalendarCheck,
  Receipt,

  // Contact & Communication
  Envelope,
  Mail: Envelope,
  Phone,
  MapPin,
  Hash,
  Tag,
  Note: FileText,

  // Entities & Buildings
  Users,
  Globe,
  Buildings,
  BuildingApartment,
  Hotel: BuildingApartment,
  Bed,
  BedDouble: Bed,
  Briefcase,
  Server: HardDrives,
  HardDrives,
  Home: House,
  House,

  // Finance
  Coins,
  CurrencyDollar,
  CurrencyEur: CurrencyDollar,
  CircleDollarSign: CurrencyDollar,
  CreditCard,
  Percent,

  // Status & Actions
  Prohibit,
  Ban: Prohibit,
  SealCheck,
  BadgeCheck: SealCheck,
  ShieldWarning,
  ShieldAlert: ShieldWarning,
  PaperPlaneTilt,
  SendHorizontal: PaperPlaneTilt,

  // Communication
  ChatCircle,
  MessageSquare: ChatCircle,

  // Theme
  Sun,
  Moon,
  Palette,

  // Status
  Circle,
  CircleDot: CircleDashed,
  CircleDashed,
  Loader2: CircleNotch,
  CircleNotch,

  // Text
  AlignLeft: TextAlignLeft,
  TextAlignLeft,
}

/**
 * Get an icon component by name
 * @param name - The icon name (Lucide or Phosphor naming)
 * @returns The Phosphor icon component or undefined
 */
export function getIcon(name: string): Icon | undefined {
  return iconMap[name]
}

/**
 * Get an icon component by name with a fallback
 * @param name - The icon name
 * @param fallback - Fallback icon component
 * @returns The icon component or the fallback
 */
export function getIconOrFallback(name: string, fallback: Icon): Icon {
  return iconMap[name] ?? fallback
}

// Re-export commonly used icons for direct imports
export {
  ArrowCounterClockwise,
  ArrowDown,
  ArrowUp,
  ArrowsDownUp,
  Bed,
  Briefcase,
  Buildings,
  BuildingApartment,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CalendarMinus,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretUpDown,
  ChatCircle,
  Check,
  Circle,
  CircleDashed,
  CircleNotch,
  Coins,
  Copy,
  CreditCard,
  CurrencyDollar,
  DotsThree,
  DotsSixVertical,
  Download,
  Envelope,
  File,
  FileText,
  FloppyDisk,
  Gear,
  Globe,
  HardDrives,
  Hash,
  House,
  MagnifyingGlass,
  MapPin,
  Moon,
  Palette,
  Paperclip,
  PaperPlaneTilt,
  PencilSimple,
  Percent,
  Phone,
  Plus,
  Prohibit,
  Receipt,
  SealCheck,
  ShieldWarning,
  SlidersHorizontal,
  Sun,
  Tag,
  TextAlignLeft,
  Upload,
  Users,
  X,
}
