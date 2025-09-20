import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Copy, CheckCircle, XCircle, Clock, ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScanHistorySidebar } from '@/components/ScanHistorySidebar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generatePDFReport } from '@/utils/pdfGenerator';

interface ScanResult {
  subdomain: string;
  status: number;
  statusText: string;
}

interface ScanHistoryItem {
  id: string;
  domain: string;
  timestamp: Date;
  subdomainCount: number;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(searchParams.get('domain') || '');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    const initialDomain = searchParams.get('domain');
    if (initialDomain && initialDomain !== domain) {
      setDomain(initialDomain);
      handleScan(initialDomain);
    }
  }, [searchParams]);

  // Mock scanning function with realistic delays
  const handleScan = async (targetDomain?: string) => {
    const domainToScan = targetDomain || domain;
    if (!domainToScan.trim()) return;

    setIsScanning(true);
    setProgress(0);
    setResults([]);
    setScanComplete(false);

    // Simulate progressive scanning
    const mockResults: ScanResult[] = [
      { subdomain: `www.${domainToScan}`, status: 200, statusText: 'OK' },
      { subdomain: `api.${domainToScan}`, status: 200, statusText: 'OK' },
      { subdomain: `admin.${domainToScan}`, status: 403, statusText: 'Forbidden' },
      { subdomain: `blog.${domainToScan}`, status: 200, statusText: 'OK' },
      { subdomain: `mail.${domainToScan}`, status: 301, statusText: 'Moved Permanently' },
      { subdomain: `dev.${domainToScan}`, status: 404, statusText: 'Not Found' },
      { subdomain: `staging.${domainToScan}`, status: 401, statusText: 'Unauthorized' },
      { subdomain: `ftp.${domainToScan}`, status: 500, statusText: 'Internal Server Error' },
      { subdomain: `cdn.${domainToScan}`, status: 200, statusText: 'OK' },
      { subdomain: `shop.${domainToScan}`, status: 200, statusText: 'OK' },
    ];

    for (let i = 0; i < mockResults.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
      setProgress(((i + 1) / mockResults.length) * 100);
      setResults(prev => [...prev, mockResults[i]]);
    }

    setIsScanning(false);
    setScanComplete(true);
    
    // Add to scan history
    const newScan: ScanHistoryItem = {
      id: Date.now().toString(),
      domain: domainToScan,
      timestamp: new Date(),
      subdomainCount: mockResults.length
    };
    setScanHistory(prev => [newScan, ...prev.slice(0, 4)]); // Keep last 5 scans
    
    toast({
      title: "Scan Complete",
      description: `Found ${mockResults.length} subdomains for ${domainToScan}`,
    });
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-yellow-500';
    if (status >= 400 && status < 500) return 'text-orange-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status >= 300 && status < 400) return <Clock className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Subdomain copied to clipboard",
    });
  };

  const exportToCSV = () => {
    const headers = ['Subdomain', 'Status Code', 'Status Text'];
    const csvContent = [
      headers.join(','),
      ...results.map(result => [result.subdomain, result.status, result.statusText].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain}-subdomains.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Results exported to CSV file",
    });
  };

  const downloadPDFReport = () => {
    generatePDFReport(domain, results);
    toast({
      title: "PDF Downloaded",
      description: "Professional scan report generated",
    });
  };

  const handleSelectScan = (selectedDomain: string) => {
    setDomain(selectedDomain);
    handleScan(selectedDomain);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="flex">
          <ScanHistorySidebar 
            scanHistory={scanHistory} 
            onSelectScan={handleSelectScan}
          />
          
          <div className="flex-1 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>

            <div className="glass rounded-xl p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">Subdomain Scanner</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Discover subdomains and check their HTTP status codes
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter domain (e.g., example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isScanning && handleScan()}
                    className="pl-10 h-12 text-base"
                    disabled={isScanning}
                  />
                </div>
                <Button 
                  size="lg" 
                  onClick={() => handleScan()}
                  className="h-12 px-8 gradient-primary border-0 text-white font-semibold"
                  disabled={!domain.trim() || isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </Button>
              </div>

              {isScanning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Scanning {domain}...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </motion.div>
              )}

              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                      Results ({results.length} subdomains found)
                    </h2>
                    {scanComplete && (
                      <div className="flex gap-2">
                        <Button
                          onClick={downloadPDFReport}
                          variant="default"
                          className="gap-2 gradient-primary border-0 text-white"
                        >
                          <FileText className="w-4 h-4" />
                          Download PDF Report
                        </Button>
                        <Button
                          onClick={exportToCSV}
                          variant="outline"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Export CSV
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.subdomain}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                      >
                        <Card className="glass p-6 hover:shadow-lg transition-all duration-300 group hover:scale-105">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(result.status)}
                              <Badge 
                                variant="outline" 
                                className={`${getStatusColor(result.status)} border-current`}
                              >
                                {result.status}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(result.subdomain)}
                              className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <code className="text-sm bg-accent/10 px-3 py-2 rounded-lg block break-all font-mono">
                              {result.subdomain}
                            </code>
                            <p className="text-sm text-muted-foreground">
                              {result.statusText}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {!isScanning && results.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Ready to scan</h3>
                  <p className="text-muted-foreground">
                    Enter a domain name above to start discovering subdomains
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}