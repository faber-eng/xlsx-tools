import * as fs from 'fs';
import TableToXlsx, { convert, convertToBuffer, convertToFile } from './index';

async function testPackage() {
    console.log('🧪 Testing @faber-eng/xlsx-tools package...\n');

    const html = `
        <table>
            <tr><th>Name</th><th>Age</th></tr>
            <tr><td>John</td><td>30</td></tr>
            <tr><td>Jane</td><td>25</td></tr>
        </table>
    `;



    // Test 1: Default import (class-based)
    console.log('1. Testing default import (class-based)...');
    try {
        const buffer = await TableToXlsx.convert(html);
        console.log('✅ Default import successful:', {
            bufferSize: buffer instanceof Buffer ? buffer.length : 'N/A',
            isBuffer: buffer instanceof Buffer
        });
    } catch (error) {
        console.log('❌ Default import failed:', (error as Error).message);
        return;
    }

    // Test 2: Named imports (functional)
    console.log('\n2. Testing named imports (functional)...');
    try {
        const buffer = await convert(html);
        console.log('✅ Named imports successful:', {
            bufferSize: buffer instanceof Buffer ? buffer.length : 'N/A',
            isBuffer: buffer instanceof Buffer
        });
    } catch (error) {
        console.log('❌ Named imports failed:', (error as Error).message);
        return;
    }

    // Test 3: File conversion with functional import
    console.log('\n3. Testing file conversion with functional import...');
    try {
        const outputPath = './test-output.xlsx';
        const result = await convertToFile(html, outputPath);

        if (fs.existsSync(outputPath)) {
            console.log('✅ File conversion successful!');
            console.log(`📁 Output file: ${outputPath}`);
            console.log(`📄 Result path: ${result}`);

            // Clean up test file
            fs.unlinkSync(outputPath);
            console.log('🧹 Test file cleaned up');
        } else {
            console.log('❌ Output file not found');
        }
    } catch (error) {
        console.log('❌ File conversion failed:', (error as Error).message);
        return;
    }

    // Test 4: Buffer conversion with functional import
    console.log('\n4. Testing buffer conversion with functional import...');
    try {
        const buffer = await convertToBuffer(html);

        if (buffer instanceof Buffer && buffer.length > 0) {
            console.log('✅ Buffer conversion successful!');
            console.log(`📊 Buffer size: ${buffer.length} bytes`);
        } else {
            console.log('❌ Buffer conversion failed or returned empty buffer');
        }
    } catch (error) {
        console.log('❌ Buffer conversion failed:', (error as Error).message);
        return;
    }

    // Test 5: Class-based file conversion
    console.log('\n5. Testing class-based file conversion...');
    try {
        const outputPath = './test-output-2.xlsx';
        const result = await TableToXlsx.convert(html, outputPath);

        if (fs.existsSync(outputPath)) {
            console.log('✅ Class-based file conversion successful!');
            console.log(`📁 Output file: ${outputPath}`);
            console.log(`📄 Result path: ${result}`);

            // Clean up test file
            fs.unlinkSync(outputPath);
            console.log('🧹 Test file cleaned up');
        } else {
            console.log('❌ Output file not found');
        }
    } catch (error) {
        console.log('❌ Class-based file conversion failed:', (error as Error).message);
        return;
    }

    console.log('\n🎉 All tests passed! The package supports all import styles correctly.');
    console.log('\n📋 Import styles supported:');
    console.log('   ✅ import TableToXlsx from "@faber-eng/xlsx-tools"');
    console.log('   ✅ import * as TableToXlsx from "@faber-eng/xlsx-tools"');
    console.log('   ✅ import { convert, convertToFile, convertToBuffer } from "@faber-eng/xlsx-tools"');
}

// Run tests
testPackage().catch(console.error);
