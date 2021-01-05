// Type definitions taken from sql-formatter 2.3
// Definitions by: Jake Boone <https://github.com/jakeboone02>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace sqlFormatter;

declare namespace sqlFormatter {
    function format(
        query: string,
        cfg?: { language?: string; indent?: string; params?: { [x: string]: string } | string[] },
    ): string;
}

export default sqlFormatter;
