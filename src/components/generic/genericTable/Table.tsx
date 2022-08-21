import "./table.scss";
import crossDelete from "./crossDelete.svg";

export interface TableProps {
  type: string;
  headers: string[];
  lines: string[][];
  onClick?: undefined | ((num: number) => void);
  borderBottomColor?: string;
  lineHeight?: string;
  fontWeight?: string;
}

export default function Table({
  type = "markets",
  headers = [],
  lines = [],
  onClick,
  borderBottomColor = "",
  lineHeight = "",
  fontWeight = "",
}: TableProps) {
  return (
    <div className="table">
      <ul>
        <li className={`table-header ${lineHeight} ${type}`}>
          {headers.map((header, index) => (
            <p key={index} className="table__item">
              {header}
            </p>
          ))}
        </li>
      </ul>
      <ul>
        {lines.map((line, index) => (
          <li
            key={index}
            className={`table-line ${fontWeight} ${borderBottomColor} ${type} ${lineHeight}`}
          >
            {line.map((item, index) => (
              <p key={index} className="table__item">
                {item}
              </p>
            ))}
            {type === "wallet-modal" && onClick && (
              <div onClick={() => onClick(index)}>
                <img className="remove" src={crossDelete} alt="cross" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
