import { useQuery } from "@tanstack/react-query";

import { requests } from "../../api";
import useTitle from "../../hooks/useTitle";
import Button from "../Button";
import PageHeader from "../PageHeader";
import UsersList from "../UsersList";

const UsersPage = () => {
  useTitle("Users");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    retry: false,
    queryFn: async () => {
      const response = await requests.getUsers();
      return response;
    },
  });

  const { data: usersWithoutMeasurements } = useQuery({
    queryKey: ["usersWithoutMeasurements"],
    queryFn: async () => {
      const response = await requests.getUserWithoutMeasurements();
      return response;
    },
  });

  if (isError) {
    return (
      <>
        <PageHeader title="Users" />
        <div>Something went wrong</div>
        <Button variant="primary" onClick={() => refetch()}>
          Try again
        </Button>
      </>
    );
  }

  const hasUsersWithoutMeasurements =
    usersWithoutMeasurements && usersWithoutMeasurements?.count > 0;

  const navLinks = [
    {
      id: 1,
      label: "Add user",
      href: "/users/add",
    },
    ...(hasUsersWithoutMeasurements
      ? [
          {
            id: 2,
            label: "Add measurement",
            href: "/measurements/add",
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHeader title="Users" navLinks={navLinks} />
      <UsersList data={data?.users} isLoading={isLoading} />
    </>
  );
};

export default UsersPage;
