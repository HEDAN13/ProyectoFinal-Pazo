import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

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

export async function addMultipleProducts() {
  try {
    const products = await getProducts();
    if (products.length === 0) return 0;

    const productsCollection = collection(db, "items");
    const keep = [
      "title",
      "price",
      "category",
      "thumbnail",
      "stock",
      "description",
      "images",
    ];

    const docs = products.map((p) => {
      const filtered = {};
      keep.forEach((key) => {
        if (p[key] !== undefined) filtered[key] = p[key];
      });
      return filtered;
    });

    await Promise.all(
      docs.map(async (doc) => {
        await addDoc(productsCollection, doc);
      })
    );
    return docs.length;
  } catch (error) {
    console.log("Error adding products: ", error);
  }
}
