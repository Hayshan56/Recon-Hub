import { motion } from 'framer-motion';
import { Search, Download, Shield, Clock, Globe, Users } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Advanced Subdomain Discovery",
    description: "Leverage multiple data sources including SecurityTrails and AlienVault OTX for comprehensive subdomain enumeration.",
    delay: 0.1
  },
  {
    icon: Clock,
    title: "Real-time Status Checking",
    description: "Instantly check HTTP status codes for discovered subdomains to identify active endpoints.",
    delay: 0.2
  },
  {
    icon: Download,
    title: "Export to CSV",
    description: "Download your reconnaissance results in CSV format for further analysis and reporting.",
    delay: 0.3
  },
  {
    icon: Shield,
    title: "Open Source Security",
    description: "Fully transparent codebase hosted on GitHub. Audit the code and contribute to improvements.",
    delay: 0.4
  },
  {
    icon: Globe,
    title: "No Installation Required",
    description: "Web-based platform accessible from anywhere. No need to install tools or manage dependencies.",
    delay: 0.5
  },
  {
    icon: Users,
    title: "Built for the Community",
    description: "Designed by a cybersecurity enthusiast for fellow bug bounty hunters and security researchers.",
    delay: 0.6
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why use <span className="gradient-text">ReconHub?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for subdomain reconnaissance in one powerful, free platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 hover:border-accent/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-medium">Trusted by security researchers worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};