import browserify from 'browserify';
import chalk from 'chalk';
import cp from 'child_process';
import tsify from 'tsify';
import watchify from 'watchify';
import tinyify from 'tinyify';
import path from 'path';

export interface Options {
    output?: string; // Where to output bundled JXA file, default is current working dictionary
    watch?: boolean; // Whether to watch dependencies, default is false
    run?: boolean; // Whether to auto run it after output, default is false
    compress?: boolean; // Whether to compress output, default is false
    disk?: boolean; // Whether to write to disk, default is true
    dev?: boolean; // development mod, which is a shorthand for options `-rw --no-disk`, default is false
    prod?: boolean; // production mod, which is a shorthand for options `-c`, default is false
}
export interface Config {
    file: string;
    opts: Options;
}
// add some common JXA code on top and tail of the bundled file
const HEAD = `
window = this;
ObjC.import('stdlib');
try {
`;
const TAIL = `;
} catch (e) {
    console.log(e.message);
}
`;
const COMPILE_CMD = 'osacompile';
const RUN_CMD = 'osascript';
const CMD_ARGS = ['-l', 'JavaScript'];

// some common function
const log = (msg: string) => console.log(chalk.green(`[TS-JXA] ${msg}`));
const errLog = (msg: string) => console.error(chalk.red(`[TS-JXA] ${msg}`));
const autoRun = (code, args) => {
    const runProcess = cp.spawn(RUN_CMD, args, { stdio: [ 'pipe', 1, 2 ] }) as any;
    runProcess
        .on('exit', (exitCode, sigTerm) => {
            if (sigTerm) {
                errLog(`osascript process terminated by signal: ${sigTerm}`);
                process.exit(1);
            }
        });
    runProcess
        .on('error', error => {
            errLog(`RUN ERROR: ${error}`);
            process.exit(1);
        });
    runProcess.stdin.write(code);
    runProcess.stdin.end();
};
const bundle = (browserifyInstance, file: string, opts: Options = {}) => {
    log('bundling...');
    const { run, output, disk } = opts;
    const name = file.split('/')[file.split('/').length - 1].split('.')[0];
    browserifyInstance.bundle((err, buf) => {
        if (err) {
            errLog(`COMPILE ERROR: ${err}`);
            process.exit(1);
        }
        else {
            log('bundle succeed');
            let modifiedScriptCode = HEAD;
            modifiedScriptCode += buf.toString();
            modifiedScriptCode += TAIL;
            const outputPath = output ? path.resolve(output, `${name}.scpt`) : `${name}.scpt`;
            const compileArgs = [...CMD_ARGS, '-o', outputPath];
    
            if (run) autoRun(modifiedScriptCode, CMD_ARGS);
            if (disk) {
                const compileProcess = cp.spawn(COMPILE_CMD, compileArgs);
                compileProcess.stdin.write(modifiedScriptCode);
                compileProcess.stdin.end();
            }
        }
    });
};

const bootstrap = (file: string, opts: Options = {}) => {
    const { dev, prod } = opts;
    if (dev) {
        opts.run = true;
        opts.watch = true;
        opts.disk = false;
    }
    else if (prod) {
        opts.compress = true;
    }
    const { watch, compress } = opts;
    // init bundle
    const browserifyInstance = browserify()
        .add(file)
        .plugin(tsify);

    if (compress) {
        browserifyInstance.plugin(tinyify);
    }
    if (watch) {
        browserifyInstance.plugin(watchify);
        browserifyInstance.on('update', bundle.bind(this, browserifyInstance, file, opts));
    }

    // start bundling
    bundle(browserifyInstance, file, opts);
};

export default bootstrap;