// Helper function to check if a value is not a number
export const isNotNumber = (value: any): boolean => isNaN(Number(value));

// Helper to parse command-line arguments for numbers
export const parseNumbers = (args: string[]): number[] => {
  const numbers = args.map(arg => {
    if (isNotNumber(arg)) {
      throw new Error(`Provided value is not a number: ${arg}`);
    }
    return Number(arg);
  });
  return numbers;
};
