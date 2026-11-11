export function winRate(wins: number, played: number): number {
  if (!Number.isInteger(wins) || !Number.isInteger(played)) {
    throw new RangeError('wins and played must be integers');
  }
  if (wins < 0 || played < 0) {
    throw new RangeError('wins and played must not be negative');
  }
  if (wins > played) {
    throw new RangeError('wins cannot exceed games played');
  }
  if (played === 0) {
    return 0;
  }
  return Math.round((wins / played) * 100);
}
