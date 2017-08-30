import React from "react";
import months from "../../constants/months";
import { times } from "lodash";
import '../../styles/MonthSelectionForm.css';

export default props =>
  <div>
    <div className="row">
      {times(months.length, i =>
        <div key={i} className="month-label one column">
          <label htmlFor={`${props.id}-${i}`}>
            {months[i]}
          </label>
        </div>
      )}
    </div>
    <div className="row">
      {times(months.length, i =>
        <div key={i} className="one column">
          <div
            onClick={props.onMonthClick.bind(this, i + 1)}
						className="month-checkbox"
            key={i}
          >
            <input
              id={`${props.id}-${i}`}
              type="checkbox"
              readOnly
              checked={props.months.indexOf(i + 1) !== -1}
            />
          </div>
        </div>
      )}
    </div>
  </div>;
