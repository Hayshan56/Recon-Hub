import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import dashboardMockup from '@/assets/dashboard-mockup.png';

export const HeroSection = () => {
  const [domain, setDomain] = useState('');
  const navigate = useNavigate();

  const handleScan = () => {
    if (domain.trim()) {
      navigate(`/dashboard?domain=${encodeURIComponent(domain.trim())}`);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Open-Source • Free Forever</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <span className="gradient-text">ReconHub</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
              Open-Source Recon for Everyone
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Discover subdomains and check their status with our powerful reconnaissance platform. 
            Built for bug bounty hunters and cybersecurity students.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                className="pl-10 h-12 text-base border-border/50 bg-card/50 backdrop-blur-sm"
              />
            </div>
            <Button 
              size="lg" 
              onClick={handleScan}
              className="h-12 px-8 gradient-primary border-0 text-white font-semibold group"
              disabled={!domain.trim()}
            >
              Scan Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="glass rounded-lg p-6 text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Get subdomain results in seconds with our optimized scanning engine</p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">Open-source and free forever. No limits, no hidden costs</p>
            </div>
            <div className="glass rounded-lg p-6 text-center">
              <Globe className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Comprehensive</h3>
              <p className="text-sm text-muted-foreground">Multiple data sources for the most complete subdomain discovery</p>
            </div>
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div className="glass rounded-xl p-4 border border-border/50">
              <img 
                src={dashboardMockup} 
                alt="ReconHub Dashboard" 
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent animate-pulse-glow"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};