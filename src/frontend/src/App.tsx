import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import PasswordGate from './components/PasswordGate';
import Layout from './components/Layout';
import AnswerList from './components/AnswerList';
import DeveloperProfile from './components/DeveloperProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated from session storage
    const authenticated = sessionStorage.getItem('authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    sessionStorage.setItem('authenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <PasswordGate onAuthenticated={handleAuthenticated} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Layout>
        <AnswerList />
        <DeveloperProfile />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
