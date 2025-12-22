const PrintLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Bingo Cards</title>
        <style>{`
          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            margin: 0;
            font-family: system-ui, sans-serif;
          }

          .page {
            page-break-after: always;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default PrintLayout;
