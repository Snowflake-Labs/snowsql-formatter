# SnowSQL Formatter

A fork of [sql-formatter-plus](https://github.com/kufii/sql-formatter-plus) with some Snowflake specific syntaxes.

New Features:

- Recognize JSON references

**SQL Formatter** is a JavaScript library for pretty-printing SQL queries.
It started as a port of a [PHP Library][], but has since considerably diverged.
It supports [Standard SQL][], [Couchbase N1QL][], [IBM DB2][] and [Oracle PL/SQL][] dialects.

[Try the demo of the source of this fork.](https://kufii.github.io/sql-formatter-plus//)

## Install

Get the latest version from NPM:

```shell
npm install snowsql-formatter
```

## Usage

```javascript
import sqlFormatter from 'snowsql-formatter';

console.log(sqlFormatter.format('SELECT * FROM table1'));
```

This will output:

```sql
SELECT
  *
FROM
  table1
```

You can also pass in configuration options:

```javascript
sqlFormatter.format('SELECT *', {
  language: 'n1ql', // Defaults to "sql"
  indent: '    ', // Defaults to two spaces,
  uppercase: true, // Defaults to false
  linesBetweenQueries: 2 // Defaults to 1
});
```

Currently just four SQL dialects are supported:

- **sql** - [Standard SQL][]
- **n1ql** - [Couchbase N1QL][]
- **db2** - [IBM DB2][]
- **pl/sql** - [Oracle PL/SQL][]

### Placeholders replacement

```javascript
// Named placeholders
sqlFormatter.format("SELECT * FROM tbl WHERE foo = @foo", {
  params: {foo: "'bar'"}
}));

// Indexed placeholders
sqlFormatter.format("SELECT * FROM tbl WHERE foo = ?", {
  params: ["'bar'"]
}));
```

Both result in:

```sql
SELECT
  *
FROM
  tbl
WHERE
  foo = 'bar'
```

## Usage without NPM

If you don't use a module bundler, clone the repository, run `npm install` and grab a file from `/dist` directory to use inside a `<script>` tag.
This makes SQL Formatter available as a global variable `window.sqlFormatter`.

## Contributing

```shell
# run linter and tests
npm run check
```

...and you're ready to poke us with a pull request.

## Next Steps

- Add a `snowsql` dialect
- Add support for SnowSQL specific keywords and constructs

## License

[MIT](https://github.com/Snowflake-Labs/snowsql-formatter/blob/master/LICENSE)

[php library]: https://github.com/jdorn/sql-formatter
[standard sql]: https://en.wikipedia.org/wiki/SQL:2011
[couchbase n1ql]: http://www.couchbase.com/n1ql
[ibm db2]: https://www.ibm.com/analytics/us/en/technology/db2/
[oracle pl/sql]: http://www.oracle.com/technetwork/database/features/plsql/index.html
