import { Command } from 'commander';

const args = new Command();
 args.option('-p <port>', 'port', 8080);
 args.option('--env <env>', 'environment', 'production');
 args.option("--persistence <pers>", "persistance", "mongo");

 args.parse();

 export default args.opts();