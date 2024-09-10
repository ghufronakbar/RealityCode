import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ToastNotification";
import addLink from "@/services/link/addLink";
import deleteLink from "@/services/link/deleteLink";
import Button from "@/components/Button";
import LayoutDashboard from "@/components/LayoutDashboard";
import getLink from "@/services/link/getLink";
import DashboardLoading from "@/components/loading/DashboardLoading";
import { table } from "console";

const LinkPage: React.FC = () => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["links"],
    queryFn: getLink,
    refetchOnWindowFocus: false,
  });
  const { showToast } = useToast();
  
  return (
    <Sidebar>
      <LayoutDashboard title="Link" childrenHeader={<Button>Add Link</Button>}>
        {isLoading || (isFetching && <DashboardLoading />)}
        {data && data.status === 200 && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Url</th>
                <th>Description</th>
                <th>Icon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((link) => (
                <tr key={link.id}>
                  <td>{link.id}</td>
                  <td>{link.title}</td>
                  <td>{link.url}</td>
                  <td>{link.desc}</td>
                  <td>{link.icon}</td>
                  <td>
                    <Button
                      onClick={() => {
                        // deleteLink(link.id).then((res) => {
                        //   showToast(res.message, res.success);
                        //   refetch();
                        // });
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </LayoutDashboard>
    </Sidebar>
  );
};

export default LinkPage;
