#!/usr/bin/env node
import bootstrap from '../src/index';
import fs from 'fs';
import path from 'path';
import program from 'commander';
// file which need to be bundled absolute path
let file = '';

program
    .arguments('<file>')
    .action((f) => {
        const filePath = path.resolve(process.cwd(), f);
        if (filePath && fs.existsSync(filePath)) {
            file = filePath;
        } else {
            console.error('ERROR: missing entry file!');
            process.exit(1);
        }
    })
    .option(
        '--dev',
        'development mod, which is a shorthand for options `-rw --no-disk`, default is false',
        false
    )
    .option('--prod', 'production mod, which is a alias for options `-c`, default is false', false)
    .option('--no-disk', 'Whether not to write to disk, default is false', false)
    .option(
        '-o, --output <path>',
        'Where to output bundled JXA file, default is current working dictionary',
        process.cwd()
    )
    .option('-r, --run', 'Whether to auto run it after output, default is false', false)
    .option('-w, --watch', 'Whether to watch dependencies, default is false', false)
    .option('-c, --compress', 'Whether to compress output, default is false', false);
// start parsing input
program.parse(process.argv);
if (!file) {
    console.error('ERROR: missing entry file!');
    process.exit(1);
}

bootstrap(file, program.opts());