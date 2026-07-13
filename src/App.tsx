import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { NotificationToast } from '@/components/NotificationToast';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Dashboard } from '@/pages/Dashboard';
import { CompetitorAnalysis } from '@/pages/CompetitorAnalysis';
import { ProductManagement } from '@/pages/ProductManagement';
import { AdManagement } from '@/pages/AdManagement';
import { Analytics } from '@/pages/Analytics';
import { Platforms } from '@/pages/Platforms';
import { Users } from '@/pages/Users';
import { Settings } from '@/pages/Settings';
import { useAuthStore } from '@/stores/authStore';
import './index.css';

type PageType = 'login' | 'register' | 'dashboard' | 'competitor' | 'products' | 'ads' | 'analytics' | 'platforms' | 'users' | 'settings';

const pageComponents: Record<PageType, React.ComponentType<{ onNavigate: (page: PageType) => void }>> = {
  login: Login,
  register: Register,
  dashboard: Dashboard,
  competitor: CompetitorAnalysis,
  products: ProductManagement,
  ads: AdManagement,
  analytics: Analytics,
  platforms: Platforms,
  users: Users,
  settings: Settings,
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const { isLoggedIn, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (isLoggedIn && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('dashboard');
    } else if (!isLoggedIn && currentPage !== 'login' && currentPage !== 'register') {
      setCurrentPage('login');
    }
  }, [isLoggedIn, currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const PageComponent = pageComponents[currentPage];

  if (currentPage === 'login' || currentPage === 'register') {
    return (
      <>
        <PageComponent onNavigate={handleNavigate} />
        <NotificationToast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={handleNavigate} />
      <main className="ml-64 p-6">
        <PageComponent onNavigate={handleNavigate} />
      </main>
      <NotificationToast />
    </div>
  );
}

export default App;