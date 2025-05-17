
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "./UserProfile";
import { SupplementsSelector } from "./SupplementsSelector";
import { SupplementGallery } from "./SupplementGallery";
import { supplements, Supplement, calculatePackBudget, calculateTotalPrice, dummyUser } from "@/lib/dummyData";
import { useToast } from "@/components/ui/use-toast";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userVerified, setUserVerified] = useState(false);
  const [selectedSupplements, setSelectedSupplements] = useState<Record<string, Supplement[]>>({
    researcher: [],
    prof: [],
    dr: [],
    hls: []
  });
  const [budgetExceeded, setBudgetExceeded] = useState<Record<string, boolean>>({
    researcher: false,
    prof: false,
    dr: false,
    hls: false
  });
  const [userBudget, setUserBudget] = useState<{ min: number, max: number } | null>(null);
  const { toast } = useToast();

  // Calculate pack budgets based on user's budget range
  const packBudgets = userBudget ? calculatePackBudget(userBudget) : null;

  const handleAddSupplement = (packId: string, supplement: Supplement) => {
    const updatedSupplements = {
      ...selectedSupplements,
      [packId]: [...(selectedSupplements[packId] || []), supplement]
    };
    setSelectedSupplements(updatedSupplements);
    
    // Check if budget exceeded
    if (packBudgets) {
      const totalPackPrice = calculateTotalPrice(updatedSupplements[packId]);
      const isBudgetExceeded = totalPackPrice > packBudgets[packId].max;
      
      if (isBudgetExceeded && !budgetExceeded[packId]) {
        setBudgetExceeded(prev => ({
          ...prev,
          [packId]: true
        }));
        
        toast({
          title: "Budget Exceeded",
          description: `The total cost of ${packId} pack (₦${totalPackPrice.toLocaleString()}) exceeds the budget limit of ₦${packBudgets[packId].max.toLocaleString()}.`,
          variant: "destructive",
        });
      }
    }
    
    toast({
      title: "Supplement added",
      description: `Added ${supplement.name} to ${packId} pack`,
    });
  };

  const handleRemoveSupplement = (packId: string, supplementId: string) => {
    const updatedSupplements = {
      ...selectedSupplements,
      [packId]: selectedSupplements[packId].filter(sup => sup.id !== supplementId)
    };
    
    setSelectedSupplements(updatedSupplements);
    
    // Check if budget is no longer exceeded
    if (packBudgets) {
      const totalPackPrice = calculateTotalPrice(updatedSupplements[packId]);
      const isBudgetExceeded = totalPackPrice > packBudgets[packId].max;
      
      if (!isBudgetExceeded && budgetExceeded[packId]) {
        setBudgetExceeded(prev => ({
          ...prev,
          [packId]: false
        }));
      }
    }
    
    toast({
      title: "Supplement removed",
      description: `Removed supplement from ${packId} pack`,
    });
  };

  const handleAddFromGallery = (category: string, selectedIds: string[]) => {
    const supplementsToAdd = supplements.filter(s => selectedIds.includes(s.id));
    const categoryKey = category.toLowerCase();
    
    const updatedSupplements = {
      ...selectedSupplements,
      [categoryKey]: [...(selectedSupplements[categoryKey] || []), ...supplementsToAdd]
    };
    
    setSelectedSupplements(updatedSupplements);
    
    // Check if budget exceeded
    if (packBudgets) {
      const totalPackPrice = calculateTotalPrice(updatedSupplements[categoryKey]);
      const isBudgetExceeded = totalPackPrice > packBudgets[categoryKey].max;
      
      if (isBudgetExceeded && !budgetExceeded[categoryKey]) {
        setBudgetExceeded(prev => ({
          ...prev,
          [categoryKey]: true
        }));
        
        toast({
          title: "Budget Exceeded",
          description: `The total cost of ${categoryKey} pack (₦${totalPackPrice.toLocaleString()}) exceeds the budget limit of ₦${packBudgets[categoryKey].max.toLocaleString()}.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleDispatchPack = (packId: string) => {
    toast({
      title: "Pack Dispatched",
      description: `The ${packId} pack has been dispatched successfully.`,
    });
  };

  const navigateToGallery = () => {
    if (!userVerified) {
      setActiveTab("profile");
      toast({
        title: "Verification Required",
        description: "Please enter your benefek code before accessing supplements.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab("gallery");
  };

  const handleTabChange = (value: string) => {
    if ((value === "supplements" || value === "gallery") && !userVerified) {
      setActiveTab("profile");
      toast({
        title: "Verification Required",
        description: "Please enter your benefek code before accessing supplements.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab(value);
  };

  const handleUserVerified = (verified: boolean, budget: { min: number, max: number } | null) => {
    setUserVerified(verified);
    if (budget) {
      setUserBudget(budget);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">User Profile</TabsTrigger>
        <TabsTrigger value="supplements">Select Supplements</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="animate-fade-in">
        <UserProfile onUserVerified={handleUserVerified} />
      </TabsContent>
      
      <TabsContent value="supplements" className="animate-fade-in">
        <SupplementsSelector 
          onNavigateToGallery={navigateToGallery} 
          selectedSupplements={selectedSupplements}
          onAddSupplement={handleAddSupplement}
          onRemoveSupplement={handleRemoveSupplement}
          budgetExceeded={budgetExceeded}
          packBudgets={packBudgets}
          onDispatchPack={handleDispatchPack}
        />
      </TabsContent>
      
      <TabsContent value="gallery" className="animate-fade-in">
        <SupplementGallery onAddToCategory={handleAddFromGallery} />
      </TabsContent>
    </Tabs>
  );
}
