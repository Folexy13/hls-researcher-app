
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supplements } from "@/lib/dummyData";
import { useToast } from "@/components/ui/use-toast";

interface SupplementGalleryProps {
  onAddToCategory: (category: string, selectedIds: string[]) => void;
}

export function SupplementGallery({ onAddToCategory }: SupplementGalleryProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();

  const handleToggleSelect = (id: string) => {
    setSelectedSupplements(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCategory = () => {
    if (!selectedCategory) {
      toast({
        title: "No category selected",
        description: "Please select a category to add supplements to.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedIds = Object.keys(selectedSupplements).filter(id => selectedSupplements[id]);
    
    if (selectedIds.length === 0) {
      toast({
        title: "No supplements selected",
        description: "Please select at least one supplement.",
        variant: "destructive",
      });
      return;
    }
    
    onAddToCategory(selectedCategory, selectedIds);
    
    // Reset selections
    setSelectedSupplements({});
    
    toast({
      title: "Supplements added",
      description: `${selectedIds.length} supplements added to ${selectedCategory} pack.`,
    });
  };

  return (
    <div className="animate-fade-in space-y-6 p-2 sm:p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-researcher-primary">Supplement Gallery</h2>
        <p className="text-muted-foreground">Select supplements to add to your packs</p>
      </div>
      
      <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center justify-center">
        <select 
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-researcher-primary focus:border-researcher-primary"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a pack...</option>
          <option value="researcher">Researcher Pack</option>
          <option value="prof">Prof Pack</option>
          <option value="dr">Dr's Pack</option>
          <option value="hls">HLS Pack</option>
        </select>
        
        <Button 
          onClick={handleAddToCategory}
          disabled={!selectedCategory || Object.keys(selectedSupplements).filter(id => selectedSupplements[id]).length === 0}
          className="bg-researcher-primary hover:bg-researcher-secondary"
        >
          Add Selected to Pack
        </Button>
      </div>
      
      <div className="supplement-grid">
        {supplements.map((supplement) => (
          <Card 
            key={supplement.id} 
            className={`${
              selectedSupplements[supplement.id] ? 'ring-2 ring-researcher-primary' : ''
            } hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => handleToggleSelect(supplement.id)}
          >
            <CardContent className="p-3 text-center">
              <div className="relative mb-1">
                <img 
                  src={supplement.imageUrl} 
                  alt={supplement.name} 
                  className="w-full h-auto rounded"
                />
                <Checkbox 
                  checked={!!selectedSupplements[supplement.id]} 
                  className="absolute top-1 right-1 h-5 w-5 bg-white"
                  onCheckedChange={() => handleToggleSelect(supplement.id)}
                />
              </div>
              <h3 className="font-medium mt-2 text-sm">{supplement.name}</h3>
              <p className="text-xs text-muted-foreground">{supplement.category}</p>
            </CardContent>
            <CardFooter className="p-2">
              <p className="text-xs text-muted-foreground truncate w-full">
                {supplement.description.substring(0, 30)}
                {supplement.description.length > 30 ? '...' : ''}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
