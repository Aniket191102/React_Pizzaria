import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLayout from './AdminLayout';
import ManageCategory from './pages/ManageCategory';
import AdminLogin from './pages/AdminLogin';
import ManageItem from './pages/ManageItem';
import ManageContact from './pages/ManageContact';
import ManageCustomer from './pages/ManageCustomer';
import ViewCartReport from './pages/ViewCartReport';
import ManageOrders from './pages/ManageOrders';
import ProtectedRoute from './components/ProtectedRoute';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route
      path="/admin/*"
      element={
        <AdminLayout>
          <Routes>
            {/* <Route path="" element={<><ProtectedRoute/><Dashboard /><ProtectedRoute/></>} /> */}
            <Route path="" element={<Dashboard />} />
            <Route path="category" element={<ManageCategory/>} />
            <Route path="item" element={<ManageItem/>} />
            <Route path="contact" element={<ManageContact/>} />
            <Route path="customer" element={<ManageCustomer/>} />
            <Route path="cart" element={<ViewCartReport/>} />
            <Route path="orders" element={<ManageOrders/>} />
          </Routes>
        </AdminLayout>
      }
    />
  </Routes>
    
  );
}

export default AdminRoutes;
