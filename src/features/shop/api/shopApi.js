import apiClient from "../../../lib/apiClient";

export async function fetchCategories() {
  const { data } = await apiClient.get("/categories");
  return data.data.categories;
}

export async function fetchProducts({ categoryId, search } = {}) {
  const { data } = await apiClient.get("/products", { params: { categoryId, search } });
  return data.data.products;
}
