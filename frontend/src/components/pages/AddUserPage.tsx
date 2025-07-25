import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { requests } from "../../api";
import useTitle from "../../hooks/useTitle";
import AddUserForm from "../forms/AddUserForm";
import PageHeader from "../PageHeader";

const AddUserPage = () => {
  useTitle("Add user");

  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      await requests.createUsers(name);
      return { name };
    },
    onSuccess: ({ name }: { name: string }) => {
      navigate("/", {
        state: { successMessage: `User ${name} added!` },
      });
    },
    onError: () => {
      navigate("/", {
        state: { errorMessage: "Failed to create user" },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;

    createUserMutation.mutate({ name });
  };

  return (
    <>
      <PageHeader
        title="Add user"
        navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
      />
      <AddUserForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddUserPage;
