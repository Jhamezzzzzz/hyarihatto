import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
// import App from "./App.tsx";
const App = React.lazy(()=> import("./App.tsx"))
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";
import { FormDataProvider } from "./context/FormVoiceMemberContext.tsx";
import { FormHyarihattoProvider } from "./context/FormHyarihattoContext.tsx";
import { FormErrorsProvider } from "./context/FormErrorContext.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AlertProvider>
          <FormHyarihattoProvider>
            <FormDataProvider>
              <FormErrorsProvider>
                <AppWrapper>
                  <App />
                </AppWrapper>
              </FormErrorsProvider>
            </FormDataProvider>
          </FormHyarihattoProvider>
        </AlertProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
