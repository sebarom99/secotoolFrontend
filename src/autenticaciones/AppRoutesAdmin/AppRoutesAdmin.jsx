import AdminHeader from "../../components/header/adminHeader/AdminHeader";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeAdmin from "../../components/routes/homeAdmin/HomeAdmin";
import NewProduct from "../../components/routes/newProduct/NewProduct";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import Features from "../../components/routes/features/Features";
import Categories from "../../components/routes/categories/Categories";
import UsersAdmin from "../../components/routes/usersAdmin/UsersAdmin";
import Politicas from "../../components/routes/politicProduct/PoliticsProduct"

const AppRoutesAdmin = () => {
  const { user } = useAuth();

  return (
    <body>
        <AdminHeader />
      <main className="spacing-grid">
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {/* Rutas Admin */}
          {user.userRole === "ADMIN" && (
            <>
            <Route path="/home" element={<HomeAdmin />} />
             <Route path="/newproduct" element={<NewProduct />} />
             <Route path="/categories" element={<Categories />}></Route>
             <Route path="/features" element={<Features />}></Route>
             <Route path="/users" element={<UsersAdmin />}></Route>
             <Route path="/politicas" element={<Politicas />}></Route>
            </>
          )}
        </Routes>
      </main>
      <Footer className="footer" />
    </body>
  );
};

export default AppRoutesAdmin;

