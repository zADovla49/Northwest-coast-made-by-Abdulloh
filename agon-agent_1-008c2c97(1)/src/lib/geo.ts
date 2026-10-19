/**
 * A hand-built, equirectangular world map.
 * Coastlines are deliberately coarse (a few dozen points per continent) —
 * this is a stylised gallery map, not a navigational chart.
 */

export const MAP_W = 1000;
export const MAP_H = 520;

export type LonLat = [lon: number, lat: number];

export function project([lon, lat]: LonLat): [number, number] {
  return [((lon + 180) / 360) * MAP_W, ((90 - lat) / 180) * MAP_H];
}

export function projectXY(lon: number, lat: number): [number, number] {
  return project([lon, lat]);
}

function ring(points: LonLat[]): string {
  return (
    points
      .map(([lon, lat], i) => {
        const [x, y] = project([lon, lat]);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

const northAmerica: LonLat[] = [
  [-168, 66], [-166, 69], [-156, 71], [-140, 70], [-128, 70], [-115, 69],
  [-100, 69], [-90, 69], [-82, 70], [-75, 68], [-66, 60], [-56, 52],
  [-64, 45], [-70, 42], [-74, 39], [-76, 35], [-81, 31], [-80, 25],
  [-83, 28], [-88, 30], [-94, 29], [-97, 26], [-105, 21], [-110, 23],
  [-114, 29], [-120, 34], [-124, 40], [-124, 48], [-131, 54], [-140, 60],
  [-150, 59], [-158, 56], [-165, 60],
];

const greenland: LonLat[] = [
  [-46, 60], [-30, 68], [-22, 72], [-20, 78], [-32, 83], [-46, 82],
  [-58, 76], [-53, 68],
];

const southAmerica: LonLat[] = [
  [-81, -4], [-77, 1], [-72, 11], [-62, 10], [-52, 5], [-44, -2], [-37, -5],
  [-35, -9], [-39, -16], [-48, -25], [-53, -34], [-58, -39], [-62, -42],
  [-65, -48], [-68, -53], [-73, -53], [-75, -46], [-73, -38], [-72, -30],
  [-70, -20], [-71, -18], [-76, -14], [-80, -6],
];

const africa: LonLat[] = [
  [-17, 15], [-16, 21], [-10, 26], [-6, 32], [0, 36], [10, 37], [20, 32],
  [30, 31], [34, 28], [38, 20], [43, 12], [51, 12], [48, 4], [41, -2],
  [40, -11], [35, -18], [33, -26], [27, -34], [19, -35], [16, -29],
  [12, -18], [9, -1], [3, 5], [-5, 5], [-10, 6], [-13, 9],
];

const eurasia: LonLat[] = [
  [-10, 37], [-9, 43], [-2, 48], [2, 51], [6, 54], [9, 57], [11, 60],
  [18, 60], [24, 66], [30, 70], [40, 68], [55, 70], [70, 72], [80, 74],
  [100, 77], [115, 74], [130, 72], [145, 72], [160, 70], [172, 66],
  [180, 64], [178, 60], [170, 59], [162, 57], [156, 51], [143, 46],
  [135, 43], [128, 40], [122, 38], [120, 31], [112, 21], [105, 10],
  [100, 13], [97, 16], [94, 20], [90, 22], [85, 19], [80, 13], [77, 8],
  [75, 12], [72, 20], [68, 23], [62, 25], [58, 23], [55, 20], [52, 16],
  [48, 13], [44, 13], [43, 17], [40, 21], [37, 25], [34, 28], [35, 32],
  [36, 36], [32, 37], [28, 37], [26, 38], [23, 37], [20, 40], [17, 40],
  [15, 38], [13, 45], [8, 44], [3, 43], [0, 40], [-3, 37],
];

const australia: LonLat[] = [
  [114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [145, -15],
  [150, -22], [153, -28], [150, -37], [145, -39], [140, -38], [135, -35],
  [129, -32], [122, -34], [115, -34], [113, -26],
];

const islands: LonLat[][] = [
  [[-6, 50], [-3, 54], [-2, 58], [-5, 58], [-6, 55], [-8, 54], [-5, 51]], // Britain
  [[-10, 52], [-6, 53], [-6, 55], [-10, 55]], // Ireland
  [[130, 32], [135, 34], [139, 36], [141, 40], [142, 45], [140, 42], [136, 37], [132, 34]], // Japan
  [[44, -16], [50, -15], [50, -25], [45, -25], [43, -20]], // Madagascar
  [[95, 5], [100, 2], [105, -6], [114, -8], [117, -9], [110, -8], [100, -2]], // Sumatra + Java
  [[109, 2], [117, 4], [119, -3], [110, -3]], // Borneo
  [[131, -1], [141, -3], [150, -9], [143, -9], [134, -4]], // New Guinea
  [[173, -35], [178, -38], [174, -42], [167, -46], [170, -44], [172, -40]], // Aotearoa / NZ
  [[120, 18], [124, 12], [126, 7], [122, 10], [120, 14]], // Philippines
  [[80, 9], [82, 8], [81, 6], [79, 7]], // Sri Lanka
  [[-19, 66], [-14, 66], [-14, 64], [-21, 64]], // Iceland
  [[-84, 22], [-77, 21], [-74, 20], [-80, 22]], // Cuba
  [[-60, 11], [-52, 5], [-55, 2], [-62, 8]], // Lesser Antilles arc
];

export const LAND_PATHS: string[] = [
  ring(northAmerica),
  ring(greenland),
  ring(southAmerica),
  ring(africa),
  ring(eurasia),
  ring(australia),
  ...islands.map(ring),
];

/** Faint latitude / longitude graticule. */
export const GRATICULE: { d: string; key: string }[] = (() => {
  const lines: { d: string; key: string }[] = [];
  for (let lon = -180; lon <= 180; lon += 30) {
    const [x] = project([lon, 0]);
    lines.push({ key: `lon${lon}`, d: `M${x.toFixed(1)},0 L${x.toFixed(1)},${MAP_H}` });
  }
  for (let lat = -60; lat <= 80; lat += 20) {
    const [, y] = project([0, lat]);
    lines.push({ key: `lat${lat}`, d: `M0,${y.toFixed(1)} L${MAP_W},${y.toFixed(1)}` });
  }
  return lines;
})();

/** Quadratic arc between two points, bowed upward — used for "journey" lines. */
export function arcPath(from: LonLat, to: LonLat, bow = 0.22): string {
  const [x1, y1] = project(from);
  const [x2, y2] = project(to);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * bow - 18;
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}
