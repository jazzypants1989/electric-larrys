export function categoryFilter(products) {
  const categories = products.map((product) => product.category.toLowerCase());
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
}

export function tagFilter(products) {
  const tags = products.map((product) => product.tags.split(","));
  const flattenedTags = [...new Set(tags.flat())];
  const uniqueTags = flattenedTags.filter((tag) => tag !== "");
  return uniqueTags;
}

export function FilterByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

export function FilterByTags(products, tags) {
  return products.filter((product) => product.tags.includes(tags));
}

export function SortByPrice(products, sort) {
  return products.sort((a, b) => {
    if (sort === "lowest") {
      return a.price > b.price ? 1 : -1;
    } else {
      return a.price < b.price ? 1 : -1;
    }
  });
}
