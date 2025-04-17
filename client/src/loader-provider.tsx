import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useState } from "react";
import { LoaderContext } from "./use-loader";

export const LoaderProvider = ({
  children,
  ...props
}: {
  children?: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext value={{ loading, setLoading }} {...props}>
      <BlockUI fullScreen blocked={loading} template={<ProgressSpinner />}>
        {children}
      </BlockUI>
    </LoaderContext>
  );
};
