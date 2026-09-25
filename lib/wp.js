const WP_BASE_URL = "https://klmaqan.w3icon.com/wp-json";
const freshRequest = {
  cache: "no-store",
  headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
};

/**
 * Fetch all projects directly from WordPress REST API (CPT: 'projects')
 */
export async function getProjects(filters = {}) {
  try {
    const params = new URLSearchParams({
      _embed: "1",
      per_page: "100",
      _ts: Date.now().toString(),
    });

    if (filters.developer)
      params.append("property-developer", filters.developer);
    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("property-type", filters.type);
    if (filters.status) params.append("property-status", filters.status);
    if (filters.priceRange) params.append("price-range", filters.priceRange);
    if (filters.beds) params.append("beds", filters.beds);
    if (filters.search) params.append("search", filters.search);

    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/projects?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API projects error: HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch projects from WordPress API:", err.message);
    return [];
  }
}

/**
 * Fetch single project by slug directly from WordPress REST API
 */
export async function getProjectBySlug(slug) {
  try {
    const params = new URLSearchParams({
      slug,
      _embed: "1",
      _ts: Date.now().toString(),
    });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/projects?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API project slug error: HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    console.error(
      `Failed to fetch project with slug "${slug}" from WordPress API:`,
      err.message,
    );
    return null;
  }
}

/**
 * Fetch taxonomy terms directly from WordPress REST API
 * (e.g., 'property-developer', 'location', 'property-type', 'property-status', 'price-range', 'beds')
 */
export async function getTaxonomyTerms(taxonomy) {
  try {
    const params = new URLSearchParams({
      per_page: "100",
      _ts: Date.now().toString(),
    });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/${taxonomy}?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(
        `WordPress API taxonomy (${taxonomy}) error: HTTP ${res.status}`,
      );
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(
      `Failed to fetch terms for taxonomy "${taxonomy}":`,
      err.message,
    );
    return [];
  }
}

/**
 * Fetch all services directly from WordPress REST API (CPT: 'service')
 */
export async function getServices() {
  try {
    const params = new URLSearchParams({
      per_page: "100",
      _ts: Date.now().toString(),
    });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/service?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API service error: HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch services from WordPress API:", err.message);
    return [];
  }
}

/**
 * Fetch all testimonials directly from WordPress REST API (CPT: 'testimonals')
 */
export async function getTestimonials() {
  try {
    const params = new URLSearchParams({
      per_page: "100",
      _ts: Date.now().toString(),
    });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/testimonals?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API testimonials error: HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(
      "Failed to fetch testimonials from WordPress API:",
      err.message,
    );
    return [];
  }
}

/**
 * Fetch all packages directly from WordPress REST API (CPT: 'package')
 */
export async function getPackages() {
  try {
    const params = new URLSearchParams({
      per_page: "100",
      _ts: Date.now().toString(),
    });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/packages?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API packages error: HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[getPackages] fetched",
        data.length,
        "packages, first acf:",
        data[0]?.acf,
      );
    }
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch packages from WordPress API:", err.message);
    return [];
  }
}

/**
 * Fetch single package by slug directly from WordPress REST API
 */
export async function getPackageBySlug(slug) {
  try {
    const params = new URLSearchParams({ slug, _ts: Date.now().toString() });
    const res = await fetch(
      `${WP_BASE_URL}/wp/v2/packages?${params.toString()}`,
      freshRequest,
    );

    if (!res.ok) {
      console.error(`WordPress API package slug error: HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    console.error(
      `Failed to fetch package "${slug}" from WordPress API:`,
      err.message,
    );
    return null;
  }
}
