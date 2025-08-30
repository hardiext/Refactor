const DashboardGrid = () => {
  const rows = 38;
  const columns = 38;
  const squareSize = 30;
  const gap = 0;

  return (
    <div
      className="absolute inset-0 grid z-0"
      style={{
        gridTemplateRows: `repeat(${rows}, ${squareSize}px)`,
        gridTemplateColumns: `repeat(${columns}, ${squareSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <div
          key={index}
          className="border-[0.3px] border-gray-100/20 bg-transparent transition-colors duration-200 hover:border-pink-500/20 hover:bg-pink-500/20"
          style={{ width: squareSize, height: squareSize }}
        />
      ))}
    </div>
  );
};
export default DashboardGrid;
