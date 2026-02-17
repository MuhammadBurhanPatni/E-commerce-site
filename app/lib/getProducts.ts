import { client } from "../sanity/client";

// Fetch all products
export async function getProducts() {
  const query = `*[_type == "product"]{
    _id, name, price, description, images, slug
  }`;
  return await client.fetch(query);
}

// Fetch single product by slug
export async function getProduct(slug: string) {
  if (!slug) return null;

  const query = `*[_type=="product" && slug.current==$slug][0]{
    _id, name, price, description, images, slug
  }`;

  return await client.fetch(query, { slug });
}
