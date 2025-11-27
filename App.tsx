import React, { useState, useEffect } from 'react';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import SupplierDashboard from './components/SupplierDashboard';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

type View = 'login' | 'createAccount' | 'main' | 'supplierDashboard' | 'loading';
export type User = { name: string; email: string };

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('loading');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        const appUser: User = {
          name: user.displayName || user.email?.split('@')[0] || 'Usuário',
          email: user.email || '',
        };
        setCurrentUser(appUser);
        if (appUser.email.toLowerCase() === 'admin@gmail.com') {
          setCurrentView('supplierDashboard');
        } else {
          setCurrentView('main');
        }
      } else {
        setCurrentUser(null);
        setCurrentView('login');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will handle the view change
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Erro ao tentar sair. Por favor, tente novamente.");
    }
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const navigateToCreateAccount = () => {
    setCurrentView('createAccount');
  };

  const navigateToLogin = () => {
    setCurrentView('login');
  };

  const renderView = () => {
    switch (currentView) {
      case 'loading':
        return <div className="min-h-screen bg-black flex justify-center items-center text-white">Carregando...</div>;
      case 'login':
        return <LoginScreen onNavigateToCreateAccount={navigateToCreateAccount} />;
      case 'createAccount':
        return <CreateAccountScreen onNavigateToLogin={navigateToLogin} />;
      case 'main':
        return <MainScreen onLogout={handleLogout} user={currentUser} onUpdateUser={handleUpdateUser} />;
      case 'supplierDashboard':
        return <SupplierDashboard onLogout={handleLogout} user={currentUser} />;
      default:
        return <LoginScreen onNavigateToCreateAccount={navigateToCreateAccount} />;
    }
  };

  return (
    <div className="bg-black">
      <div key={currentView} className="view-transition">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
