export interface IBit {
  x: number;
  y: number;
  color: number;
  distanceOf(pixel: IBit): number;
}
