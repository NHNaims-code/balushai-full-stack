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
          {/* Category Menu */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-box-open"></i>Categories
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/category/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Categories
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/add-category"
              >
                <i className="far fa-angle-double-right"></i>Add Category
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Brands */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-star-sharp"></i>Brands
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/brand/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Brands
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/add-brand"
              >
                <i className="far fa-angle-double-right"></i>Add Brand
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Promotions */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-percent"></i>Promotions
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/campaign/list"
              >
                <i className="far fa-angle-double-right"></i>Campaigns
              </NavLink>
            </MenuItem>
          </SubMenu>


          {/* Banners */}
          <SubMenu
            title={
              <>
                <i className="fa-light fa-coins"></i>Banners
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/banner/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Banners
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/add-banner"
              >
                <i className="far fa-angle-double-right"></i>Add Banner
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Products */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-box-open"></i>Products
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/product/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Products
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Vouchers */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-box-open"></i>Vouchers
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/voucher/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Vouchers
              </NavLink>
            </MenuItem>
          </SubMenu>

           {/* Free Shipments */}
           <SubMenu
            title={
              <div>
                <i className="fa-light fa-box-open"></i>Free Shipments
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/free-shipping/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Free Shipments
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Orders & Reviews */}
          <SubMenu
            title={
              <div>
                <i className="fa-light fa-star-sharp"></i>Orders & Reviews
              </div>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/order/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Orders
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/review/list"
              >
                <i className="far fa-angle-double-right"></i>Manage reviews
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Vendors */}
          <SubMenu
            title={
              <>
                <i className="fa-light fa-file-user"></i>Vendors
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/vendor/list"
              >
                <i className="far fa-angle-double-right"></i>Manage Vendors
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* Email */}
          <SubMenu
            title={
              <>
                <i className="fa-light fa-file-user"></i>Email
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/email"
              >
                <i className="far fa-angle-double-right"></i>Send Email
              </NavLink>
            </MenuItem>
          </SubMenu>

          {/* SMS */}
          <SubMenu
            title={
              <>
                <i className="fa-light fa-file-user"></i>SMS
              </>
            }
          >
            <MenuItem>
              <NavLink
                className={({ isActive }) => (isActive ? "text-warning" : "")}
                to="/sms"
              >
                <i className="far fa-angle-double-right"></i>Send SMS
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
