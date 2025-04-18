import { Menubar } from "primereact/menubar";
import { Outlet } from "react-router";

const Layout = () => (
  <div className="h-full w-full flex flex-col p-5 gap-5">
    <Menubar
      model={[
        {
          label: "Home",
          icon: "pi pi-home",
          url: "/"
        },
        {
          label: "Products",
          url: "/products"
        },
        {
          label: "Customers",
          url: "/customers"
        },
        {
          label: "Invoices",
          url: "/invoices"
        }
      ]}
    />

    <Outlet />

    <div className="fixed bottom-0 left-0 w-full bg-gray-400 text-white text-center py-3 text-xs">
      <span>Invoice by Juliano Marques</span>
    </div>
  </div>
);

export default Layout;
