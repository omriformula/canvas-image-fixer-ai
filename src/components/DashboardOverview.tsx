
import { useState } from 'react';
import {
  PageContainer,
  FormCard,
  FormField,
  StyledInput,
  StyledSelect,
  StyledButton,
  StyledForm
} from '@/design-system';

const DashboardOverview = () => {
  const [filterPeriod, setFilterPeriod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dashboard filtered:', { filterPeriod, searchQuery });
  };

  const periodOptions = [
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'quarter', label: 'Last 3 months' },
    { value: 'year', label: 'Last year' }
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Filter Card */}
        <FormCard
          title="Dashboard Filters"
          heroImage="/lovable-uploads/e0d33fe8-6348-4e32-83f2-01f518339b1b.png"
          heroAlt="Dashboard Hero"
        >
          <StyledForm onSubmit={handleFilterSubmit}>
            <FormField label="Time Period" htmlFor="period">
              <StyledSelect
                value={filterPeriod}
                onValueChange={setFilterPeriod}
                placeholder="Select time period"
                options={periodOptions}
              />
            </FormField>

            <FormField label="Search Transactions" htmlFor="search">
              <StyledInput
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, amount, or ID..."
              />
            </FormField>

            <StyledButton type="submit">
              Apply Filters
            </StyledButton>
          </StyledForm>
        </FormCard>

        {/* Quick Actions Card */}
        <FormCard title="Quick Actions">
          <div className="space-y-4">
            <StyledButton>
              Create New Payment Link
            </StyledButton>
            <StyledButton>
              Review Pending Acceptances
            </StyledButton>
            <StyledButton>
              Export Transaction Report
            </StyledButton>
          </div>
        </FormCard>
      </div>
    </PageContainer>
  );
};

export default DashboardOverview;
