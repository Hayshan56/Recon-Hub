import { motion } from 'framer-motion';
import { Github, Linkedin, Award, Target, BookOpen, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function About() {
  const stats = [
    { label: 'Labs Completed', value: '100+', icon: BookOpen },
    { label: 'Ranking in Malaysia', value: '#3', icon: Award },
    { label: 'Years in Cybersecurity', value: '2+', icon: Target },
    { label: 'Open Source Projects', value: '5+', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                About <span className="gradient-text">ReconHub</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Built by a passionate 14-year-old cybersecurity enthusiast for the global security community
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <motion.div
                className="glass rounded-xl p-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">The Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Hi! I'm Hayshan Kannan, a 14-year-old cybersecurity enthusiast from Malaysia. 
                    My journey into cybersecurity started with a simple curiosity about how things work under the hood.
                  </p>
                  <p>
                    After completing over 100 hands-on labs and reaching #3 ranking in Malaysia's cybersecurity community, 
                    I realized that many students and aspiring bug bounty hunters lack access to proper reconnaissance tools.
                  </p>
                  <p>
                    That's why I built ReconHub - a completely free, open-source platform that democratizes access 
                    to subdomain reconnaissance tools. No paywalls, no limits, just pure functionality for everyone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="glass rounded-xl p-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">The Mission</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    ReconHub exists to bridge the gap between expensive commercial tools and the needs of 
                    students, researchers, and ethical hackers who are just starting their journey.
                  </p>
                  <p>
                    Every feature is designed with simplicity and effectiveness in mind. The platform leverages 
                    powerful APIs like SecurityTrails and AlienVault OTX to provide comprehensive subdomain discovery 
                    without requiring complex installations.
                  </p>
                  <p>
                    By keeping everything open-source and transparent, we ensure that the cybersecurity community 
                    can learn, contribute, and improve the platform together.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-lg p-6 text-center">
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="glass rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                ReconHub is open-source and community-driven. Whether you're a developer, security researcher, 
                or just someone who believes in making cybersecurity tools accessible to everyone - there's a place for you here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gradient-primary border-0 text-white font-semibold gap-2"
                  asChild
                >
                  <a 
                    href="https://github.com/Hayshan56" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                    Contribute on GitHub
                  </a>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2"
                  asChild
                >
                  <a 
                    href="https://www.linkedin.com/in/hayshan-kannan-ab00b0354?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3">
                <Award className="w-5 h-5 text-accent" />
                <span className="font-medium">Proud to serve the global cybersecurity community</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}