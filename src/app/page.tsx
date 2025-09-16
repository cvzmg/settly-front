import { promises as fs } from "fs";
import path from "path";
import { MapLoader, NavBar, ContentCard, MunicipalityReport } from "@/lib/components"; // Import your new component

// page.tsx remains a Server Component and can still be async
export default async function Home() {
  // Server-side data fetching remains here
  const geoJsonPath = path.join(process.cwd(), "public/geoJsonData", "limite-de-las-alcaldas.json");
  const geoJsonFile = await fs.readFile(geoJsonPath, "utf-8");
  const geoJsonData = JSON.parse(geoJsonFile);
  
  return (
    <main className="relative h-screen">
      <div className="absolute inset-0 z-0">
        {/* Render the MapLoader and pass the data down as a prop */}
        <MapLoader geoJsonData={geoJsonData} />
      </div>
      
      {/* Content Container */}
      <div className="absolute inset-0 z-1 h-screen w-screen pointer-events-none">
        <NavBar />
        <div className="h-[93%] w-full ">
        <ContentCard>
            <MunicipalityReport />
        </ContentCard>
        </div>
      </div>
    </main>
  );
}
