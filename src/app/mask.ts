/**
 * Domain model class holding what needs to be stored about a mask.
 * Basically a name for the mask to identify it, and the number of hours the mask has been used in different pollution conditions.
 */
export class Mask {

  /**
   * A name to identify the mask.
   */
  name: string = "Mask 1";

  /**
   * The number of hours the mask has been used in conditions with an AQI of 51 - 100 (yellow).
   */
  yellow: number = 0;

  /**
   * The number of hours the mask has been used in conditions with an AQI of 101 - 150 (orange).
   */
  orange: number = 0;

  /**
   * The number of hours the mask has been used in conditions with an AQI of 151 - 200 (red).
   */
  red: number = 0;

  /**
   * The number of hours the mask has been used in conditions with an AQI of 201 - 300 (purple).
   */
  purple: number = 0;

  /**
   * The number of hours the mask has been used in conditions with an AQI of 300+ (brown).
   */
  brown: number = 0;
}
