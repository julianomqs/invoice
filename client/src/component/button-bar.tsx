import { ReactNode } from "react";

const ButtonBar = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-2 flex-wrap">{children}</div>
);

export default ButtonBar;
