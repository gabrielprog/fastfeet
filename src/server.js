import server from './app';
import {port} from './config/configServer';

server.listen(port);
console.log(`Server init in port ${port}`);