"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups } from "@/lib/admin/adminNavConfig";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-e border-zinc-200 bg-white p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Admin
      </p>
      <nav className="flex flex-col gap-6">
        {adminNavGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-medium text-zinc-500">{group.label}</p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-[#2bbcb0]/10 font-medium text-[#1f8f86]"
                          : "text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
