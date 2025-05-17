
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { TabsContainer } from "@/components/TabsContainer";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, LogOut } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-researcher-background">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-2 sm:px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-researcher-primary">Researcher App</h1>
          </div>
          
          <div>
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-researcher-primary text-researcher-primary hover:bg-researcher-muted"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-researcher-primary hover:bg-researcher-secondary"
              >
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-4 px-2 sm:px-4">
        {isAuthenticated ? (
          <TabsContainer />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <h2 className="text-3xl font-bold mb-4 text-researcher-primary">Welcome to the Researcher App</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Please log in to access the researcher platform and manage your supplements.
            </p>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-researcher-primary hover:bg-researcher-secondary"
            >
              <LogIn className="h-4 w-4 mr-2" /> Login / Register
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-2 sm:px-4 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Researcher App. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
}

export default Index;
