const fs = require('fs');

try {
    if(!fs.existsSync('example.txt')) {
        throw new Error('Input file does not exist');
    }
    const data = fs.readFileSync('example.txt', 'utf-8')
    .split('\n')    
    .map(line => line.trim().replace(/\s+/g, ' '))
    .join('\n');

    fs.writeFileSync('example.txt', data);
    console.log('File cleaned successfully');
} catch (error) {
    console.error('Error:', error);
}