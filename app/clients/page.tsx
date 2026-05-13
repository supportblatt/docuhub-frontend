"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import {
  CrmActionPill,
  CrmPageHeader,
  CrmSearchFilters,
} from "@/components/crm/ui";
import { LeadsBoard } from "@/components/crm/leads-board";
import { ClientDetailPanel } from "@/components/crm/client-detail-panel";
import { ClientsTable } from "@/components/crm/clients-table";

export default function ClientsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"clients" | "leads">("leads");
  const [clients, setClients] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "clients" || tab === "leads") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4100/api";

        const [clientsRes, leadsRes] = await Promise.all([
          fetch(`${apiBase}/clients`),
          fetch(`${apiBase}/leads`),
        ]);

        if (!clientsRes.ok || !leadsRes.ok) {
          throw new Error("Failed to fetch from backend");
        }

        const clientsData = await clientsRes.json();
        const leadsData = await leadsRes.json();
        const mappedLeads = leadsData.map((lead: any) => ({
          ...lead,
          hubspotGroup: lead.leadGroup?.name || "Unassigned",
        }));

        setClients(clientsData);
        setLeads(mappedLeads);

        if (clientsData.length > 0 && !selectedClientId) {
          setSelectedClientId(clientsData[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedClientId]);

  const selected = clients.find((client) => client.id === selectedClientId) || clients[0];

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="border-b border-[#e7eaf0]">
        <div className="flex gap-8 px-6">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-4 text-[16px] font-semibold transition-colors border-b-2 ${
              activeTab === "leads"
                ? "border-[#2563eb] text-[#2563eb]"
                : "border-transparent text-[#667085] hover:text-[#111a2f]"
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`pb-4 text-[16px] font-semibold transition-colors border-b-2 ${
              activeTab === "clients"
                ? "border-[#2563eb] text-[#2563eb]"
                : "border-transparent text-[#667085] hover:text-[#111a2f]"
            }`}
          >
            Clients
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "clients" ? (
          <div
            className={`grid gap-6 h-full overflow-hidden transition-all duration-300 ${
              isDetailOpen ? "xl:grid-cols-[1fr_400px]" : "grid-cols-1"
            }`}
          >
            <div className="space-y-8 overflow-y-auto px-6 pt-6 crm-scroll">
              <CrmPageHeader
                title="Clients"
                subtitle="Manage all client records and applications"
                action={
                  <div className="flex gap-2">
                    <CrmActionPill href="#" label="Export" />
                    <CrmActionPill
                      href="#"
                      label="Add Client"
                      tone="blue"
                      icon={<Plus className="h-4 w-4" />}
                    />
                  </div>
                }
              />

              <CrmSearchFilters
                searchPlaceholder="Search by name, email, SMSF, or company..."
                filters={["All Statuses", "All Staff"]}
              />

              <ClientsTable
                clients={clients}
                selectedClientId={selectedClientId}
                isDetailOpen={isDetailOpen}
                onSelectClient={setSelectedClientId}
                onOpenDetails={(clientId) => {
                  setSelectedClientId(clientId);
                  setIsDetailOpen(true);
                }}
              />
            </div>

            <ClientDetailPanel
              selected={selected}
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
            />
          </div>
        ) : (
          <div className="space-y-8 overflow-y-auto px-6 pt-6 h-full crm-scroll animate-in fade-in duration-300">
            <CrmPageHeader
              title="SMSF Leads"
              subtitle="Manage all SMSF leads and applications"
              action={
                <div className="flex gap-2">
                  <CrmActionPill href="#" label="Export" />
                  <CrmActionPill
                    href="#"
                    label="Add Lead"
                    tone="blue"
                    icon={<Plus className="h-4 w-4" />}
                  />
                </div>
              }
            />

            <CrmSearchFilters
              searchPlaceholder="Search by lead name, advisor, email..."
              filters={["All Statuses", "All Groups"]}
            />

            <LeadsBoard leads={leads} />
          </div>
        )}
      </div>
    </div>
  );
}
