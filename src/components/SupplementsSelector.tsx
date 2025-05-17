
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, Gallery } from "lucide-react";
import { AddSupplementModal } from "./AddSupplementModal";
import { packCategories, supplements } from "@/lib/dummyData";
import { Badge } from "@/components/ui/badge";

interface SupplementsSelectorProps {
  onNavigateToGallery: () => void;
  selectedSupplements: Record<string, any[]>;
  onAddSupplement: (packId: string, supplement: any) => void;
}

export function SupplementsSelector({ 
  onNavigateToGallery, 
  selectedSupplements,
  onAddSupplement
}: SupplementsSelectorProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="animate-fade-in space-y-6 p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-researcher-primary">Select Supplements</h2>
        <p className="text-muted-foreground">Choose supplements for your packs</p>
      </div>

      <Accordion type="multiple" className="w-full max-w-3xl mx-auto">
        {packCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-lg font-medium">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 p-2">
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                  <Button 
                    onClick={() => setActiveModal(category.id)}
                    className="bg-researcher-primary hover:bg-researcher-secondary flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={onNavigateToGallery}
                    className="border-researcher-primary text-researcher-primary hover:bg-researcher-muted flex items-center"
                  >
                    <Gallery className="mr-2 h-4 w-4" /> Add from Gallery
                  </Button>
                </div>
                
                {/* Selected supplements for this category */}
                <div className="mt-4 space-y-2">
                  {selectedSupplements[category.id] && selectedSupplements[category.id].length > 0 ? (
                    selectedSupplements[category.id].map(supplement => (
                      <div 
                        key={supplement.id} 
                        className="p-3 border rounded-md flex items-center justify-between bg-white shadow-sm hover:shadow transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-researcher-primary rounded-md flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-bold">
                              {supplement.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{supplement.name}</p>
                            <p className="text-xs text-muted-foreground">{supplement.description.substring(0, 50)}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-researcher-muted">
                          {category.name.replace(" Packs", "")}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No supplements selected for this pack
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {activeModal && (
        <AddSupplementModal 
          isOpen={true}
          onClose={() => setActiveModal(null)}
          packId={activeModal}
          onAdd={(supplement) => onAddSupplement(activeModal, supplement)}
        />
      )}
    </div>
  );
}
