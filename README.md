# Reproduction of the issue in the class-validator package

## Steps

1. Install the class-validator package of version 0.13.2.
2. Import the `ValidationMetadata` class from `class-validator/types/metadata/ValidationMetadata`.
3. Run file using `ts-node`: `npx ts-node src/index.ts`

Error: 
```
Cannot find module 'class-validator/types/metadata/ValidationMetadata'
```