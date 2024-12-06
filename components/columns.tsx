/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clock, CheckCircle, AlertCircle } from "lucide-react";

export type Invoice = {
  id: string;
  erp_id: string;
  status: string;
  total: number;
  buyer_name: string;
  due_date: string;
  expedition_date: string;
  billing_provider_number: string;
  payment_info?: {
    bar_code: string;
    digitable_line: string;
    qr_code_pix: string;
    qr_code_url: string;
  };
};

interface ColumnActionProps {
  row: any;
  onPaymentClick: (invoice: Invoice) => void;
}

const ColumnAction = ({ row, onPaymentClick }: ColumnActionProps) => {
  const status = row.getValue("status") as string;

  if (status === "approved") {
    return null; // Don't render the button if the status is approved (paid)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-sky-900 border-sky-900 hover:bg-sky-900 hover:text-white"
      onClick={() => onPaymentClick(row.original)}
    >
      Pagar
    </Button>
  );
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "erp_id",
    header: "ID",
  },
  {
    accessorKey: "billing_provider_number",
    header: "Número",
  },
  {
    accessorKey: "expedition_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Emissão
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.getValue("expedition_date")).toLocaleDateString(
        "pt-BR"
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vencimento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(row.getValue("due_date")).toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusInfo = (status: string) => {
        switch (status) {
          case "pending":
            return {
              color: "bg-yellow-100 text-yellow-800",
              icon: Clock,
              label: "Pendente",
            };
          case "approved":
            return {
              color: "bg-green-100 text-green-800",
              icon: CheckCircle,
              label: "Aprovado",
            };
          case "expired":
            return {
              color: "bg-red-100 text-red-800",
              icon: AlertCircle,
              label: "Vencido",
            };
          default:
            return {
              color: "bg-gray-100 text-gray-800",
              icon: Clock,
              label: status,
            };
        }
      };
      const { color, icon: Icon, label } = getStatusInfo(status);
      return (
        <span
          className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return formatted;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return (
        <ColumnAction
          row={row}
          onPaymentClick={(table.options.meta as any).onPaymentClick}
        />
      );
    },
  },
];
