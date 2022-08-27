import { Routes, Route, Navigate } from "react-router-dom";
import { AddProduct, EditProduct, ProductList } from "pages/product";
import {
  AccountStatements,
  OrderOverview,
  TransactionOverview,
} from "pages/finance";
import { PersonalProfile, ShopAccount } from "pages/account";
import { OrderDetails, OrderList } from "pages/order";
import {
  AddProductsCampaign,
  CampaignDetails,
  CampaignList,
  EditFreeShipping,
  EditVoucher,
  FreeShippingList,
  ManageProductsCampaign,
  VoucherList,
} from "pages/promotion";
import { HelpCenter } from "pages/helpCenter";
import { NotFound } from "pages/notFound";
import { Logout, SignIn, SignUp } from "pages/auth";
import { Dashboard } from "pages/dashboard";
export const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/sign-in" replace />}
      />
       <Route
        path="/product/list"
        element={user ? <ProductList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-product"
        element={user ? <AddProduct /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-product/:id"
        element={user ? <EditProduct /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/order/list"
        element={user ? <OrderList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/order/:id"
        element={user ? <OrderDetails /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/list"
        element={user ? <CampaignList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/:id/details"
        element={
          user ? <CampaignDetails /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/campaign/:id/add-product"
        element={
          user ? <AddProductsCampaign /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/campaign/products-edit"
        element={
          user ? <ManageProductsCampaign /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/voucher/list"
        element={user ? <VoucherList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-voucher/:id"
        element={user ? <EditVoucher /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/free-shipping/list"
        element={
          user ? <FreeShippingList /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/edit-free-shipping/:id"
        element={
          user ? <EditFreeShipping /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/finance/account-statements"
        element={
          user ? <AccountStatements /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/finance/order-overview"
        element={user ? <OrderOverview /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/finance/transaction-overview"
        element={
          user ? <TransactionOverview /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/help-center"
        element={user ? <HelpCenter /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/shop/profile"
        element={user ? <ShopAccount /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/account/profile"
        element={
          user ? <PersonalProfile /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/log-out"
        element={
          user ? <Logout /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
};