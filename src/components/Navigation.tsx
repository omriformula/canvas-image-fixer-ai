
import { Link, useLocation } from 'react-router-dom';
import { designTokens } from '@/design-system';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Payment Offer' },
    { path: '/link-creation', label: 'Create Link' },
    { path: '/acceptance', label: 'Acceptance Flow' },
    { path: '/dashboard', label: 'Dashboard' }
  ];

  return (
    <nav 
      className="mb-8 p-4 rounded-2xl"
      style={{ 
        backgroundColor: designTokens.colors.background.card,
        boxShadow: designTokens.shadows.card
      }}
    >
      <div className="flex flex-wrap gap-4 justify-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-[#2d2d2d] text-white'
                : 'text-[#2d2d2d] hover:bg-gray-100'
            }`}
            style={{
              fontSize: designTokens.typography.label.size,
              fontWeight: designTokens.typography.label.weight
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
