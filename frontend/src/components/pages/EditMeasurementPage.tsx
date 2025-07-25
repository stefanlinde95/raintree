import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { requests } from "../../api";
import useTitle from "../../hooks/useTitle";
import type { UserMeasurementResponse } from "../../utils/types";
import Button from "../Button";
import MeasurementForm from "../forms/MeasurementForm";
import PageHeader from "../PageHeader";
import Spinner from "../Spinner";

const EditMeasurementPage = () => {
  useTitle("Edit measurement");

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery<UserMeasurementResponse>(
    {
      queryKey: ["measurements", id],
      retry: false,
      queryFn: async () => {
        if (!id) throw new Error("Measurement ID is required");
        const response = await requests.getMeasurement(id);
        return response;
      },
    }
  );

  const updateMeasurementMutation = useMutation({
    mutationFn: async ({ id, weight }: { id: string; weight: number }) => {
      return requests.updateMeasurements(id, weight);
    },
    onSuccess: () => {
      navigate(`/users/${data?.measurements.patientId}`, {
        state: { successMessage: "Measurement updated!" },
      });
    },
    onError: () => {
      navigate(`/users/${data?.measurements.patientId}`, {
        state: { errorMessage: "Failed to update measurement" },
      });
    },
  });

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return (
      <>
        <PageHeader title="Edit measurement" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-lg">
          {errorMessage || "Failed to fetch measurement"}
        </p>
        <div className="flex gap-x-2">
          <Button variant="primary" href="/" className="inline-block">
            Go back to home
          </Button>
          <Button variant="primary" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const weight = Number(formData.get("weight"))?.toFixed(1);

    if (!weight || Number(weight) === Number(data?.measurements.weight) || !id)
      return;

    updateMeasurementMutation.mutate({ id, weight: Number(weight) });
  };

  return (
    <>
      <PageHeader
        title={`Edit measurement`}
        navLinks={[
          {
            id: 1,
            label: "Back to user",
            href: `/users/${data?.measurements.patientId}`,
          },
        ]}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <MeasurementForm
          onSubmit={handleSubmit}
          initialValue={Number(data?.measurements.weight)}
        />
      )}
    </>
  );
};

export default EditMeasurementPage;
