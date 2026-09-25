import { getProjectBySlug, getProjects } from "@/lib/wp";
import SingleProjectClient from "./SingleProjectClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Property Not Found | KL MAQAN",
    };
  }

  const title = project.title?.rendered?.replace(/&#8217;/g, "'") || "Dubai Luxury Project";
  const address = project.acf?.property_address || "Dubai";
  const price = project.acf?.property_price || "";

  return {
    title: `${title} | ${price} - KL MAQAN Dubai`,
    description: `Explore ${title} located in ${address}. View floor plans, pricing, payment plans, and developer details.`,
    openGraph: {
      title: `${title} | KL MAQAN Luxury Real Estate`,
      description: `Luxury property in Dubai: ${title}. Starting from ${price}.`,
      images: [
        {
          url: project.featured_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        }
      ],
    }
  };
}

export default async function SingleProjectPage({ params }) {
  const resolvedParams = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(resolvedParams.slug),
    getProjects()
  ]);

  if (!project) {
    notFound();
  }

  // Related projects (filter out current project)
  const relatedProjects = allProjects.filter((p) => p.slug !== resolvedParams.slug);

  return (
    <SingleProjectClient
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
