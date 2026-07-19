const path = require('path');
const fs = require('fs');
const solc = require('solc');

try {
    const contractPath = path.resolve(__dirname, '../contracts/ChainRecovery.sol');
    const source = fs.readFileSync(contractPath, 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            'ChainRecovery.sol': {
                content: source
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode']
                }
            }
        }
    };

    // Correct way to compile using the npm solc interface
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (output.errors) {
        output.errors.forEach(err => console.error(err.formattedMessage));
        if (output.errors.some(err => err.severity === 'error')) {
            throw new Error('Solidity compilation failed.');
        }
    }

    const contract = output.contracts['ChainRecovery.sol']['ChainRecovery'];

    if (!contract) {
        throw new Error("Could not find contract 'ChainRecovery' in compilation output.");
    }

    // Write the ABI to src/contracts/ChainRecovery.json
    const outDir = path.resolve(__dirname, '../src/contracts');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(path.join(outDir, 'ChainRecovery.json'), JSON.stringify(contract.abi, null, 2));
    console.log('✅ ABI written successfully to src/contracts/ChainRecovery.json');

} catch (error) {
    console.error('❌ Compilation Script Error:', error.message);
    process.exit(1);
}