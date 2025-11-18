import SearchScraper from "@/components/SearchScraper";
import CursorGlow from "@/components/CursorGlow";
import spaceBackground from "@/assets/space-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${spaceBackground})` }}
    >
      <CursorGlow />
      <SearchScraper />
    </div>
  );
};

export default Index;
