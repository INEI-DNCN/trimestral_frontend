import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import WrapperLoading from "../../app/components/wrapper_loading";
import { getToken } from "../../app/utils/utils_localstorage";
import { validateSource } from "../../feature/login/login_source";

const RoutePrivate = ({ children }: { children: JSX.Element }) => {

  const token = getToken();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setTimeout(() => setIsValid(false), 800);
      return;
    }

    (async () => {
      try {
        const res = await validateSource(token);
        const delay = 1000;
        setTimeout(() => {
          if (res?.data?.isValid) {
            setIsValid(true);
          } else {
            localStorage.removeItem("token");
            setIsValid(false);
          }
        }, delay);

      } catch (error) {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    })();
  }, []);

  // ⏳ mientras esperamos la validación
  if (isValid === null) {
    return <AnimatePresence>
      <motion.div
        key="loader"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WrapperLoading text="Validando sesión..." />
      </motion.div>
    </AnimatePresence>;
  }

  if (isValid === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoutePrivate;