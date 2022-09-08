import "./table.scss";
import crossDelete from "./crossDelete.svg";
import { TableTypes } from "../../../types";

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  type: TableTypes.table_markets | TableTypes.table_wallet;
  headers: string[];
  lines: string[][];
  onCustomClick?: (num: number) => void;
  borderBottomColor?: "border_black" | "border_gray";
  lineHeight?: "height_low" | "height_high" | "height_veryhigh";
  fontWeight?: "weight_normal" | "weight_bold";
}

export default function Table({
  type = TableTypes.table_markets,
  headers = [],
  lines = [],
  onCustomClick,
  borderBottomColor = "border_black",
  lineHeight = "height_high",
  fontWeight = "weight_normal",
}: TableProps) {
  return (
    <div className="table">
      <ul>
        <li className={`table-header ${lineHeight} ${type}`}>
          {headers.map((header, index) => (
            <p
              key={index}
              className={`table__item ${
                (index === 3 || index === 4) &&
                type === TableTypes.table_markets
                  ? "adaptive"
                  : ""
              } ${
                index === 2 && type === TableTypes.table_wallet
                  ? "adaptive"
                  : ""
              }`}
            >
              {header}
            </p>
          ))}
        </li>
      </ul>
      <ul className={`${type}`}>
        {lines.map((line, index) => (
          <li
            key={index}
            className={`table-line ${fontWeight} ${borderBottomColor} ${type} ${lineHeight}`}
          >
            {line.map((item, index) => (
              <p
                key={index}
                className={`table__item ${
                  (index === 3 || index === 4) &&
                  type === TableTypes.table_markets
                    ? "adaptive"
                    : ""
                } ${
                  index === 2 && type === TableTypes.table_wallet
                    ? "adaptive"
                    : ""
                }`}
              >
                {item}
              </p>
            ))}
            {type === TableTypes.table_wallet && onCustomClick && (
              <div onClick={() => onCustomClick(index)}>
                <img className="remove" src={crossDelete} alt="cross" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
