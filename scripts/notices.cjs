const fs=require('node:fs');
const packages=['@capacitor/core','@capacitor/android','@capacitor/ios','@capacitor/app','@capacitor/filesystem','@capacitor/share'];
const blocks=packages.map(name=>`${name}\n${'='.repeat(name.length)}\n${fs.readFileSync(`node_modules/${name}/LICENSE`,'utf8').trim()}`);
fs.writeFileSync('THIRD_PARTY_NOTICES.txt','Amoeba Evolution — third-party notices\n\nThe Windows distribution also includes Electron LICENSE and LICENSES.chromium.html.\nNative projects retain their platform dependency notices.\n\n'+blocks.join('\n\n')+'\n');
console.log('Runtime license notices written.');
