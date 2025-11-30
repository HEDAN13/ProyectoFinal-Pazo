export async function getProducts() {
  try {
    const response = await fetch("/data.json");
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductById(id) {
  const products = await getProducts();
  const product = products.find((prod) => prod.id == id);
  return product;
}

export async function getCategories() {
  const response = await getProducts();
  const categorias = response.map((item) => item.category);
  const categories = [...new Set(categorias)];
  return categories;
}
