"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/sb-admin-2.css";
import { Container } from "react-bootstrap";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";
import Header from "@/components/layout/header";
import { ExpensesProvider } from "@/contexts/expenses-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="page-top">
        <ExpensesProvider>
          <div id="wrapper">
            <Sidebar></Sidebar>

            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Header></Header>
                <Container fluid>{children}</Container>
              </div>
              <Footer></Footer>
            </div>
          </div>

          <ScrollToTop></ScrollToTop>
        </ExpensesProvider>
      </body>
    </html>
  );
}
