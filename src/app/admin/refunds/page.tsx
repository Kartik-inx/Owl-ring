"use client";

import React from "react";
import { 
  CheckCircle2,
  XCircle,
  Search,
  Eye,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminRefundsPage = () => {
  const refunds = [
    { id: "#RF-8291", order: "#8291", customer: "James Wilson", reason: "Sizing issue", status: "Pending", date: "May 14, 2026" },
    { id: "#RF-8280", order: "#8280", customer: "Alice Brown", reason: "Defective product", status: "Approved", date: "May 12, 2026" },
    { id: "#RF-8275", order: "#8275", customer: "Bob Smith", reason: "Changed my mind", status: "Rejected", date: "May 10, 2026" },
  ];

  return (
    <div className="p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Refund Management</h1>
        <p className="text-muted text-sm">Handle and review customer refund requests.</p>
      </header>

      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
         <div className="p-8 border-b border-white/5">
            <div className="relative w-96">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search refunds..." 
                 className="w-full bg-white/5 border border-white/5 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-bold text-muted uppercase tracking-widest border-b border-white/5">
                     <th className="p-8">Refund ID</th>
                     <th className="p-8">Order</th>
                     <th className="p-8">Customer</th>
                     <th className="p-8">Reason</th>
                     <th className="p-8">Status</th>
                     <th className="p-8 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {refunds.map((refund, idx) => (
                    <tr key={idx} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                       <td className="p-8 font-bold text-sm text-accent">{refund.id}</td>
                       <td className="p-8 text-sm">{refund.order}</td>
                       <td className="p-8 font-bold text-sm">{refund.customer}</td>
                       <td className="p-8 text-sm text-muted">{refund.reason}</td>
                       <td className="p-8">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                            refund.status === "Pending" && "border-yellow-500/20 text-yellow-400 bg-yellow-500/5",
                            refund.status === "Approved" && "border-green-500/20 text-green-400 bg-green-500/5",
                            refund.status === "Rejected" && "border-red-500/20 text-red-400 bg-red-500/5",
                          )}>
                            {refund.status}
                          </span>
                       </td>
                       <td className="p-8 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-2 glass rounded-xl border border-white/5 text-green-400 hover:bg-green-400/10 transition-colors"><CheckCircle2 size={16} /></button>
                             <button className="p-2 glass rounded-xl border border-white/5 text-red-400 hover:bg-red-400/10 transition-colors"><XCircle size={16} /></button>
                             <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-white transition-colors"><Eye size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminRefundsPage;
