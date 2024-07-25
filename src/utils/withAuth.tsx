import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get("/api/checkAuth", {
            withCredentials: true,
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            router.replace("/admin/login");
          }
        } catch (error) {
          router.replace("/admin/login");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
