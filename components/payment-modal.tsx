"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Barcode, QrCode } from "lucide-react";
import Image from "next/image";

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
interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export function PaymentModal({
  open,
  onOpenChange,
  invoice,
}: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState("card");

  const formatBarCode = (code: string) => {
    if (!code) return "";
    return code.replace(
      /^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d)(\d{14})$/,
      "$1.$2 $3.$4 $5.$6 $7 $8"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[556.88px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-slate-700">
            Escolha a forma de pagamento
          </DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="card"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Cartão
            </TabsTrigger>
            <TabsTrigger value="boleto" className="flex items-center gap-2">
              <Barcode className="h-4 w-4" />
              Boleto
            </TabsTrigger>
            <TabsTrigger value="pix" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Pix
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <Card className="h-[426.88px]">
              <CardContent className="flex flex-col justify-between h-full pt-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Número do Cartão</Label>
                  <Input id="number" placeholder="1234 1234 1234 1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Data de Expiração</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Como impresso no cartão..." />
                  </div>
                </div>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-900/90">
                  Pagar R$ {invoice?.total?.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="boleto">
            <Card className="h-[426.88px]">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Image
                      src="/barcode.png"
                      alt="Código de Barras"
                      width={400}
                      height={100}
                    />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg break-all font-mono text-sm">
                    {formatBarCode(invoice?.payment_info?.bar_code || "")}
                  </div>
                  <Button
                    className="w-full bg-slate-900 text-white hover:bg-slate-900/90"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        invoice?.payment_info?.bar_code || ""
                      )
                    }
                  >
                    Copiar código de barras
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pix">
            <Card className="h-[426.88px]">
              <CardContent className="pt-4">
                {invoice?.payment_info?.qr_code_url ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-white rounded-lg">
                        <Image
                          src={invoice.payment_info.qr_code_url}
                          alt="QR Code PIX"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg break-all font-mono text-sm">
                      {invoice.payment_info.qr_code_pix}
                    </div>
                    <Button
                      className="w-full bg-slate-900 text-white hover:bg-slate-900/90"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          invoice.payment_info?.qr_code_pix || ""
                        )
                      }
                    >
                      Copiar código PIX
                    </Button>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Código PIX não disponível
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
