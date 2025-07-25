import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import PageLayout from "./components/PageLayout";
import AddMeasurementPage from "./components/pages/AddMeasurementPage";
import AddUserPage from "./components/pages/AddUserPage";
import EditMeasurementPage from "./components/pages/EditMeasurementPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import UserDetailsPage from "./components/pages/UserDetailsPage";
import UsersPage from "./components/pages/UsersPage";
import ToastWrapper from "./components/ToastWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastWrapper>
          <Routes>
            <Route
              path="/"
              index
              element={
                <PageLayout>
                  <UsersPage />
                </PageLayout>
              }
            />
            <Route
              path="/users/:id"
              element={
                <PageLayout>
                  <UserDetailsPage />
                </PageLayout>
              }
            />
            <Route
              path="/users/add"
              element={
                <PageLayout>
                  <AddUserPage />
                </PageLayout>
              }
            />
            <Route
              path="/measurements/add"
              element={
                <PageLayout>
                  <AddMeasurementPage />
                </PageLayout>
              }
            />
            <Route
              path="/measurements/:id/edit"
              element={
                <PageLayout>
                  <EditMeasurementPage />
                </PageLayout>
              }
            />
            <Route
              path="*"
              element={
                <PageLayout className="min-h-screen flex flex-col items-center justify-center">
                  <NotFoundPage />
                </PageLayout>
              }
            />
          </Routes>
        </ToastWrapper>
        <ToastContainer position="top-right" autoClose={1500} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
