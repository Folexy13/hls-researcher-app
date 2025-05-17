
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "./UserProfile";
import { SupplementsSelector } from "./SupplementsSelector";
import { SupplementGallery } from "./SupplementGallery";
import { supplements, Supplement, calculatePackBudget, calculateTotalPrice, dummyUser } from "@/lib/dummyData";
import { useToast } from "@/components/ui/use-toast";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("profile");
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
  const { toast } = useToast();

  // Calculate pack budgets based on user's budget range
  const packBudgets = calculatePackBudget(dummyUser.budget || { min: 0, max: 0 });

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
    setActiveTab("gallery");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">User Profile</TabsTrigger>
        <TabsTrigger value="supplements">Select Supplements</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="animate-fade-in">
        <UserProfile />
      </TabsContent>
      
      <TabsContent value="supplements" className="animate-fade-in">
        <SupplementsSelector 
          onNavigateToGallery={navigateToGallery} 
          selectedSupplements={selectedSupplements}
          onAddSupplement={handleAddSupplement}
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
