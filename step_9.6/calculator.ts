export type Operation = 'add' | 'multiply' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'add':
      return a + b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
  }
};
