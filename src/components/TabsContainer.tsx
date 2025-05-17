
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "./UserProfile";
import { SupplementsSelector } from "./SupplementsSelector";
import { SupplementGallery } from "./SupplementGallery";
import { supplements, Supplement } from "@/lib/dummyData";
import { useToast } from "@/components/ui/use-toast";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedSupplements, setSelectedSupplements] = useState<Record<string, Supplement[]>>({
    researcher: [],
    prof: [],
    dr: [],
    hls: []
  });
  const { toast } = useToast();

  const handleAddSupplement = (packId: string, supplement: Supplement) => {
    setSelectedSupplements(prev => ({
      ...prev,
      [packId]: [...(prev[packId] || []), supplement]
    }));
    
    toast({
      title: "Supplement added",
      description: `Added ${supplement.name} to ${packId} pack`,
    });
  };

  const handleAddFromGallery = (category: string, selectedIds: string[]) => {
    const supplementsToAdd = supplements.filter(s => selectedIds.includes(s.id));
    const categoryKey = category.toLowerCase();
    
    setSelectedSupplements(prev => ({
      ...prev,
      [categoryKey]: [...(prev[categoryKey] || []), ...supplementsToAdd]
    }));
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
        />
      </TabsContent>
      
      <TabsContent value="gallery" className="animate-fade-in">
        <SupplementGallery onAddToCategory={handleAddFromGallery} />
      </TabsContent>
    </Tabs>
  );
}
