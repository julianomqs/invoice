package org.example;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;

import net.sf.jasperreports.functions.annotations.Function;
import net.sf.jasperreports.functions.annotations.FunctionCategories;
import net.sf.jasperreports.functions.annotations.FunctionParameter;
import net.sf.jasperreports.functions.annotations.FunctionParameters;

@FunctionCategories({ ReportCategory.class })
public class ReportCategoryFunctions {

	private static final DecimalFormat NUMBER_FORMATTER;

	static {
		NUMBER_FORMATTER = (DecimalFormat) NumberFormat.getNumberInstance(Locale.of("pt", "BR"));
		NUMBER_FORMATTER.applyPattern("#,##0.00;-#,##0.00");
		NUMBER_FORMATTER.setParseBigDecimal(true);
	}

	@Function("FORMAT_NUMBER")
	@FunctionParameters({ @FunctionParameter("number") })
	public static String FORMAT_NUMBER(BigDecimal number) {
		if (number == null) {
			return null;
		}

		return NUMBER_FORMATTER.format(number);
	}
}