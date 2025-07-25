import type { FormEventHandler } from "react";

import { maxWeight, minWeight } from "../../config";
import type { User } from "../../utils/types";
import Button from "../Button";
import Input from "../Input";

interface AddMeasurementFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  users: User[];
}

const AddMeasurementForm = ({ onSubmit, users }: AddMeasurementFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label htmlFor="weight">Weight</label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          id="weight"
          name="weight"
          min={minWeight}
          max={maxWeight}
          step={0.1}
          required
        />
        <span className="text-neutral-500 text-sm">Kg</span>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="patientId">Patient</label>
        <select
          name="patientId"
          id="patientId"
          className="border border-neutral-300 rounded-md p-1"
          required
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-end">
        <Button variant="primary" type="submit">
          Add measurement
        </Button>
      </div>
    </form>
  );
};

export default AddMeasurementForm;
