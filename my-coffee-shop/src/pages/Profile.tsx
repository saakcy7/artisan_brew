import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, ShoppingBag, Settings, LogOut, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  photoUrl?: string; // current photo URL
  photoFile?: File; // local new photo before upload
  description?: string;
  membership?: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(user?.photoUrl || "");

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUser({ ...user, photoFile: file });

  const imageUrl = URL.createObjectURL(file);
  setPreview(imageUrl);
};

  const handleSave = async () => {
    if (!user) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please login first",
        variant: "destructive",
      });
      return;
    }

    try {
      const handleSave = async () => {
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("phoneNumber", user.phoneNumber);

  if (user.photoFile) {
    formData.append("photo", user.photoFile);
  }

  await fetch("http://localhost:5000/user/me", {
    method: "PUT",
    body: formData,
  });
};

     
      toast({
        title: "Profile Updated",
        description: "Your profile and photo were successfully updated.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error?.message || "Could not update profile. Please try again.",
        variant: "destructive",
      });
      console.error("Profile update error:", error);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      toast({
        title: "Session expired",
        description: "Please log in again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Coffee House</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
       
 <Avatar className="h-24 w-24">
  <AvatarImage
    src={preview || user?.photoUrl || ""}
    alt="Profile"
  />
  <AvatarFallback className="bg-primary text-white text-2xl">
    {user?.name
      ? user.name.split(" ").map((n) => n[0]).join("")
      : "U"}
  </AvatarFallback>
</Avatar>
  
              </div>

                     <input
  type="file"
  accept="image/*"
  onChange={handlePhotoChange}
  className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-primary file:text-white
             hover:file:bg-primary/80
             bg-background/50 mt-2"
/>

              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.description}</CardDescription>
              <Badge className="mx-auto mt-2" variant="secondary">
                {user.membership}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Order History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">User Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={user?.name || ""}
                      onChange={(e) => setUser({ ...user!, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <Mail className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={user?.email || ""}
                      onChange={(e) => setUser({ ...user!, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex">
                    <Phone className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={user?.phoneNumber || ""}
                      onChange={(e) => setUser({ ...user!, phoneNumber: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full md:w-auto">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

             {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Manage your delivery address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="flex">
                    <MapPin className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                    <Input id="address" placeholder="123 Coffee Street" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
                <Button variant="outline" className="w-full md:w-auto">
                  Update Address
                </Button>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest coffee purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Ethiopian Yirgacheffe</p>
                        <p className="text-sm text-muted-foreground">Order #12345 • Jan 15, 2025</p>
                      </div>
                    </div>
                    <Badge>Delivered</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Colombian Supremo</p>
                        <p className="text-sm text-muted-foreground">Order #12344 • Jan 10, 2025</p>
                      </div>
                    </div>
                    <Badge>Delivered</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Brazilian Santos</p>
                        <p className="text-sm text-muted-foreground">Order #12343 • Jan 5, 2025</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Processing</Badge>
                  </div>
                </div>
                <Button variant="link" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;