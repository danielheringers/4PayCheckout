/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { columns, Invoice } from "./columns";
import { SkeletonRow } from "./skeleton-row";
import { PaymentModal } from "./payment-modal";

type InvoiceStatus = "all" | "pending" | "approved" | "expired";

interface ApiResponse {
  data: Invoice[];
  total_pages: number;
}

export function InvoiceTable() {
  const [filter, setFilter] = useState<InvoiceStatus>("all");
  const [page, setPage] = useState(1);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/invoices?page=${page}&limit=25&status=${filter}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }
        const data: ApiResponse = await response.json();
        setInvoices(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to load invoices");
        console.error("Error fetching invoices:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [page, filter]);

  const fetchInvoiceDetails = async (invoice: Invoice) => {
    try {
      const response = await fetch("/api/invoice-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: invoice.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch invoice details");
      }
      const data = await response.json();
      const updatedInvoice = { ...invoice, ...data.data[0] };
      setSelectedInvoice(updatedInvoice);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    meta: {
      onPaymentClick: (invoice: Invoice) => {
        fetchInvoiceDetails(invoice);
      },
    } as any,
  });

  return (
    <>
      <div className="mb-4 space-x-2">
        <RadioGroup
          defaultValue="all"
          className="mb-4 flex space-x-4"
          onValueChange={(value) => {
            setFilter(value as InvoiceStatus);
            setPage(1);
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Todas as faturas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pending" id="pending" />
            <Label htmlFor="pending">Pendentes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="approved" id="approved" />
            <Label htmlFor="approved">Pagas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expired" id="expired" />
            <Label htmlFor="expired">Vencidas</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="overflow-auto">
        <div className="rounded-md border">
          <div className="max-h-[600px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonRow key={index} columns={columns.length} />
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-red-500"
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <PaymentModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          invoice={selectedInvoice}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Button
          onClick={() => setPage((page) => Math.max(1, page - 1))}
          disabled={page === 1 || isLoading}
          className="bg-slate-900 text-white hover:bg-slate-900/90"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((page) => Math.min(totalPages, page + 1))}
          disabled={page === totalPages || isLoading}
          className="bg-slate-900 text-white hover:bg-slate-900/90"
        >
          Next
        </Button>
      </div>
    </>
  );
}
