const https = require('https');
['amazonaws', 'docker', 'kubernetes', 'nodedotjs', 'postgresql', 'python'].forEach(icon => {
    https.get(`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${icon}.svg`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const match = data.match(/<path d="([^"]+)"/);
            if (match) console.log(`ICON_${icon.toUpperCase()} = "${match[1]}"`);
        });
    });
});
