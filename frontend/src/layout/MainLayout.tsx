import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div style={{ paddingBottom: 10 }}>DashboardLayout</div>
      <div>{children}</div>
    </div>
  );
}
export default MainLayout;
