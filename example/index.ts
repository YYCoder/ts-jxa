/**
 * This example shows how to use ts-jxa as a command line interface
 */
import '@jxa/global-type';
import { log } from './other-module';
import { camelCase } from 'lodash';

/* 程序初始化 */
const app = Application.currentApplication();
app.includeStandardAdditions = true;

log('using other module');

app.displayAlert(camelCase('test_test'), {
    message: 'test test message'
});