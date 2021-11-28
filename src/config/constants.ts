// general constants
export const STAGE = process.env.STAGE || 'MISSING REQUIRED ENV VAR';
export const IS_OFFLINE =
  process.env.IS_OFFLINE !== undefined && process.env.IS_OFFLINE === 'true';
export const DEBUG = IS_OFFLINE;
export const API_VERSION = 'v1.0.0';
export const PROD = STAGE === 'prod';

// contract constants
export const WIZARDS = '0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42';

// env variables
export const WIZARD_DATA =
  process.env.WIZARD_DATA || 'MISSING REQUIRED ENV VAR';
export const AFFINITY_DATA =
  process.env.AFFINITY_DATA || 'MISSING REQUIRED ENV VAR';
export const TRAIT_DATA = process.env.TRAIT_DATA || 'MISSING REQUIRED ENV VAR';

// general constants
export const ONE_SECOND_MS = 1000;
