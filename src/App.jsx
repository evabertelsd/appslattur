import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingSlides from './components/OnboardingSlides';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import DealsScreen from './components/DealsScreen';
import CreatorScreen from './components/CreatorScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import BusinessPortal from './components/BusinessPortal';

export default function App() {
  const [stage, setStage] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showBusiness, setShowBusiness] = useState(false);
  const [user, setUser] = useState(null);
  const [savedDeals, setSavedDeals] = useState(new Set());

  const toggleSave = (id) => {
    setSavedDeals((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAuth = (userData) => {
    setUser(userData);
    setStage('app');
  };

  if (stage === 'splash') return <SplashScreen onDone={() => setStage('onboarding')} />;
  if (stage === 'onboarding') return <OnboardingSlides onDone={() => setStage('auth')} />;
  if (stage === 'auth') return <AuthScreen onAuth={handleAuth} />;

  const screens = {
    home: <HomeScreen savedDeals={savedDeals} onToggleSave={toggleSave} onOpenBusiness={() => setShowBusiness(true)} />,
    search: <SearchScreen savedDeals={savedDeals} onToggleSave={toggleSave} />,
    deals: <DealsScreen savedDeals={savedDeals} onToggleSave={toggleSave} />,
    creator: <CreatorScreen />,
    profile: <ProfileScreen user={user} savedDeals={savedDeals} onOpenBusiness={() => setShowBusiness(true)} onLogout={() => setStage('auth')} />,
  };

  return (
    <div className="relative">
      {screens[activeTab]}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {showBusiness && <BusinessPortal onClose={() => setShowBusiness(false)} />}
    </div>
  );
}
