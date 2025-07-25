import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";

import { requests } from "../../api";
import useTitle from "../../hooks/useTitle";
import type { UsersResponse } from "../../utils/types";
import AddMeasurementForm from "../forms/AddMeasurementForm";
import PageHeader from "../PageHeader";
import Spinner from "../Spinner";

const AddMeasurementPage = () => {
  useTitle("Add measurement");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const patientId = searchParams.get("patientId");

  const { data, isLoading, error, isError } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await requests.getUserWithoutMeasurements();
      return response;
    },
  });

  const createMeasurementMutation = useMutation({
    mutationFn: async ({
      weight,
      patientId,
    }: {
      weight: string;
      patientId: number;
    }) => {
      await requests.createMeasurement(weight, patientId);
      return { patientId };
    },
    onSuccess: ({ patientId }: { patientId: number }) => {
      navigate(`/users/${patientId}`, {
        state: { successMessage: `Measurement added!` },
      });
    },
    onError: (_error, { patientId }) => {
      navigate(`/users/${patientId}`, {
        state: { errorMessage: `Failed to add measurement` },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const weight = Number(formData.get("weight"))?.toFixed(1);
    const patientId = Number(formData.get("patientId"));

    if (!weight || !patientId) return;

    createMeasurementMutation.mutate({ weight, patientId });
  };

  if (isLoading)
    return (
      <>
        <PageHeader
          title="Add Measurement"
          navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
        />
        <Spinner />
      </>
    );
  if (isError) return <div>Error: {JSON.stringify(error)}</div>;

  if (data?.count === 0)
    return (
      <>
        <PageHeader
          title="Add Measurement"
          navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
        />
        <div>No users found</div>
      </>
    );

  const users = searchParams.has("patientId")
    ? data?.users.filter((user) => user.id === Number(patientId))
    : data?.users;

  return (
    <>
      <PageHeader
        title="Add Measurement"
        navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
      />
      <AddMeasurementForm onSubmit={handleSubmit} users={users} />
    </>
  );
};

export default AddMeasurementPage;
