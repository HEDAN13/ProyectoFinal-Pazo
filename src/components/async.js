import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
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

export async function guardarCarrito(email, cartDetails, total) {
  try {
    const cartCollection = collection(db, "carts");
    const docRef = await addDoc(cartCollection, {
      email: email,
      items: cartDetails,
      total: parseFloat(total),
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    mostrarToastError("Error al guardar el carrito", error);
  }
}
