
import LinkCreationForm from '@/components/LinkCreationForm';
import Navigation from '@/components/Navigation';
import { PageContainer } from '@/design-system';

const LinkCreation = () => {
  return (
    <PageContainer>
      <Navigation />
      <LinkCreationForm />
    </PageContainer>
  );
};

export default LinkCreation;
