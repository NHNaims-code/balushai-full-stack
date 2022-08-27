import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "assets/css/sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ user }) {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation();
  if (user && pathname !== "/sign-in" && pathname !== "/sign-up") {
    return (
      <ProSidebar collapsed={collapsed}>
        <IconButton color="info" onClick={() => setCollapsed(!collapsed)}>
          <MenuIcon />
        </IconButton>
        <Menu iconShape="square">
          {/* Product Menu */}
          <SubMenu
            title={
              <div>
                <i class="fa-light fa-box-open"></i>Products
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/product/list"
              >
                <i class="far fa-angle-double-right"></i>Manage products
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/add-product"
              >
                <i class="far fa-angle-double-right"></i>Add product
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Orders & Reviews */}
          <SubMenu
            title={
              <div>
                <i class="fa-light fa-star-sharp"></i>Orders & Reviews
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/order/list"
              >
                <i class="far fa-angle-double-right"></i>Manage Orders
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/review/list"
              >
                <i class="far fa-angle-double-right"></i>Manage reviews
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Promotions */}
          <SubMenu
            title={
              <div>
                <i class="fa-light fa-percent"></i>Promotions
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/campaign/list"
              >
                <i class="far fa-angle-double-right"></i>Campaign
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/voucher/list"
              >
                <i class="far fa-angle-double-right"></i>Seller Voucher
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/free-shipping/list"
              >
                <i class="far fa-angle-double-right"></i>Free Shipping
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Business Advisor 
          <MenuItem><NavLink className={({ isActive }) => isActive ? 'text-warning' : ''} to="/#"><i class="fa-light fa-briefcase"></i>Business Advisor</NavLink></MenuItem> */}

          {/* Finance */}
          <SubMenu
            title={
              <>
                <i class="fa-light fa-coins"></i>Finance
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/finance/account-statements"
              >
                <i class="far fa-angle-double-right"></i>Account Statements
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/finance/order-overview"
              >
                <i class="far fa-angle-double-right"></i>Order Overview
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/finance/transaction-overview"
              >
                <i class="far fa-angle-double-right"></i>Transaction Overview
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Seller Support */}
          <SubMenu
            title={
              <>
                <i class="fa-light fa-message-question"></i>Seller Support
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/help-center"
              >
                <i class="far fa-angle-double-right"></i>Help Center
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Account & Settings */}
          <SubMenu
            title={
              <>
                <i class="fa-light fa-file-user"></i>Account & Settings
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/shop/profile"
              >
                <i class="far fa-angle-double-right"></i>Profile
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/account/profile"
              >
                <i class="far fa-angle-double-right"></i>Account
              </NavLink>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    );
  } else {
    return null;
  }
}

export default Sidebar;
