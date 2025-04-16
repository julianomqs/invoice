package org.example;

import java.util.List;
import java.util.Map;

public class ReportResourceBody {

  private Map<String, Object> param;
  private List<Map<String, ?>> data;

  public Map<String, Object> getParam() {
    return param;
  }

  public void setParam(Map<String, Object> param) {
    this.param = param;
  }

  public List<Map<String, ?>> getData() {
    return data;
  }

  public void setData(List<Map<String, ?>> data) {
    this.data = data;
  }
}
