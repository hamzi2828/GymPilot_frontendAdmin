"use client";

import { FiPlus } from "react-icons/fi";
import { PageHeader, Button } from "../_shared/ui";
import GymsTable from "./GymsTable";

export default function SuperAdminGymsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Gyms"
        description="Every gym on the platform, with live numbers from its own database. Click a row to manage it."
        actions={
          <Button href="/super-admin/gyms/new">
            <FiPlus className="h-4 w-4" /> New gym
          </Button>
        }
      />
      <GymsTable />
    </>
  );
}
