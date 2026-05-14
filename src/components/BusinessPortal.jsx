import { useState } from 'react';
import BusinessLanding from './BusinessLanding';
import BusinessSignupForm from './BusinessSignupForm';
import BusinessDashboard from './BusinessDashboard';

export default function BusinessPortal({ onClose }) {
  const [stage, setStage] = useState('landing');
  const [business, setBusiness] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-white" style={{ maxWidth: 430, margin: '0 auto', left: 0, right: 0 }}>
      {stage === 'landing' && (
        <BusinessLanding
          onSignup={() => setStage('signup')}
          onClose={onClose}
        />
      )}
      {stage === 'signup' && (
        <BusinessSignupForm
          onBack={() => setStage('landing')}
          onDone={(data) => { setBusiness(data); setStage('dashboard'); }}
        />
      )}
      {stage === 'dashboard' && (
        <BusinessDashboard
          business={business}
          onClose={onClose}
        />
      )}
    </div>
  );
}
