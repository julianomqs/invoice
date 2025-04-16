import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { useToast } from "../use-toast";

const useShowError = (error?: ApolloError) => {
  const toastRef = useToast();

  useEffect(() => {
    if (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 5000
      });
    }
  }, [error, toastRef]);
};

export default useShowError;
