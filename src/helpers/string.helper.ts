export class StringHelper {

  // =========================================================
  // CASE CONVERSION
  // =========================================================

  /** Step 1: Convert to uppercase */
  static toUpperCase(value: string): string {
    return value.toUpperCase();
  }

  /** Step 2: Convert to lowercase */
  static toLowerCase(value: string): string {
    return value.toLowerCase();
  }

  /** Step 3: Capitalize first letter only */
  static capitalize(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  /** Step 4: Convert to Title Case (capitalize each word) */
  static toTitleCase(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /** Step 5: Convert to camelCase */
  static toCamelCase(value: string): string {
    return value
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+|_|-/g, '');
  }

  /** Step 6: Convert to snake_case */
  static toSnakeCase(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  /** Step 7: Convert to kebab-case */
  static toKebabCase(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  // =========================================================
  // TRIMMING / CLEANING
  // =========================================================

  /** Step 8: Trim whitespace from both ends */
  static trim(value: string): string {
    return value.trim();
  }

  /** Step 9: Remove all whitespace (including internal spaces) */
  static removeAllSpaces(value: string): string {
    return value.replace(/\s+/g, '');
  }

  /** Step 10: Collapse multiple spaces into one */
  static normalizeSpaces(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
  }

  /** Step 11: Remove special characters (keep only alphanumeric + spaces) */
  static removeSpecialChars(value: string): string {
    return value.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  /** Step 12: Remove all numbers from string */
  static removeNumbers(value: string): string {
    return value.replace(/[0-9]/g, '');
  }

  /** Step 13: Remove HTML tags */
  static stripHtmlTags(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }

  // =========================================================
  // EXTRACTION / SUBSTRING
  // =========================================================

  /** Step 14: Get first N characters */
  static getFirstNChars(value: string, n: number): string {
    return value.substring(0, n);
  }

  /** Step 15: Get last N characters */
  static getLastNChars(value: string, n: number): string {
    return value.substring(value.length - n);
  }

  /** Step 16: Truncate with ellipsis if longer than maxLength */
  static truncate(value: string, maxLength: number, suffix: string = '...'): string {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength - suffix.length) + suffix;
  }

  /** Step 17: Extract text between two substrings */
  static extractBetween(value: string, start: string, end: string): string | null {
    const startIndex = value.indexOf(start);
    if (startIndex === -1) return null;
    const endIndex = value.indexOf(end, startIndex + start.length);
    if (endIndex === -1) return null;
    return value.substring(startIndex + start.length, endIndex);
  }

  /** Step 18: Extract all numbers from a string */
  static extractNumbers(value: string): string {
    return (value.match(/\d+/g) ?? []).join('');
  }

  /** Step 19: Extract all digits as array */
  static extractNumberList(value: string): string[] {
    return value.match(/\d+/g) ?? [];
  }

  /** Step 20: Extract email from a string */
  static extractEmail(value: string): string | null {
    const match = value.match(/[\w.-]+@[\w.-]+\.\w+/);
    return match ? match[0] : null;
  }

  // =========================================================
  // COMPARISON / VALIDATION
  // =========================================================

  /** Step 21: Case-insensitive equality check */
  static equalsIgnoreCase(value1: string, value2: string): boolean {
    return value1.toLowerCase() === value2.toLowerCase();
  }

  /** Step 22: Check if string contains substring (case-insensitive) */
  static containsIgnoreCase(value: string, substring: string): boolean {
    return value.toLowerCase().includes(substring.toLowerCase());
  }

  /** Step 23: Check if string is null, undefined, or empty */
  static isNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.length === 0;
  }

  /** Step 24: Check if string is null, undefined, empty, or only whitespace */
  static isNullOrWhitespace(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim().length === 0;
  }

  /** Step 25: Check if string is a valid email format */
  static isValidEmail(value: string): boolean {
    return /^[\w.-]+@[\w.-]+\.\w+$/.test(value);
  }

  /** Step 26: Check if string is a valid phone number (basic 10-digit) */
  static isValidPhoneNumber(value: string): boolean {
    return /^\d{10}$/.test(value.replace(/[\s()-]/g, ''));
  }

  /** Step 27: Check if string is numeric only */
  static isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  /** Step 28: Check if string is alphabetic only */
  static isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
  }

  /** Step 29: Check if string is alphanumeric only */
  static isAlphanumeric(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value);
  }

  /** Step 30: Check if string starts with prefix (case-insensitive) */
  static startsWithIgnoreCase(value: string, prefix: string): boolean {
    return value.toLowerCase().startsWith(prefix.toLowerCase());
  }

  /** Step 31: Check if string ends with suffix (case-insensitive) */
  static endsWithIgnoreCase(value: string, suffix: string): boolean {
    return value.toLowerCase().endsWith(suffix.toLowerCase());
  }

  // =========================================================
  // TRANSFORMATION
  // =========================================================

  /** Step 32: Reverse a string */
  static reverse(value: string): string {
    return value.split('').reverse().join('');
  }

  /** Step 33: Mask part of a string (e.g., for sensitive data like card numbers) */
  static mask(value: string, visibleStart: number = 0, visibleEnd: number = 4, maskChar: string = '*'): string {
    if (value.length <= visibleStart + visibleEnd) return value;
    const start = value.substring(0, visibleStart);
    const end = value.substring(value.length - visibleEnd);
    const masked = maskChar.repeat(value.length - visibleStart - visibleEnd);
    return `${start}${masked}${end}`;
  }

  /** Step 34: Pad string on the left */
  static padLeft(value: string, length: number, padChar: string = '0'): string {
    return value.padStart(length, padChar);
  }

  /** Step 35: Pad string on the right */
  static padRight(value: string, length: number, padChar: string = ' '): string {
    return value.padEnd(length, padChar);
  }

  /** Step 36: Replace all occurrences of a substring */
  static replaceAll(value: string, search: string, replacement: string): string {
    return value.split(search).join(replacement);
  }

  /** Step 37: Split string into array and trim each element */
  static splitAndTrim(value: string, delimiter: string = ','): string[] {
    return value.split(delimiter).map(item => item.trim());
  }

  // =========================================================
  // COUNTING
  // =========================================================

  /** Step 38: Count occurrences of a substring */
  static countOccurrences(value: string, substring: string): number {
    return value.split(substring).length - 1;
  }

  /** Step 39: Count words in a string */
  static countWords(value: string): number {
    return value.trim().split(/\s+/).filter(Boolean).length;
  }

  /** Step 40: Get character count (length) */
  static getLength(value: string): number {
    return value.length;
  }
}