/**
 * This example shows how to use ts-jxa as a function
 */
const path = require('path');
const { default: tsJxa } = require('../src/index.js');

tsJxa(path.resolve(__dirname, './index.ts'), {
    dev: true
});