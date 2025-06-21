
import DashboardOverview from '@/components/DashboardOverview';
import Navigation from '@/components/Navigation';
import { PageContainer } from '@/design-system';

const Dashboard = () => {
  return (
    <PageContainer>
      <Navigation />
      <DashboardOverview />
    </PageContainer>
  );
};

export default Dashboard;
