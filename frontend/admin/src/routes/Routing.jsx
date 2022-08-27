import { Routes, Route, Navigate } from "react-router-dom";
import {
  AccountStatements,
  OrderOverview,
  TransactionOverview,
} from "pages/finance";
import { OrderDetails, OrderList } from "pages/order";
import { ProductDetails, ProductList } from 'pages/product'
import {
  CampaignList,
  EditVoucher,
  FreeShippingList,
  VoucherList,
} from "pages/promotion";
import { NotFound } from "pages/notFound";
import { Logout, SignIn } from "pages/auth";
import { Dashboard } from "pages/dashboard";
import { AddBrand, BrandList } from "pages/brand";
import { AddBanner, BannerList, EditBanner } from "pages/banner";
import { VendorDetails, VendorList } from "pages/vendor";
import { AddCategory, CategoryList, EditCategory } from "pages/category";
import EditCampaign from "pages/promotion/campaign/EditCampaign";
import CampaignDetails from "pages/promotion/campaign/CampaignDetails";
import Email from "pages/email/Email";
import SMS from "pages/sms/Sms";
export const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/category/list"
        element={user ? <CategoryList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-category"
        element={user ? <AddCategory /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-category/:id"
        element={user ? <EditCategory /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/brand/list"
        element={user ? <BrandList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-brand"
        element={user ? <AddBrand /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/banner/list"
        element={user ? <BannerList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/add-banner"
        element={user ? <AddBanner /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/edit-banner/:id"
        element={user ? <EditBanner /> : <Navigate to="/sign-in" replace />}
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
        path="/product/list"
        element={user ? <ProductList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/product/:id"
        element={user ? <ProductDetails /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/list"
        element={user ? <CampaignList /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/campaign/:id"
        element={
          user ? <CampaignDetails /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/edit-campaign/:id"
        element={
          user ? <EditCampaign /> : <Navigate to="/sign-in" replace />
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
        element={user ? <FreeShippingList /> : <Navigate to="/sign-in" replace />}
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
        path="/vendor/list"
        element={user ? <VendorList /> : <Navigate to="/sign-in" replace />}
      />

      <Route
        path="/vendor/:id"
        element={user ? <VendorDetails /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/log-out"
        element={
          user ? <Logout /> : <Navigate to="/sign-in" replace />
        }
      />
      <Route
        path="/email"
        element={user ? <Email /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/sms"
        element={user ? <SMS /> : <Navigate to="/sign-in" replace />}
      />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
};