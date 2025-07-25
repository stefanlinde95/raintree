import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { requests } from "../../api";
import useTitle from "../../hooks/useTitle";
import type { UserMeasurementResponse } from "../../utils/types";
import Button from "../Button";
import PageHeader from "../PageHeader";
import Separator from "../Separator";
import Spinner from "../Spinner";
import UserDetailsList from "../UserDetailsList";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<UserMeasurementResponse>({
    queryKey: ["measurements", id],
    retry: false,
    queryFn: async () => {
      const response = await requests.getUserMeasurements(Number(id));
      return response;
    },
  });

  const deleteMeasurementMutation = useMutation({
    mutationFn: async () => {
      if (!data?.measurements.id) return;
      await requests.deleteMeasurement(data.measurements.id);
    },
    onSuccess: () => {
      navigate("/", {
        state: { successMessage: "Measurement deleted!" },
      });
    },
    onError: () => {
      navigate("/", {
        state: { errorMessage: "Failed to delete measurement" },
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      await requests.deleteUser(Number(id));
    },
    onSuccess: () => {
      navigate("/", {
        state: { successMessage: "User deleted!" },
      });
    },
    onError: () => {
      navigate("/", {
        state: { errorMessage: "Failed to delete user" },
      });
    },
  });

  const pageTitle = data?.measurements.patientName
    ? `${data.measurements.patientName} details`
    : "User details";

  useTitle(pageTitle);

  if (isLoading)
    return (
      <>
        <PageHeader
          title={pageTitle}
          navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
        />
        <div className="min-h-26 flex items-center justify-center">
          <Spinner />
        </div>
      </>
    );

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    const hasNoMeasurements =
      error instanceof Error && error.cause === "MEASUREMENT_NOT_FOUND";
    const userNotFound =
      error instanceof Error && error.cause === "USER_NOT_FOUND";

    return (
      <>
        <PageHeader
          title={pageTitle}
          navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
        />
        <div>{errorMessage}</div>
        {hasNoMeasurements && (
          <div className="flex flex-col gap-y-2 items-end justify-center">
            <Button
              variant="primary"
              className="inline-block"
              href={`/measurements/add?patientId=${id}`}
            >
              Add measurement
            </Button>
            <Separator />
            <Button
              variant="warning"
              onClick={() => deleteUserMutation.mutate()}
            >
              Delete user
            </Button>
          </div>
        )}
        {userNotFound && (
          <div className="flex flex-col gap-y-2 items-end justify-center">
            <Button
              variant="primary"
              className="inline-block"
              href="/users/add"
            >
              Add user
            </Button>
          </div>
        )}
      </>
    );
  }

  if (!data?.measurements) {
    return (
      <>
        <PageHeader
          title="User details"
          navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
        />
        <div>No measurement available</div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={pageTitle}
        navLinks={[{ id: 1, label: "Back to users", href: "/" }]}
      />
      <UserDetailsList measurement={data.measurements} />
      <Separator />
      <div className="flex flex-col gap-y-2 items-end justify-center">
        <Button
          variant="warning"
          onClick={() => deleteMeasurementMutation.mutate()}
        >
          Delete measurement
        </Button>
        <Button variant="warning" onClick={() => deleteUserMutation.mutate()}>
          Delete user
        </Button>
      </div>
    </>
  );
};

export default UserDetailsPage;
