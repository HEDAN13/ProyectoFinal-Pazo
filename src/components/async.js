import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { mostrarToastError } from "./notificaciones";

export async function getProducts() {
  try {
    const productsCollection = collection(db, "items");
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    mostrarToastError(error);
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
