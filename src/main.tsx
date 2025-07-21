import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AlertProvider } from "./context/AlertContext.tsx";
import { FormDataProvider } from "./context/FormHyarihattoContext.tsx";
import { FormErrorsProvider } from "./context/FormErrorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <FormDataProvider>
          <FormErrorsProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </FormErrorsProvider>
        </FormDataProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>,
);
