import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PrimeReactProvider } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { BrowserRouter, Route, Routes } from "react-router";
import CustomerEdit from "./customer/customer-edit";
import CustomerList from "./customer/customer-list";
import Home from "./home";
import InvoiceEdit from "./invoice/invoice-edit";
import InvoiceList from "./invoice/invoice-list";
import Layout from "./layout";
import { ToastProvider } from "./toast-provider";

import "./app.css";
import ProductEdit from "./product/product-edit";
import ProductList from "./product/product-list";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache"
    },
    query: {
      fetchPolicy: "no-cache"
    },
    mutate: {
      fetchPolicy: "no-cache"
    }
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <PrimeReactProvider>
      <ConfirmDialog />
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/products" element={<ProductList />} />
              <Route path="/product" element={<ProductEdit />}>
                <Route path="/product/:id" element={<ProductEdit />} />
              </Route>
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customer" element={<CustomerEdit />}>
                <Route path="/customer/:id" element={<CustomerEdit />} />
              </Route>
              <Route path="/invoices" element={<InvoiceList />} />
              <Route path="/invoice" element={<InvoiceEdit />}>
                <Route path="/invoice/:id" element={<InvoiceEdit />} />
              </Route>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </PrimeReactProvider>
  </ApolloProvider>
);

export default App;
