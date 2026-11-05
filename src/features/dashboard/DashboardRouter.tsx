import React from 'react';
import { useAppStore } from '../../store/appStore';
import { RecruiterDashboard } from './RecruiterDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';

export const DashboardRouter: React.FC = () => {
  const { currentUser } = useAppStore();

  const role = currentUser?.role || 'recruiter';

  if (role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  if (role === 'manager') {
    return <ManagerDashboard />;
  }

  return <RecruiterDashboard />;
};
