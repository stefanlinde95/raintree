import type { FormEventHandler } from "react";

import Button from "../Button";
import Input from "../Input";

interface AddUserFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const AddUserForm = ({ onSubmit }: AddUserFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="flex justify-end">
        <Button variant="primary" type="submit">
          Add user
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
