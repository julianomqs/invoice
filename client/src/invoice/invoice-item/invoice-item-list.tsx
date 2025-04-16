import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ButtonBar from "../../component/button-bar";
import ButtonColumn from "../../component/button-column";
import useSubrecordTab from "../../component/use-subrecord-tab";
import { InvoiceItem } from "../../graphql/graphql";

const InvoiceItemList = ({
  onNew,
  onEdit,
  value,
  onChange
}: {
  value: InvoiceItem[];
  onChange: (value: InvoiceItem[]) => void;
  onNew: () => void;
  onEdit: (value: InvoiceItem, index: number) => void;
}) => {
  const { onRemove } = useSubrecordTab(value, onChange);

  return (
    <div className="flex flex-col gap-5">
      <ButtonBar>
        <Button onClick={onNew} icon="pi pi-plus" label="New item" />
      </ButtonBar>

      <DataTable
        value={value}
        paginator
        rows={10}
        emptyMessage="No items found"
      >
        <Column
          field="id"
          header="ID"
          sortable
          align="center"
          alignHeader="center"
        />
        <Column field="product.name" header="Product" sortable />
        <Column
          field="amount"
          header="Amount"
          sortable
          align="right"
          alignHeader="right"
        />
        <Column
          field="unitValue"
          header="Unit value"
          sortable
          align="right"
          alignHeader="right"
        />
        <Column
          body={(row: InvoiceItem, { rowIndex }) => (
            <ButtonColumn
              edit={{
                onClick: () => onEdit(row, rowIndex)
              }}
              remove={{
                message: `Do you want to delete invoice item ${row.id} ?`,
                action: () => onRemove(rowIndex)
              }}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default InvoiceItemList;
