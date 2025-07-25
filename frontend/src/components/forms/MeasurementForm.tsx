import { type FormEventHandler } from "react";

import { maxWeight, minWeight } from "../../config";
import Button from "../Button";
import Input from "../Input";

interface MeasurementFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  initialValue: number;
}

const MeasurementForm = ({ onSubmit, initialValue }: MeasurementFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label htmlFor="weight">Weight</label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={minWeight}
          max={maxWeight}
          step={0.1}
          name="weight"
          defaultValue={initialValue}
          onWheel={(e) => e.currentTarget.blur()}
          required
        />
        <span className="text-neutral-500 text-sm">Kg</span>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default MeasurementForm;
