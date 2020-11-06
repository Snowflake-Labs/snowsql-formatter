import sqlFormatter from './../src/sqlFormatter';
import behavesLikeSqlFormatter from './behavesLikeSqlFormatter';
import dedent from 'dedent-js';

describe('Db2Formatter', () => {
  behavesLikeSqlFormatter('db2');

  const format = (query, cfg = {}) => sqlFormatter.format(query, { ...cfg, language: 'db2' });

  it('formats FETCH FIRST like LIMIT', () => {
    expect(format('SELECT col1 FROM tbl ORDER BY col2 DESC FETCH FIRST 20 ROWS ONLY;'))
      .toBe(dedent/* sql */ `
        SELECT
          col1
        FROM
          tbl
        ORDER BY
          col2 DESC
        FETCH FIRST
          20 ROWS ONLY;
      `);
  });

  it('formats only -- as a line comment', () => {
    const result = format(`
      SELECT col FROM
      -- This is a comment
      MyTable;
    `);
    expect(result).toBe(dedent/* sql */ `
      SELECT
        col
      FROM
        -- This is a comment
        MyTable;
    `);
  });

  it('recognizes @ and # as part of identifiers', () => {
    const result = format('SELECT col#1, @col2 FROM tbl');
    expect(result).toBe(dedent/* sql */ `
      SELECT
        col#1,
        @col2
      FROM
        tbl
    `);
  });

  it('recognizes :variables', () => {
    expect(format('SELECT :variable;')).toBe(dedent/* sql */ `
      SELECT
        :variable;
    `);
  });

  it('replaces :variables with param values', () => {
    const result = format('SELECT :variable', {
      params: { variable: '"variable value"' },
    });
    expect(result).toBe(dedent/* sql */ `
      SELECT
        "variable value"
    `);
  });
});
