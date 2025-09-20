import { motion } from 'framer-motion';
import { Github, Linkedin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <motion.footer 
      className="border-t border-border/20 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold">R</span>
              </div>
              <span className="text-xl font-bold gradient-text">ReconHub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Free, open-source reconnaissance platform for bug bounty hunters and cybersecurity enthusiasts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start p-0 h-auto font-normal" asChild>
                <a href="/">Home</a>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto font-normal" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
              <Button variant="ghost" className="justify-start p-0 h-auto font-normal" asChild>
                <a href="/about">About</a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.linkedin.com/in/hayshan-kannan-ab00b0354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by a passionate cybersecurity enthusiast
          </p>
        </div>
      </div>
    </motion.footer>
  );
};