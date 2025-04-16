import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode } from "react";

const LoadingScreen = ({
  loading,
  children
}: {
  loading: boolean;
  children?: ReactNode;
}) => (
  <BlockUI fullScreen blocked={loading} template={<ProgressSpinner />}>
    {children}
  </BlockUI>
);

export default LoadingScreen;
