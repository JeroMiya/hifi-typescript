Customized lib.d.ts for QTScript environment
===============

This lib.d.ts is a modified version of the TypeScript lib.d.ts file specifically for use with the QTScript environment. It is not currently complete, but just enough to get the examples working.

To use, make sure to pass the --nolib option to the TypeScript compiler, and then explicitly reference this version of the lib.d.ts file before any other references (a _references.ts file is handy here). Otherwise, your scripts may fail to compile.

