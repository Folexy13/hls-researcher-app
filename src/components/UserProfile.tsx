
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { BENEFEK_CODE, dummyUser } from "@/lib/dummyData";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function UserProfile() {
  const [benefekCode, setBenefekCode] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const { toast } = useToast();

  const handleVerifyCode = () => {
    setIsVerifying(true);
    
    // Simulate API call with delay to show loader
    setTimeout(() => {
      if (benefekCode === BENEFEK_CODE) {
        setUserDetails(dummyUser);
        toast({
          title: "Code verified",
          description: "User details retrieved successfully.",
        });
      } else {
        setUserDetails(null);
        toast({
          title: "Invalid code",
          description: "The benefek code you entered is invalid.",
          variant: "destructive",
        });
      }
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in space-y-6 p-2 sm:p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-researcher-primary">User Profile</h2>
        <p className="text-muted-foreground">Enter your benefek code to view your details</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Benefek Code Verification</CardTitle>
            <CardDescription>
              Please enter your benefek code to access your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="benefek-code">Benefek Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="benefek-code"
                    value={benefekCode}
                    onChange={(e) => setBenefekCode(e.target.value)}
                    placeholder="Enter code (hint: RSRC123)"
                    disabled={isVerifying}
                  />
                  <Button 
                    onClick={handleVerifyCode} 
                    disabled={isVerifying || !benefekCode}
                    className="bg-researcher-primary hover:bg-researcher-secondary"
                  >
                    {isVerifying ? "Verifying..." : "Verify"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isVerifying ? (
          <Card className="mt-6 animate-fade-in">
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <div>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : userDetails && (
          <Card className="mt-6 animate-fade-in">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 rounded-full bg-researcher-primary flex items-center justify-center">
                  <User className="text-white h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{userDetails.name}</CardTitle>
                  <CardDescription>{userDetails.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Sex</Label>
                  <p className="font-medium">{userDetails.sex}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Family</Label>
                  <p className="font-medium">{userDetails.family || "Not specified"}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Benefek Code</Label>
                  <p className="font-medium">{userDetails.benefekCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
