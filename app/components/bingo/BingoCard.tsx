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
  }
};

// TODO: tailwindize
export const BingoCard: React.FC<BingoCardProps> = ({
  card,
  style,
  title,
  footer,
  gameNumber,
}) => {
  const cardMatrix = card.grid;

  return (
    <div
      className="relative padding-[4mm] box-border w-full h-full grid grid-rows-[auto_1fr_auto]"
      style={{
        backgroundColor: style.background,
        fontFamily: style.fontFamily,
        color: style.textColor,
      }}
    >
      <div className="bingo-card-title text-center text-3xl font-bold mb-0">
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
        className="bingo w-full h-full border-collapse table table-fixed"
        style={{ borderColor: style.tableColor }}
      >
        <thead>
          <tr>
            {["B", "I", "N", "G", "O"].map((h) => (
              <th
                key={h}
                className="text-center text-2xl"
                style={{ borderColor: style.tableColor }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cardMatrix.map((row: any, r: number) => (
            <tr key={r}>
              {row.map((cell: any, c: number) => (
                <td
                  key={c}
                  style={{ borderColor: style.tableColor }}
                  className="border-2 border-black w-full text-center text-3xl p-[5mm] font-semibold tracking-[1px] has-[img]:p-[2mm]"
                >
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {footer && (
        <div className="bingo-card-footer text-center text-base font-medium mt-[3mm]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default BingoCard;
