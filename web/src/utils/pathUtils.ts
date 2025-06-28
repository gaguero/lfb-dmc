export interface Point {
  x: number;
  y: number;
}

/**
 * Calculates the center point for a destination slice within the viewport.
 * @param index - The index of the destination slice.
 * @param numDestinations - The total number of destination slices.
 * @returns The center point (x, y) for the slice.
 */
export const getCenterPoint = (index: number, numDestinations: number): Point => {
  const sliceWidth = 100 / numDestinations;
  const x = sliceWidth * index + sliceWidth / 2;
  const y = 50; // Simple vertical center for now
  return { x, y };
};

/**
 * Generates the SVG path data 'd' attribute for a smooth curve between two points.
 * @param start - The starting point {x, y}.
 * @param end - The ending point {x, y}.
 * @returns The SVG path data string.
 */
export const getPathD = (start: Point, end: Point): string => {
  const controlPointX1 = start.x + (end.x - start.x) * 0.3;
  const controlPointY1 = start.y - 30; // Creates an upward arc
  const controlPointX2 = end.x - (end.x - start.x) * 0.3;
  const controlPointY2 = end.y - 30; // Creates an upward arc

  return `M ${start.x} ${start.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${end.x} ${end.y}`;
}; 