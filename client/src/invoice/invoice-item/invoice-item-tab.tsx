import useSubrecordTab from "../../component/use-subrecord-tab";
import { InvoiceItem } from "../../graphql/graphql";
import InvoiceItemEdit from "./invoice-item-edit";
import InvoiceItemList from "./invoice-item-list";

const InvoiceItemTab = ({
  value,
  onChange
}: {
  value: InvoiceItem[];
  onChange: (value: InvoiceItem[]) => void;
}) => {
  const { record, mode, onNew, onEdit, onEditChange, onCancel } =
    useSubrecordTab(value, onChange);

  if (mode === "list") {
    return (
      <InvoiceItemList
        value={value}
        onChange={onChange}
        onNew={onNew}
        onEdit={onEdit}
      />
    );
  }

  return (
    <InvoiceItemEdit
      value={record}
      onChange={onEditChange}
      onCancel={onCancel}
    />
  );
};

export default InvoiceItemTab;
