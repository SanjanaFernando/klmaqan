import { getProjects, getTaxonomyTerms } from "@/lib/wp";
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Explore Dubai Real Estate Projects | KL MAQAN",
  description: "Browse Dubai luxury off-plan and ready properties from Emaar, Damac, Nakheel, Meraas, and more. Filter by developer, location, property type, price, and bedrooms.",
};

export default async function ProjectsPage() {
  const [
    projects,
    developers,
    locations,
    types,
    statuses,
    priceRanges,
    bedsList
  ] = await Promise.all([
    getProjects(),
    getTaxonomyTerms("property-developer"),
    getTaxonomyTerms("location"),
    getTaxonomyTerms("property-type"),
    getTaxonomyTerms("property-status"),
    getTaxonomyTerms("price-range"),
    getTaxonomyTerms("beds")
  ]);

  return (
    <ProjectsClient
      initialProjects={projects}
      developers={developers}
      locations={locations}
      types={types}
      statuses={statuses}
      priceRanges={priceRanges}
      bedsList={bedsList}
    />
  );
}
