import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

const SearchScraper = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch("https://web-scraper-1-jljf.onrender.com/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);

      if (data.length === 0) {
        toast.info("No results found");
      } else {
        toast.success(`Found ${data.length} results`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-primary glow-primary">
              SearchScraper
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://portfolio-teal-kappa-89.vercel.app/"
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Portfolio
              </a>
              <a
                href="https://github.com/SpySparsh?tab=repositories"
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                GitHub Profile
              </a>
              <a href="https://github.com/SpySparsh/Web-Scraper.git">
              <Button variant="default" size="sm" className="glow-primary cursor-pointer"  >
                View Source Code
              </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Demo Section */}
          <Card className="glass-strong border-border/50 p-8 space-y-6">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="glow-secondary cursor-pointer">
                Portfolio Project
              </Badge>
              <h1 className="text-5xl font-bold text-foreground">
                Live Search Scraper
              </h1>
              <p className="text-xl text-muted-foreground">
                Powered by Node.js & Puppeteer
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="e.g. 'Headless Browser Testing'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 glass border-border/50 text-foreground placeholder:text-muted-foreground cursor-text"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="glow-primary cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scraping...
                    </>
                  ) : (
                    "Scrape Results"
                  )}
                </Button>
              </div>
            </form>

            {loading && (
              <div className="text-center py-8 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">
                  Spinning up headless browser...
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-4 mt-8">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className="glass border-border/50 p-6 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-glow transition-colors cursor-pointer"
                      >
                        {result.title || "No title"}
                      </a>
                    </h3>
                    <p className="text-muted-foreground">
                      {result.snippet || "No snippet available"}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </Card>

          {/* Info Section */}
          <Card className="glass-strong border-border/50 p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">
              How This Works
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass border-border/50 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  🤖 What is Web Scraping?
                </h3>
                <p className="text-muted-foreground">
                  Web scraping is the automated process of extracting data from
                  websites. This project uses Puppeteer to launch a headless
                  browser, perform searches, and retrieve results programmatically.
                </p>
              </Card>

              <Card className="glass border-border/50 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-secondary">
                  ⚡ Technology Stack
                </h3>
                <p className="text-muted-foreground">
                  Built with Node.js and Puppeteer for browser automation. The
                  frontend uses vanilla JavaScript for a lightweight, fast
                  experience.
                </p>
              </Card>

              <Card className="glass border-border/50 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-accent">
                  🔒 Ethical Considerations
                </h3>
                <p className="text-muted-foreground">
                  Always respect robots.txt, implement rate limiting, and use
                  scraping responsibly. This is a demonstration project for
                  educational purposes.
                </p>
              </Card>

              <Card className="glass border-border/50 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-glow">
                  📊 Use Cases
                </h3>
                <p className="text-muted-foreground">
                  Price monitoring, data analysis, content aggregation, SEO
                  research, and competitive intelligence are common applications.
                </p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchScraper;
