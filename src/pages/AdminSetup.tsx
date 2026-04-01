import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const AdminSetup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Setup</h1>
          <p className="text-muted-foreground text-sm mt-1">Admin account already configured</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="font-display text-xl">Setup Complete</CardTitle>
            <CardDescription>Use the default admin credentials to login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-mono">Username: admin</p>
              <p className="text-sm font-mono">Password: admin123</p>
            </div>
            <Button onClick={() => navigate('/admin/login')} className="w-full" size="lg">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminSetup;
