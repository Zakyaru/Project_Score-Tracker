import { describe, it, expect } from 'vitest';
import { winRate } from './win-rate.js';

describe('winRate', () => {
  it('returns the win percentage', () => {
    expect(winRate('3', 4)).toBe(75);
  });

  it('rounds to the nearest integer', () => {
    expect(winRate(1, 3)).toBe(33);
  });

  it('returns 0 when no game has been played', () => {
    expect(winRate(0, 0)).toBe(0);
  });

  it('throws when wins exceed games played', () => {
    expect(() => winRate(5, 3)).toThrow(RangeError);
  });

  it('throws when there are wins but no game played', () => {
    expect(() => winRate(3, 0)).toThrow(RangeError);
  });

  it('throws on negative values', () => {
    expect(() => winRate(-1, 3)).toThrow(RangeError);
    expect(() => winRate(1, -3)).toThrow(RangeError);
  });

  it('throws on non-integer values', () => {
    expect(() => winRate(1.5, 3)).toThrow(RangeError);
  });
});
