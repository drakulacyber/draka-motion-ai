'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UsersRound,
  Plus,
  Mail,
  Crown,
  Pencil,
  Shield,
  Eye,
  Trash2,
  Clock,
  Activity,
  ChevronDown,
  Image,
  Video,
  MessageSquare,
  UserPlus,
  Settings,
  FolderOpen,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TeamRole = 'admin' | 'editor' | 'viewer';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  joinedAt: string;
  avatar?: string;
  isOnline: boolean;
}

interface PendingInvite {
  id: string;
  email: string;
  role: TeamRole;
  sentAt: string;
}

interface TeamActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: React.ReactNode;
}

const roleConfig: Record<TeamRole, { label: string; color: string; icon: React.ReactNode }> = {
  admin: {
    label: 'Admin',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    icon: <Crown className="w-3 h-3" />,
  },
  editor: {
    label: 'Editor',
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    icon: <Pencil className="w-3 h-3" />,
  },
  viewer: {
    label: 'Viewer',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: <Eye className="w-3 h-3" />,
  },
};

const sampleMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Creator',
    email: 'alex@draka.ai',
    role: 'admin',
    joinedAt: '2024-01-15',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sarah Designer',
    email: 'sarah@draka.ai',
    role: 'editor',
    joinedAt: '2024-03-10',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Mike Engineer',
    email: 'mike@draka.ai',
    role: 'editor',
    joinedAt: '2024-04-22',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Lisa Analyst',
    email: 'lisa@draka.ai',
    role: 'viewer',
    joinedAt: '2024-06-05',
    isOnline: false,
  },
];

const pendingInvites: PendingInvite[] = [
  { id: '1', email: 'newdesigner@studio.com', role: 'editor', sentAt: '2024-07-12' },
  { id: '2', email: 'intern@company.co', role: 'viewer', sentAt: '2024-07-14' },
];

const recentActivities: TeamActivity[] = [
  {
    id: '1',
    user: 'Sarah Designer',
    action: 'generated',
    target: '12 images in Brand Campaign',
    time: '2 hours ago',
    icon: <Image className="w-4 h-4 text-violet-400" />,
  },
  {
    id: '2',
    user: 'Alex Creator',
    action: 'created',
    target: 'new project "Summer Ads"',
    time: '4 hours ago',
    icon: <FolderOpen className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: '3',
    user: 'Mike Engineer',
    action: 'generated',
    target: '3 videos for Product Launch',
    time: '6 hours ago',
    icon: <Video className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: '4',
    user: 'Alex Creator',
    action: 'invited',
    target: 'newdesigner@studio.com',
    time: '1 day ago',
    icon: <UserPlus className="w-4 h-4 text-amber-400" />,
  },
  {
    id: '5',
    user: 'Lisa Analyst',
    action: 'commented on',
    target: 'Character Designs project',
    time: '2 days ago',
    icon: <MessageSquare className="w-4 h-4 text-fuchsia-400" />,
  },
];

const permissions: { action: string; admin: boolean; editor: boolean; viewer: boolean }[] = [
  { action: 'Create projects', admin: true, editor: true, viewer: false },
  { action: 'Generate content', admin: true, editor: true, viewer: false },
  { action: 'Edit & delete projects', admin: true, editor: true, viewer: false },
  { action: 'View all projects', admin: true, editor: true, viewer: true },
  { action: 'Manage team members', admin: true, editor: false, viewer: false },
  { action: 'Manage billing', admin: true, editor: false, viewer: false },
  { action: 'Access API keys', admin: true, editor: false, viewer: false },
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(sampleMembers);
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleChangeRole = (id: string, newRole: TeamRole) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    setEditingRole(null);
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/[0.08]">
            <UsersRound className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Team Workspace</h1>
            <p className="text-sm text-white/40">Collaborate with your team members</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column — Members + Invites */}
        <div className="xl:col-span-2 space-y-6">
          {/* Members List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <UsersRound className="w-4 h-4 text-white/60" />
                <h2 className="text-white font-semibold">Members</h2>
                <span className="text-xs text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-full">
                  {members.length}
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {members.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-white/[0.1] flex items-center justify-center">
                        <span className="text-sm font-semibold text-white/80">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0f]" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-white">{member.name}</h3>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border',
                            roleConfig[member.role].color
                          )}
                        >
                          {roleConfig[member.role].icon}
                          {roleConfig[member.role].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Joined {new Date(member.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Edit Role Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setEditingRole(editingRole === member.id ? null : member.id)
                        }
                        className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.05] rounded-lg transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        Edit Role
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      {editingRole === member.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute right-0 top-full mt-1 w-36 bg-[#141420] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl z-50"
                        >
                          {(['admin', 'editor', 'viewer'] as TeamRole[]).map((role) => (
                            <button
                              key={role}
                              onClick={() => handleChangeRole(member.id, role)}
                              className={cn(
                                'w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-colors',
                                member.role === role
                                  ? 'text-violet-400 bg-violet-500/10'
                                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                              )}
                            >
                              {roleConfig[role].icon}
                              {roleConfig[role].label}
                              {member.role === role && <Check className="w-3 h-3 ml-auto" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pending Invites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 p-5 border-b border-white/[0.06]">
              <Mail className="w-4 h-4 text-white/60" />
              <h2 className="text-white font-semibold">Pending Invites</h2>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                {pendingInvites.length}
              </span>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-dashed border-white/[0.15] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white/30" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">{invite.email}</p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-lg border',
                            roleConfig[invite.role].color
                          )}
                        >
                          {roleConfig[invite.role].icon}
                          {roleConfig[invite.role].label}
                        </span>
                        <span>Sent {new Date(invite.sentAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 text-xs text-white/50 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors">
                      Resend
                    </button>
                    <button className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column — Activity + Permissions */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 p-5 border-b border-white/[0.06]">
              <Activity className="w-4 h-4 text-white/60" />
              <h2 className="text-white font-semibold">Recent Activity</h2>
            </div>

            <div className="p-4 space-y-1">
              {recentActivities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-white/[0.05] mt-0.5">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70">
                      <span className="text-white font-medium">{activity.user}</span>{' '}
                      {activity.action}{' '}
                      <span className="text-white/50">{activity.target}</span>
                    </p>
                    <p className="text-[11px] text-white/30 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Role Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 p-5 border-b border-white/[0.06]">
              <Shield className="w-4 h-4 text-white/60" />
              <h2 className="text-white font-semibold">Role Permissions</h2>
            </div>

            <div className="p-4">
              {/* Header */}
              <div className="grid grid-cols-4 gap-2 mb-3 px-2">
                <div className="text-xs text-white/30">Permission</div>
                <div className="text-xs text-amber-400/70 text-center">Admin</div>
                <div className="text-xs text-violet-400/70 text-center">Editor</div>
                <div className="text-xs text-cyan-400/70 text-center">Viewer</div>
              </div>

              <div className="space-y-1">
                {permissions.map((perm) => (
                  <div
                    key={perm.action}
                    className="grid grid-cols-4 gap-2 px-2 py-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="text-xs text-white/60">{perm.action}</div>
                    {[perm.admin, perm.editor, perm.viewer].map((has, i) => (
                      <div key={i} className="flex justify-center">
                        {has ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-white/15" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
