
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

const ExampleDashboard = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dashboard form submitted:', { name, category, description });
  };

  const categoryOptions = [
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'marketing', label: 'Marketing' }
  ];

  return (
    <PageContainer>
      <FormCard
        title="Dashboard Settings"
        heroImage="/lovable-uploads/3ddd0a66-6fbf-4d23-ac56-bd6b303c55c5.png"
      >
        <StyledForm onSubmit={handleSubmit}>
          <FormField label="Project Name" htmlFor="name">
            <StyledInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
            />
          </FormField>

          <FormField label="Category" htmlFor="category">
            <StyledSelect
              value={category}
              onValueChange={setCategory}
              placeholder="Select category"
              options={categoryOptions}
            />
          </FormField>

          <FormField label="Description" htmlFor="description">
            <StyledInput
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
            />
          </FormField>

          <StyledButton type="submit">
            Save Settings
          </StyledButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
};

export default ExampleDashboard;
