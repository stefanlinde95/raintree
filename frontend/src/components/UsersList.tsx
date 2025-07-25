import { NoSymbolIcon } from "@heroicons/react/24/outline";

import type { User } from "../utils/types";

import Spinner from "./Spinner";

const UsersList = ({
  data,
  isLoading,
}: {
  data: User[];
  isLoading: boolean;
}) => {
  if (isLoading && !data) return <Spinner />;

  if (!data || data.length === 0)
    return (
      <div className="bg-neutral-200 min-h-42 rounded-md flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <NoSymbolIcon className="size-8 text-neutral-600" />
          <div className="text-neutral-600 text-sm">No data</div>
        </div>
      </div>
    );

  return (
    <ul className="space-y-2">
      {data?.map((item) => (
        <li key={item.id}>
          <a
            href={`/users/${item.id}`}
            className="flex items-center justify-between border border-neutral-200 hover:bg-neutral-200 duration-300 py-1 px-2 rounded-md"
          >
            {item.name} <span className="text-neutral-600 text-sm">View</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
