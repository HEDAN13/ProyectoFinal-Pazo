import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout/EmptyLayout";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NotFoundComponent from "./components/NotFoundComponent/NotFoundComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<ItemListContainer saludo="Bienvenidos a la Landing" />}
            />
          </Route>
          <Route element={<EmptyLayout />}>
            <Route path="*" element={<NotFoundComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
