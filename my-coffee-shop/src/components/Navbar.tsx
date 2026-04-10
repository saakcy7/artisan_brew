import { Coffee, ShoppingCart, Menu,User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const getIsLoggedIn= ()=>{
    try{
      return!! localStorage.getItem("authToken");
    }
    catch(err)
    {
      return false;
    }
  }

useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());

    const onStorage = (e: StorageEvent) => {
      if (e.key === "authToken") setIsLoggedIn(getIsLoggedIn());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handlelogout=()=>{
    localStorage.removeItem("authToken");
    window.dispatchEvent(new CustomEvent("auth:changed", { detail: { loggedIn: false } }));
    navigate("/");
    setIsLoggedIn(false);
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold text-foreground">Artisan Brew</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-accent transition-colors">Home</a>
            <a href="#products" className="text-foreground hover:text-accent transition-colors">Products</a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</a>
            {!isLoggedIn && (
              <a href="/auth" className="text-foreground hover:text-accent transition-colors">Login/Signup</a>
            )}
            {isLoggedIn && (
              <Button variant="ghost" data-testid="logout-btn" onClick={handlelogout}>
                Logout
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
  <Button variant="ghost" size="icon" className="relative">
    <ShoppingCart className="h-5 w-5" />
    <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
      0
    </span>
  </Button>
  {isLoggedIn && (
    <Button onClick={() => navigate("/profile")} variant="ghost" size="icon">
      <User className="h-5 w-5" />
    </Button>
  )}
  <Button variant="ghost" size="icon" className="md:hidden">
    <Menu className="h-5 w-5" />
  </Button>
</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
