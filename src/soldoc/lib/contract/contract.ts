export class Contract {
  public lines: string[];
  public pos: number;
  public offsets: object;
  constructor(text: string | string[]) {
    if (Array.isArray(text)) {
      this.lines = text;
    } else {
      this.lines = text.split('\n');
    }
    this.pos = 0;
    this.offsets = {};
  }

  reset(): void {
    this.pos = 0;
  }

  getLineCount(): number {
    return this.lines.length;
  }

  getPosition(): number {
    return this.pos;
  }

  setPosition(pos: number): void {
    this.pos = pos;
  }

  getNextLine(): string | null {
    if (this.pos >= this.lines.length) {
      return null;
    }
    return this.lines[this.pos++];
  }

  removeLine(pos: number): void {
    this.lines.splice(pos, 1);
  }

  removeLines(positions: number[]): void {
    positions.forEach((pos) => this.removeLine(pos));
  }

  calculateLine(line) {
    let currentOffset = this.offset(line);
    line += this.offset(line + currentOffset);
    return line;
  }

  insertLinesBeforeWithoutCalculatingAndAddingOffset(lines, line) {
    this.lines.splice(line, 0, ...lines);
  }

  insertLinesBeforeWithoutAddingOffset(lines, line) {
    this.insertLinesBeforeWithoutCalculatingAndAddingOffset(lines, line);
  }

  insertLinesBefore(lines, line) {
    let offsetLine = this.calculateLine(line);
    this.insertLinesBeforeWithoutAddingOffset(lines, offsetLine);
    this.addOffset(offsetLine, lines.length);
  }

  insertTextBefore(text, line) {
    let lines = text.split('\n');
    this.insertLinesBefore(lines, line);
  }

  getText(): string {
    return this.lines.join('\n');
  }

  getLineAt(pos: number): string {
    return this.lines[pos];
  }

  getOriginalLineAt(pos: number): string {
    return this.lines[pos + this.offset(pos)];
  }

  addOffset(line, offset) {
    this.offsets[line] = offset;
  }

  offset(line) {
    let offsetAmount = 0;
    for (let offset in this.offsets) {
      if (this.offsets.hasOwnProperty(offset)) {
        if (line >= offset) {
          offsetAmount += this.offsets[offset];
        }
      }
    }
    return offsetAmount;
  }
}
