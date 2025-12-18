"use client";

import { Card, Cell, GeneratedCard } from "@/lib/bingo";
import { CardStyle } from "@/hooks/useStyleConfig";

interface BingoCardProps {
  card: GeneratedCard;
  style: CardStyle;
  title: string;
  footer: string;
  gameNumber?: string | number;
}

const renderCell = (cell: Cell) => {
  switch (cell.type) {
    case "number":
      return <span>{cell.value}</span>;
    case "text":
      return <span>{cell.value}</span>;
    case "image":
      return (
        <img
          src={cell.src}
          alt="free-center"
          className="block object-cover w-full h-auto aspect-square"
        />
      );
    case "empty":
      return <span className="opacity-0">{cell.value}</span>;
  }
};

const BingoCard: React.FC<BingoCardProps> = ({
  card,
  style,
  title,
  footer,
  gameNumber,
}) => {
  return (
    <div
      className="relative padding-[4mm] box-border w-full h-full grid grid-rows-[auto_1fr_auto]"
      style={{
        backgroundColor: style.background,
        fontFamily: style.fontFamily,
        color: style.textColor,
      }}
    >
      <div className="text-center text-3xl font-bold mb-0">
        {title}{" "}
        {gameNumber != null && (
          <span
            style={{ backgroundColor: style.gameNumberBackground }}
            className="absolute top-0 right-0 text-2xl font-semibold px-[5mm] py-[2mm] rounded-bl-3xl"
          >
            {gameNumber}
          </span>
        )}
      </div>

      <table
        className="w-full h-full border-collapse table table-fixed"
        style={{
          backgroundColor: style.tableColor,
          borderColor: style.borderColor,
        }}
      >
        <thead>
          <tr>
            {["B", "I", "N", "G", "O"].map((h) => (
              <th
                key={h}
                className="text-center text-2xl"
                style={{
                  backgroundColor: style.background,
                  borderColor: style.borderColor,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {card.grid.map((row: Cell[], r: number) => (
            <tr key={r}>
              {row.map((cell: Cell, c: number) => (
                <td
                  key={c}
                  style={{
                    borderColor: style.borderColor,
                    padding: cell.type === "image" ? 0 : "5mm",
                  }}
                  className="border-2 w-full text-center text-3xl font-semibold tracking-[1px]"
                >
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center text-base font-medium mt-[3mm]">{footer}</div>
    </div>
  );
};

export default BingoCard;
