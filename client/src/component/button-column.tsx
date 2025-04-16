import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router";

const ButtonColumn = ({
  edit,
  remove
}: {
  edit: { url?: string; onClick?: () => void };
  remove: { message: string; action: () => void };
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        onClick={
          edit.onClick ?? (() => (edit.url ? navigate(edit.url) : undefined))
        }
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        onClick={() =>
          confirmDialog({
            message: remove.message,
            header: "Delete",
            icon: "pi pi-exclamation-triangle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: remove.action
          })
        }
      />
    </div>
  );
};

export default ButtonColumn;
