import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLoading from "@/components/loading/DashboardLoading";
import { COOKIES_KEY } from "@/constants/key";
import Cookies from "js-cookie";
import checkAuth from "@/services/auth/checkAuth";
import { useToast } from "@/components/ToastNotification";
import { Sidebar } from "@/components/ui/sidebar";
import LayoutDashboard from "@/components/LayoutDashboard";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const { showToast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = Cookies.get(COOKIES_KEY);
      if (router.isReady) {
        if (token) {
          const handleAuth = async () => {
            try {
              const response = await checkAuth(token);
              setLoading(false);
            } catch (error) {
              showToast("Unauthorized", "error");
              router.push("/admin/login");
            }
          };
          handleAuth();
        } else {
          showToast("Unauthorized", "error");
          router.push("/admin/login");
        }
      }
    }, [router]);

    if (loading) {
      return (
        <Sidebar>
          <LayoutDashboard title="Loading">
            <DashboardLoading />
          </LayoutDashboard>
        </Sidebar>
      );
    }
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
