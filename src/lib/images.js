/**
 * Unsplash placeholders, used only when a product has no uploaded image yet.
 * Curated per category so a chicken product never shows a mutton photo.
 * Replace by uploading real photos in the admin - these disappear automatically.
 */
const UNSPLASH = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const BY_CATEGORY = {
  chicken: [
    "1604503468506-a8da13d82791", // raw chicken pieces
    "1587593810167-a84920ea0781", // chicken breast
    "1610057099431-d73a1c9d2f2f", // chicken on board
  ],
  mutton: [
    "1603360946369-dc9bb6258143", // raw red meat cubes
    "1607623814075-e51df1bdc82f", // lamb chops
    "1544025162-d76694265947", // grilled meat
  ],
  "special-items": [
    "1555939594-58d7cb561ad1", // prepared dish
    "1529692236671-f1f6cf9683ba", // kebabs
    "1600891964092-4316c288032e", // platter
  ],
};

const FALLBACK = "1607623814075-e51df1bdc82f";

/** Deterministic per product id, so the same product keeps the same photo. */
export function productImage(product, width = 800) {
  if (product?.imageUrl) return product.imageUrl;

  const slug = product?.category?.slug || "";
  const pool = BY_CATEGORY[slug] || [FALLBACK];
  const index = (product?.id || 0) % pool.length;
  return UNSPLASH(pool[index], width);
}

export function categoryImage(categorySlug, width = 800) {
  const pool = BY_CATEGORY[categorySlug] || [FALLBACK];
  return UNSPLASH(pool[0], width);
}

/** Butcher-shop hero shot for the homepage banner. */
export const HERO_IMAGE = UNSPLASH("1607623814075-e51df1bdc82f", 1920);
export const STORY_IMAGE = UNSPLASH("1544025162-d76694265947", 1200);
