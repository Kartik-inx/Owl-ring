"use client";

import React from "react";
import { 
  Search,
  MoreVertical,
  Mail,
  Calendar,
  Shield,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { USERS } from "@/lib/data";

const AdminUsersPage = () => {
  return (
    <div className="p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Customer Base</h1>
        <p className="text-muted text-sm">Manage user accounts and administrative permissions.</p>
      </header>

      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
         <div className="p-8 border-b border-white/5">
            <div className="relative w-96">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search customers..." 
                 className="w-full bg-white/5 border border-white/5 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-bold text-muted uppercase tracking-widest border-b border-white/5">
                     <th className="p-8">Customer</th>
                     <th className="p-8">Contact</th>
                     <th className="p-8">Status</th>
                     <th className="p-8">Joined</th>
                     <th className="p-8 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {USERS.map((user, idx) => (
                    <tr key={idx} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                       <td className="p-8">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">{user.avatar}</div>
                             <div>
                                <p className="font-bold text-sm">{user.name}</p>
                                <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{user.role}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-8">
                          <div className="flex items-center gap-2 text-sm text-muted">
                             <Mail size={14} />
                             {user.email}
                          </div>
                       </td>
                       <td className="p-8">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20 text-green-400 bg-green-500/5">
                             Active
                          </span>
                       </td>
                       <td className="p-8">
                          <div className="flex items-center gap-2 text-sm text-muted">
                             <Calendar size={14} />
                             {user.joined}
                          </div>
                       </td>
                       <td className="p-8 text-right">
                          <button className="p-2 text-muted hover:text-white transition-colors"><MoreVertical size={18} /></button>
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

export default AdminUsersPage;
