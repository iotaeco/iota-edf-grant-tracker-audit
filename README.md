# IOTA EcoSystem Development Fund Grant/Donation Tracker Audit Data Validation

The code in this repository demonstrates how to use the audit data downloaded from the tracker and verify its integrity.

The verification will iterate over the indexes and bundles in the **./audit-data.json** file and verify the RSA-SHA256 signatures using the **./public.key** file.

The documents referenced in the bundles are then downloaded from online storage and their signature verified as well.

## Getting Audit Data and Public Key

You must first obtain the audit data and public key from the tracker.

* [https://transparency.iota.org/audit](https://transparency.iota.org/audit)

Click the *Export Data* button to download the audit data file and save it into **./audit-data.json**

 Click the *Public Key* button to download the public key file and save it into **./public.key**

## Running

First install the pre-requisite modules:

```shell
npm install or yarn install
```

Run the code by issuing the following command:

```shell
node index
```

You should see console output which displays the signatures in the index and bundles being verified, and then the documents being downloaded and their signatures verified.