import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
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

export async function getCartsByEmail(email) {
  try {
    if (!email) return [];
    const cartsColl = collection(db, "carts");
    const q = query(
      cartsColl,
      where("email", "==", email),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    const carts = snapshot.docs.map((doc) => {
      const data = doc.data();
      const items = data.items || [];
      const totalUnits = items.reduce(
        (acc, item) => acc + (Number(item.quantity) || 0),
        0
      );
      const createdAt =
        data.createdAt && typeof data.createdAt.toDate === "function"
          ? data.createdAt.toDate()
          : new Date(data.createdAt || Date.now());

      return {
        id: doc.id,
        email: data.email,
        items,
        total: Number(data.total).toFixed(2) || 0,
        totalUnits,
        createdAt,
      };
    });
    return carts;
  } catch (error) {
    mostrarToastError("Error al obtener los carritos", error);
    console.log(error);

    return [];
  }
}
