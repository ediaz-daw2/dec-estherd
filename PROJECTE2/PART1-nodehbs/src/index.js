
const app = require('./app');

async function main(){
    await app.listen(2020);
    console.log('Server on port',2020);
}

main();