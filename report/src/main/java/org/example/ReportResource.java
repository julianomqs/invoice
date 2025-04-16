package org.example;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Locale;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Path("/report")
@Consumes(MediaType.APPLICATION_JSON)
@Produces("application/pdf")
public class ReportResource {

  @Path("/{path}")
  @POST
  public byte[] generateReport(@PathParam("path") String path, ReportResourceBody body) {
    var reportPath = "report/" + path.replaceAll("([a-z])([A-Z]+)", "$1-$2").toLowerCase() + ".jrxml";
    return generatePDF(reportPath, body);
  }

  private byte[] generatePDF(String report, ReportResourceBody body) {
    JasperReport compiledReport;

    try {
      compiledReport = JasperCompileManager
          .compileReport(Thread.currentThread().getContextClassLoader().getResourceAsStream(report));
    } catch (JRException ex) {
      throw new RuntimeException(ex);
    }

    JasperPrint filledReport;

    var params = new HashMap<String, Object>(body.getParam());
    params.put(JRParameter.REPORT_LOCALE, Locale.of("pt", "BR"));

    try {
      filledReport = JasperFillManager.fillReport(compiledReport, params,
          new JRMapCollectionDataSource(body.getData()));
    } catch (JRException ex) {
      throw new RuntimeException(ex);
    }

    var exporter = new JRPdfExporter();
    exporter.setExporterInput(new SimpleExporterInput(filledReport));

    var outputStream = new ByteArrayOutputStream();
    exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

    try {
      exporter.exportReport();
    } catch (JRException ex) {
      throw new RuntimeException(ex);
    }

    return outputStream.toByteArray();
  }
}