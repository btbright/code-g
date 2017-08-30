import React from "react";
import ReturnField from "./ReturnField.jsx";

export default function renderFieldSet(fields, onChange) {
  return fields.map(field => <ReturnField key={field.fieldName} onChange={onChange} {...field} />);
}
