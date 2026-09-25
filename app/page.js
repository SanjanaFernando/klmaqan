import { getProjects, getServices, getTestimonials } from "@/lib/wp";
import HomeClient from "@/components/HomeClient";

export default async function HomePage() {
  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <HomeClient
      projects={projects}
      services={services}
      testimonials={testimonials}
    />
  );
}
