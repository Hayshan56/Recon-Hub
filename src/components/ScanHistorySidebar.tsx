import { motion } from 'framer-motion';
import { Clock, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ScanHistoryItem {
  id: string;
  domain: string;
  timestamp: Date;
  subdomainCount: number;
}

interface ScanHistorySidebarProps {
  scanHistory: ScanHistoryItem[];
  onSelectScan: (domain: string) => void;
}

export const ScanHistorySidebar = ({ scanHistory, onSelectScan }: ScanHistorySidebarProps) => {
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-80 border-r border-border/50 bg-card/30 backdrop-blur-sm p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold">Scan History</h2>
      </div>

      <div className="space-y-3">
        {scanHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground">No scans yet</p>
        ) : (
          scanHistory.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="p-4 cursor-pointer hover:bg-accent/5 transition-colors group"
                onClick={() => onSelectScan(scan.domain)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{scan.domain}</p>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {scan.subdomainCount} subdomains found
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(scan.timestamp)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};