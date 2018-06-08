const crypto = require("crypto");
const fs = require("fs");
const rp = require("request-promise-native");

async function validate(auditData, publicKey) {
    console.log("Validating Indexes");
    console.log("==================");
    console.log("");

    for (let i = 0; i < auditData.indexes.length; i++) {
        const indexData = auditData.indexes[i].index;
        const verifySig = indexData.sig;
        const hash = indexData.bundleHash;
        delete indexData.sig;
        delete indexData.bundleHash;
        delete indexData.transactionHashes;

        const dataToVerify = JSON.stringify(indexData);

        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(dataToVerify);
        const isValid = verifier.verify(publicKey, verifySig, "hex");
        if (isValid) {
            console.log(`Index ${hash} signature is verified`);
        } else {
            console.error(`Index ${hash} signature fails verification`);
        }

        for (let j = 0; j < indexData.bundles.length; j++) {
            if (auditData.grantDonations[indexData.bundles[j]]) {
                console.log(`\tBundle ${indexData.bundles[j]} is present`);
            } else {
                console.error(`\tBundle ${indexData.bundles[j]} is missing`);
            }
        }
        console.log("");
    }

    console.log("Validating Bundles");
    console.log("==================");
    console.log("");

    const keys = Object.keys(auditData.grantDonations);
    const documents = {};

    for (let k = 0; k < keys.length; k++) {
        console.log(`Bundle ${keys[k]}`);
        const bundle = auditData.grantDonations[keys[k]];
        const verifySig = bundle.sig;
        delete bundle.sig;
        delete bundle.bundleHash;
        delete bundle.transactionHashes;

        if (bundle.docs) {
            for (let d = 0; d < bundle.docs.length; d++) {
                documents[`${bundle.ecoId}/${bundle.docs[d].ts}_${bundle.docs[d].name}`] = bundle.docs[d].sig;
            }
        }

        const dataToVerify = JSON.stringify(bundle);

        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(dataToVerify);
        const isValid = verifier.verify(publicKey, verifySig, "hex");
        if (isValid) {
            console.log(`\tBundle signature is verified`);
        } else {
            console.error(`\tBundle signature fails verification`);
        }
        console.log("");
    }

    console.log("Validating Documents");
    console.log("====================");
    console.log("");

    const docKeys = Object.keys(documents);
    for (let x = 0; x < docKeys.length; x++) {
        const url = `${auditData.storageRoot}${docKeys[x]}`;
        console.log(`Downloading ${url}`);
        const file = await rp.get({
            url,
            encoding: null
        });

        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(file);
        const isValid = verifier.verify(publicKey, documents[docKeys[x]], "hex");
        if (isValid) {
            console.log(`\tDocument signature is verified`);
        } else {
            console.error(`\tDocument signature ${documents[docKeys[x]]} fails verification`);
        }
        console.log("");
    }
}

const publicKeyBuffer = fs.readFileSync("./public.key");
const publicKey = publicKeyBuffer.toString();

const auditDataBuffer = fs.readFileSync("./audit-data.json");
const auditData = JSON.parse(auditDataBuffer.toString());

validate(auditData, publicKey);
