const WP_GRAPHQL_URL =
  process.env.WP_GRAPHQL_URL || "https://klmaqan.w3icon.com/graphql";
const WP_API_USERNAME = process.env.WP_API_USERNAME;
const WP_API_PASSWORD = process.env.WP_API_PASSWORD;

const WP_AUTHORIZATION =
  WP_API_USERNAME && WP_API_PASSWORD
    ? `Basic ${Buffer.from(`${WP_API_USERNAME}:${WP_API_PASSWORD}`).toString("base64")}`
    : null;

/**
 * Execute a WPGraphQL query
 */
export async function fetchGraphQL(query, { variables } = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(WP_AUTHORIZATION ? { Authorization: WP_AUTHORIZATION } : {}),
  };

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[WPGraphQL Error]: HTTP ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error("[WPGraphQL Errors]:", JSON.stringify(json.errors, null, 2));
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("[WPGraphQL Fetch Exception]:", error.message);
    return null;
  }
}

/**
 * Normalize package node to support both direct GraphQL properties
 * and backwards-compatible fields used in UI components.
 */
function normalizePackageNode(node) {
  if (!node) return null;
  const acf = node.packages || {};

  return {
    id: node.id,
    slug: node.slug,
    title: {
      rendered: node.title || "",
    },
    content: {
      rendered: node.content || "",
    },
    rawTitle: node.title || "",
    acf: {
      package_price: acf.packagePrice || "",
      package_tagline: acf.packageTagline || "",
      package_duration: acf.packageDuration || "",
      package_features: acf.packageFeatures || "",
      is_featured: Boolean(acf.isFeatured),
      packagePrice: acf.packagePrice || "",
      packageTagline: acf.packageTagline || "",
      packageDuration: acf.packageDuration || "",
      packageFeatures: acf.packageFeatures || "",
      isFeatured: Boolean(acf.isFeatured),
    },
  };
}

/**
 * Fetch all packages via WPGraphQL
 */
export async function getPackages() {
  const query = `
    query GetAllPackages {
      packages(first: 100) {
        nodes {
          id
          title
          slug
          content
          packages {
            packagePrice
            packageTagline
            packageDuration
            packageFeatures
            isFeatured
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  const nodes = data?.packages?.nodes || [];
  return nodes.map(normalizePackageNode).filter(Boolean);
}

/**
 * Fetch a single package by slug via WPGraphQL
 */
export async function getPackageBySlug(slug) {
  if (!slug) return null;

  const query = `
    query GetPackageBySlug($slug: ID!) {
      package(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        packages {
          packagePrice
          packageTagline
          packageDuration
          packageFeatures
          isFeatured
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { variables: { slug } });
  return normalizePackageNode(data?.package);
}

/**
 * Normalize project node from GraphQL for UI components
 */
function normalizeProjectNode(node) {
  if (!node) return null;
  const acf = node.projectSingle || {};
  const featuredImageUrl = node.featuredImage?.node?.sourceUrl || null;
  const featuredImageAlt = node.featuredImage?.node?.altText || "";

  return {
    id: node.id,
    slug: node.slug,
    title: {
      rendered: node.title || "",
    },
    content: {
      rendered: node.content || "",
    },
    rawTitle: node.title || "",
    featured_image: featuredImageUrl,
    featured_image_medium: featuredImageUrl,
    featured_image_alt: featuredImageAlt,
    featuredImage: node.featuredImage,
    acf: {
      property_address: acf.propertyAddress || "",
      property_price: acf.propertyPrice || "",
      bedrooms: acf.bedrooms || "",
      bathrooms: acf.bathrooms || "",
      area_from: acf.areaFrom || "",
      handover: acf.handover || "",
      payment_plan: acf.paymentPlan || "",
      // camelCase aliases
      propertyAddress: acf.propertyAddress || "",
      propertyPrice: acf.propertyPrice || "",
      areaFrom: acf.areaFrom || "",
      paymentPlan: acf.paymentPlan || "",
    },
    projectSingle: acf,
    project_taxonomies: {},
  };
}

/**
 * Fetch all projects via WPGraphQL
 */
export async function getProjects() {
  const query = `
    query GetAllProjects {
      projects(first: 100) {
        nodes {
          id
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          projectSingle {
            propertyAddress
            propertyPrice
            bedrooms
            bathrooms
            areaFrom
            handover
            paymentPlan
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  const nodes = data?.projects?.nodes || [];
  return nodes.map(normalizeProjectNode).filter(Boolean);
}

/**
 * Fetch a single project by slug via WPGraphQL
 */
export async function getProjectBySlug(slug) {
  if (!slug) return null;

  const query = `
    query GetProjectBySlug($slug: ID!) {
      project(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projectSingle {
          propertyAddress
          propertyPrice
          bedrooms
          bathrooms
          areaFrom
          handover
          paymentPlan
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { variables: { slug } });
  return normalizeProjectNode(data?.project);
}

/**
 * Normalize loan node from GraphQL for UI components
 */
function normalizeLoanNode(node) {
  if (!node) return null;
  const acf = node.loanDetails || {};
  const featuredImageUrl = node.featuredImage?.node?.sourceUrl || null;
  const featuredImageAlt = node.featuredImage?.node?.altText || "";

  return {
    id: node.id,
    slug: node.slug,
    title: {
      rendered: node.title || "",
    },
    content: {
      rendered: node.content || "",
    },
    rawTitle: node.title || "",
    featured_image: featuredImageUrl,
    featured_image_alt: featuredImageAlt,
    featuredImage: node.featuredImage,
    acf: {
      interest_rate: acf.interestRate || "",
      max_tenure: acf.maxTenure || "",
      min_down_payment: acf.minDownPayment || "",
      max_loan_amount: acf.maxLoanAmount || "",
      // camelCase aliases
      interestRate: acf.interestRate || "",
      maxTenure: acf.maxTenure || "",
      minDownPayment: acf.minDownPayment || "",
      maxLoanAmount: acf.maxLoanAmount || "",
    },
    loanDetails: acf,
  };
}

/**
 * Fetch all loans via WPGraphQL
 */
export async function getLoans() {
  const query = `
    query GetAllLoans {
      loans(first: 100) {
        nodes {
          id
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          loanDetails {
            interestRate
            maxTenure
            minDownPayment
            maxLoanAmount
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  const nodes = data?.loans?.nodes || [];
  return nodes.map(normalizeLoanNode).filter(Boolean);
}

/**
 * Fetch a single loan by slug via WPGraphQL
 */
export async function getLoanBySlug(slug) {
  if (!slug) return null;

  const query = `
    query GetLoanBySlug($slug: ID!) {
      loan(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        loanDetails {
          interestRate
          maxTenure
          minDownPayment
          maxLoanAmount
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { variables: { slug } });
  return normalizeLoanNode(data?.loan);
}
