import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Wheat, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(username, password);
    if (error) {
      toast({ title: "Access denied", description: error.message, variant: "destructive" });
      setIsLoading(false);
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Wheat className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-gray-900 text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Abdul Gani Hazi Gulam Mohd</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-semibold py-3 rounded-xl transition-all text-sm mt-1">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>
        <p className="text-center mt-5">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">← Back to Website</a>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
