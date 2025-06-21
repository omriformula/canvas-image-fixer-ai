
import AcceptanceFlow from '@/components/AcceptanceFlow';
import Navigation from '@/components/Navigation';

const Acceptance = () => {
  return (
    <div 
      className="min-h-screen py-10 px-4 relative"
      style={{
        backgroundImage: `url(/lovable-uploads/72723866-ac46-41eb-b95e-d98e28b8649a.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 mx-auto" style={{ maxWidth: '460px' }}>
        <Navigation />
        <AcceptanceFlow />
      </div>
    </div>
  );
};

export default Acceptance;
