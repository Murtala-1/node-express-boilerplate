var Service = require('node-windows').Service;

// Create a new service obj
var svc = new Service({
    name: "Bits-HIS",
    description: "Hospital Management Software",
    script: 'C:\hms\server\app.js'
});

svc.on('install', function(){
    svc.start();
});

svc.install();