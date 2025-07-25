import { format } from "date-fns";

import type { Measurement } from "../utils/types";

import Button from "./Button";

const UserDetailsList = ({ measurement }: { measurement: Measurement }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-neutral-500 text-sm">Weight</span>
        <span className="text-neutral-500 text-sm">
          {measurement.weight || "No data"} kg
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-neutral-500 text-sm">Created at</span>
        <span className="text-neutral-500 text-sm">
          {format(new Date(measurement.createdAt || ""), "dd. MMMM yyyy")}
        </span>
      </div>
      {measurement.updatedAt && (
        <div className="flex items-center justify-between">
          <span className="text-neutral-500 text-sm">Updated at</span>
          <span className="text-neutral-500 text-sm">
            {format(new Date(measurement.updatedAt), "dd. MMMM yyyy")}
          </span>
        </div>
      )}
      {measurement.id && (
        <div className="flex items-center justify-end">
          <Button
            href={`/measurements/${measurement.id}/edit`}
            variant="secondary"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDetailsList;
