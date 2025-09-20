import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Copy, CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ScanResult {
  subdomain: string;
  status: number;
  statusText: string;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(searchParams.get('domain') || '');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

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
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      Results ({results.length} subdomains found)
                    </h2>
                    {scanComplete && (
                      <Button
                        onClick={exportToCSV}
                        variant="outline"
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export CSV
                      </Button>
                    )}
                  </div>

                  <div className="glass rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left p-4 font-medium">Subdomain</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Status Text</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <motion.tr
                              key={result.subdomain}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="border-b border-border/30 hover:bg-card/50 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <code className="text-sm bg-accent/10 px-2 py-1 rounded">
                                    {result.subdomain}
                                  </code>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(result.status)}
                                  <Badge 
                                    variant="outline" 
                                    className={`${getStatusColor(result.status)} border-current`}
                                  >
                                    {result.status}
                                  </Badge>
                                </div>
                              </td>
                              <td className="p-4 text-muted-foreground">
                                {result.statusText}
                              </td>
                              <td className="p-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(result.subdomain)}
                                  className="gap-2"
                                >
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </Button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
      </main>

      <Footer />
    </div>
  );
}