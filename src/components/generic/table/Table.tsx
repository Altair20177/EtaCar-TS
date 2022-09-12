import "./table.scss";
import crossDelete from "./crossDelete.svg";
import { TableTypes } from "../../../types";

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  type: TableTypes.table_markets | TableTypes.table_wallet;
  headers: string[];
  lines: string[][];
  onCustomClick?: (num: number) => void;
  borderBottomColor?: "table_border_black" | "table_border_gray";
  lineHeight?: "table_height_low" | "table_height_high" | "table_height_veryhigh";
  fontWeight?: "table_weight_normal" | "table_weight_bold";
}

export enum IndexsConsts {
  WALLET_PRICE = 2,

  MARKET_BASE = 3,
  MARKET_QUOTE = 4,
}

export default function Table({
  type = TableTypes.table_markets,
  headers = [],
  lines = [],
  onCustomClick,
  borderBottomColor = "table_border_black",
  lineHeight = "table_height_high",
  fontWeight = "table_weight_normal",
}: TableProps) {
  function isAdaptive(tableType: TableTypes, index: number) {
    switch (tableType) {
      case TableTypes.table_markets:
        if (
          index === IndexsConsts.MARKET_BASE ||
          index === IndexsConsts.MARKET_QUOTE
        )
          return "adaptive";
        break;
      case TableTypes.table_wallet:
        if (index === IndexsConsts.WALLET_PRICE) return "adaptive";
        break;
      default:
        return "";
    }
  }

  return (
    <div className="table">
      <ul>
        <li className={`table-header ${lineHeight} ${type}`}>
          {headers.map((header, index) => (
            <p key={index} className={`table__item ${isAdaptive(type, index)}`}>
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
                className={`table__item ${isAdaptive(type, index)}`}
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
