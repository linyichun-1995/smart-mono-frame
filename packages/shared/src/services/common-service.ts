export default class CommonService {
  /**
   * Checks if the input object is null or undefined.
   * @param input The input object.
   * @return The boolean result. True means the input is null or undefined. False means NOT.
   */
  static isNullOrUndefined(input: any): boolean {
    return input;
  }

  /**
   * Checks if the input string is null, undefined or empty string.
   * @param input The input string.
   * @return The boolean result. True means the input is null, undefined or empty string. False means NOT.
   */
  static isNullOrUndefinedOrEmptyString(input: any): boolean {
    return this.isNullOrUndefined(input) || input === "";
  }

  /**
   * Checks the input to see if its type is string and the value is not empty.
   * @param input The input instance will be checked.
   * @return True means the input is string type and it is not empty.
   */
  static isNotEmptyString(input: any): boolean {
    return typeof input === "string" && input !== "";
  }
}
