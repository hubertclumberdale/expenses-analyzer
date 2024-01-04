"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/sb-admin-2.css";
import { Container } from "react-bootstrap";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import ScrollToTop from "@/components/layout/scroll-to-top";
import Header from "@/components/layout/header";
import { HouseholdsProvider } from "@/contexts/households";
import { ExpensesProvider } from "@/contexts/expenses";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ParticipantsProvider } from "@/contexts/participants";
import { IncomesProvider } from "@/contexts/incomes";
import { BillsProvider } from "@/contexts/bills";
import { TransactionsProvider } from "@/contexts/transactions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="page-top">
        <div id="wrapper">
          <Sidebar></Sidebar>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header></Header>

              <HouseholdsProvider>
                <ParticipantsProvider>
                  <TransactionsProvider>
                    <IncomesProvider>
                      <ExpensesProvider>
                        <BillsProvider>
                          <Container fluid>{children}</Container>
                        </BillsProvider>
                      </ExpensesProvider>
                    </IncomesProvider>
                  </TransactionsProvider>
                </ParticipantsProvider>
              </HouseholdsProvider>
            </div>
            <Footer></Footer>
          </div>
        </div>

        <ScrollToTop></ScrollToTop>
      </body>
    </html>
  );
}
