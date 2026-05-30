import { Globe, type LucideIcon } from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Settings",
    items: [
      {
        label: "Geo Settings",
        href: "/admin/settings/geo",
        icon: Globe,
      },
    ],
  },
];
