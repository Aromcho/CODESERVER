import { Command } from 'command';

const args = new Command();
 args.option('-p <port>', 'Port to run the server on', 8080);
 args.option('--env <env>', 'environment', 'production');
 args.option("")