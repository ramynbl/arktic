/**
 * Production entry point.
 * In development, the server starts from server/_core/index.ts via `tsx watch`.
 * In production (after build), esbuild bundles server/_core/index.ts into dist/index.js.
 * This file exists as a convenience re-export.
 */
export {} from "./_core/index";
