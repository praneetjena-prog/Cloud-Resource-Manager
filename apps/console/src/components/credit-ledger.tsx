"use client";

import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender, createColumnHelper, type SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Input } from "@supercloud/shared-ui";
import { ArrowUpDown, Search, Shield } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  type: "DEBIT" | "CREDIT" | "REFUND" | "BONUS";
  amount: number;
  balanceAfter: number;
  resourceType: string;
  resource: string;
  description: string;
  hash: string;
};

const transactions: Transaction[] = [
  { id: "tx1", date: "2026-05-12 20:30", type: "DEBIT", amount: -12.48, balanceAfter: 2847.50, resourceType: "COMPUTE", resource: "api-prod-01", description: "Compute usage - 26 hours", hash: "a3f7...c8d2" },
  { id: "tx2", date: "2026-05-12 18:00", type: "DEBIT", amount: -4.68, balanceAfter: 2859.98, resourceType: "DATABASE", resource: "postgres-main", description: "Database usage - 18 hours", hash: "b1e4...9f3a" },
  { id: "tx3", date: "2026-05-12 12:00", type: "BONUS", amount: 50.00, balanceAfter: 2864.66, resourceType: "—", resource: "—", description: "AI optimization savings bonus", hash: "c9d2...1b7e" },
  { id: "tx4", date: "2026-05-11 23:59", type: "DEBIT", amount: -8.40, balanceAfter: 2814.66, resourceType: "COMPUTE", resource: "worker-batch", description: "Batch compute - 8.75 hours", hash: "d4a1...3c5f" },
  { id: "tx5", date: "2026-05-11 20:00", type: "DEBIT", amount: -0.48, balanceAfter: 2823.06, resourceType: "STORAGE", resource: "media-bucket", description: "Storage egress - 24GB", hash: "e7f3...6d8a" },
  { id: "tx6", date: "2026-05-11 08:00", type: "CREDIT", amount: 500.00, balanceAfter: 2823.54, resourceType: "—", resource: "—", description: "Credit top-up via Stripe", hash: "f2b9...4e1c" },
  { id: "tx7", date: "2026-05-10 22:00", type: "DEBIT", amount: -15.36, balanceAfter: 2323.54, resourceType: "COMPUTE", resource: "api-prod-02", description: "Compute usage - 32 hours", hash: "g5c8...7a2d" },
  { id: "tx8", date: "2026-05-10 14:00", type: "REFUND", amount: 24.00, balanceAfter: 2338.90, resourceType: "COMPUTE", resource: "worker-batch", description: "SLA violation refund - 25min downtime", hash: "h8d1...2f9b" },
  { id: "tx9", date: "2026-05-10 06:00", type: "DEBIT", amount: -3.24, balanceAfter: 2314.90, resourceType: "DATABASE", resource: "redis-cache", description: "Redis cache - 18 hours", hash: "i1e6...5g4c" },
  { id: "tx10", date: "2026-05-09 18:00", type: "DEBIT", amount: -11.52, balanceAfter: 2318.14, resourceType: "COMPUTE", resource: "api-prod-01", description: "Compute usage - 24 hours", hash: "j3a7...8h6d" },
];

const columnHelper = createColumnHelper<Transaction>();

const typeColors: Record<string, "success" | "danger" | "info" | "warning"> = {
  DEBIT: "danger",
  CREDIT: "success",
  REFUND: "info",
  BONUS: "warning",
};

export function CreditLedger() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => <span className="text-white/60 text-xs font-mono">{info.getValue()}</span>,
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => <Badge variant={typeColors[info.getValue()]}>{info.getValue()}</Badge>,
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className={`text-sm font-bold ${val >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {val >= 0 ? "+" : ""}${Math.abs(val).toFixed(2)}
            </span>
          );
        },
      }),
      columnHelper.accessor("balanceAfter", {
        header: "Balance",
        cell: (info) => <span className="text-sm font-semibold text-white">${info.getValue().toFixed(2)}</span>,
      }),
      columnHelper.accessor("resourceType", {
        header: "Resource Type",
        cell: (info) => <span className="text-xs text-white/40">{info.getValue()}</span>,
      }),
      columnHelper.accessor("resource", {
        header: "Resource",
        cell: (info) => <span className="text-xs text-white/50 font-mono">{info.getValue()}</span>,
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => <span className="text-xs text-white/40 max-w-[200px] truncate block">{info.getValue()}</span>,
      }),
      columnHelper.accessor("hash", {
        header: () => (
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Hash
          </span>
        ),
        cell: (info) => <span className="text-xs text-violet-300/60 font-mono">{info.getValue()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Credit Ledger</h2>
          <p className="text-sm text-white/30 mt-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-violet-400" />
            Chain-hashed for tamper-proof transparency
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search transactions..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-white/[0.06]">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider cursor-pointer hover:text-white/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <ArrowUpDown className="w-3 h-3 opacity-40" />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
