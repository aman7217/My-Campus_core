import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // todo: remove mock functionality
    // Mock authentication - replace with actual auth logic later
    if (username === "admin" && password === "@123admin") {
      localStorage.setItem("userType", "admin");
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to Admin Panel",
      });
      setLocation("/admin");
    } else if (username === "student" && password === "@123student") {
      localStorage.setItem("userType", "student");
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to Student Portal",
      });
      setLocation("/");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edu-primary via-edu-accent to-edu-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-edu-primary to-edu-secondary flex items-center justify-center">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Smart Campus Portal</CardTitle>
          <CardDescription>
            Government Polytechnic Srinagar Garhwal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p className="mt-1">Student: student / @123student</p>
            <p>Admin: admin / @123admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
