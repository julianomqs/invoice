import { useEffect, useState } from "react";

const useReport = (reportName = "report") => {
  const [report, setReport] = useState<string>("");

  useEffect(() => {
    let iframe: HTMLIFrameElement | undefined;
    let url: string | undefined;
    let link: HTMLAnchorElement | undefined;

    const createBlobFromBase64 = (base64: string) => {
      const byteCharacters = atob(base64);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      return new Blob([byteArrays], { type: "application/pdf" });
    };

    if (report) {
      const blob = createBlobFromBase64(report);
      url = URL.createObjectURL(blob);

      const closePrint = () => {
        if (iframe) {
          document.body.removeChild(iframe);
        }
      };

      const setPrint = () => {
        if (iframe?.contentWindow) {
          iframe.contentWindow.onbeforeunload = closePrint;
          iframe.contentWindow.onafterprint = closePrint;
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      };

      iframe = document.createElement("iframe");
      iframe.onload = setPrint;
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";

      iframe.src = url;

      document.body.appendChild(iframe);
    }

    return () => {
      if (link) {
        document.body.removeChild(link);
      }

      if (iframe) {
        document.body.removeChild(iframe);
      }

      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [report, reportName]);

  return setReport;
};

export default useReport;
