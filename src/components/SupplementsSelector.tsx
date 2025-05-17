
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, GalleryHorizontal, AlertTriangle, Package } from "lucide-react";
import { AddSupplementModal } from "./AddSupplementModal";
import { packCategories, supplements, Supplement, calculateTotalPrice } from "@/lib/dummyData";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SupplementsSelectorProps {
  onNavigateToGallery: () => void;
  selectedSupplements: Record<string, Supplement[]>;
  onAddSupplement: (packId: string, supplement: Supplement) => void;
  budgetExceeded: Record<string, boolean>;
  packBudgets: Record<string, { min: number, max: number }> | null;
  onDispatchPack: (packId: string) => void;
}

export function SupplementsSelector({ 
  onNavigateToGallery, 
  selectedSupplements,
  onAddSupplement,
  budgetExceeded,
  packBudgets,
  onDispatchPack
}: SupplementsSelectorProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="animate-fade-in space-y-6 p-2 sm:p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-researcher-primary">Select Supplements</h2>
        <p className="text-muted-foreground">Choose supplements for your packs</p>
      </div>

      <Accordion type="multiple" className="w-full max-w-3xl mx-auto">
        {packCategories.map((category) => {
          const hasSupplements = selectedSupplements[category.id]?.length > 0;
          const totalPackPrice = hasSupplements ? calculateTotalPrice(selectedSupplements[category.id]) : 0;
          const maxBudget = packBudgets ? packBudgets[category.id]?.max : 0;
          const minBudget = packBudgets ? packBudgets[category.id]?.min : 0;
          
          return (
            <AccordionItem 
              key={category.id} 
              value={category.id}
              className={budgetExceeded[category.id] ? "border-red-500" : ""}
            >
              <AccordionTrigger className="text-lg font-medium">
                {category.name}
                {hasSupplements && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({selectedSupplements[category.id].length} items)
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-2">
                  {packBudgets && (
                    <div className="text-sm">
                      <p>Budget range: ₦{minBudget.toLocaleString()} - ₦{maxBudget.toLocaleString()}</p>
                      {budgetExceeded[category.id] && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Budget exceeded: ₦{totalPackPrice.toLocaleString()} / ₦{maxBudget.toLocaleString()}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                  
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
                      <GalleryHorizontal className="mr-2 h-4 w-4" /> Add from Gallery
                    </Button>
                  </div>
                  
                  {/* Selected supplements for this category */}
                  <div className="mt-4 space-y-2">
                    {selectedSupplements[category.id] && selectedSupplements[category.id].length > 0 ? (
                      <>
                        {selectedSupplements[category.id].map(supplement => (
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
                            <div className="flex flex-col items-end">
                              <Badge variant="outline" className="bg-researcher-muted mb-1">
                                {category.name.replace(" Packs", "")}
                              </Badge>
                              <span className="text-sm font-medium">₦{supplement.price.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center mt-4 pt-2 border-t">
                          <div>
                            <p className="text-sm font-medium">Total: <span className="font-bold">₦{totalPackPrice.toLocaleString()}</span></p>
                          </div>
                          
                          <Button 
                            onClick={() => onDispatchPack(category.id)}
                            className="bg-researcher-primary hover:bg-researcher-secondary"
                            disabled={!hasSupplements}
                          >
                            <Package className="mr-2 h-4 w-4" /> Dispatch
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No supplements selected for this pack
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
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
