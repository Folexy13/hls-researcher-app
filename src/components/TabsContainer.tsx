
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
    Researcher: [],
    Prof: [],
    Dr: [],
    HLS: []
  });
  const { toast } = useToast();

  const handleAddSupplement = (packId: string, supplement: Supplement) => {
    setSelectedSupplements(prev => ({
      ...prev,
      [packId]: [...(prev[packId] || []), supplement]
    }));
  };

  const handleAddFromGallery = (category: string, selectedIds: string[]) => {
    const supplementsToAdd = supplements.filter(s => selectedIds.includes(s.id));
    
    setSelectedSupplements(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), ...supplementsToAdd]
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
      
      <TabsContent value="profile">
        <UserProfile />
      </TabsContent>
      
      <TabsContent value="supplements">
        <SupplementsSelector 
          onNavigateToGallery={navigateToGallery} 
          selectedSupplements={selectedSupplements}
          onAddSupplement={handleAddSupplement}
        />
      </TabsContent>
      
      <TabsContent value="gallery">
        <SupplementGallery onAddToCategory={handleAddFromGallery} />
      </TabsContent>
    </Tabs>
  );
}
