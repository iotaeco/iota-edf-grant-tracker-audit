# IOTA EcoSystem Development Fund Grant/Donation Tracker Audit

The code in this repository demonstrates how to use the audit data downloaded from the tracker.

The validation will iterate over the indexes and bundles and validates their RSA-SHA256 signatures using the [public.key](./public.key).

The documents referenced in the bundles are then downloaded from online storage and validated as well.

## Getting audit data

You must first obtain the audit data and public key from the tracker.

* [https://transparency.iota.org/audit](https://transparency.iota.org/audit)

Click the *Export Data* data button to download the data and *Public Key* to get the public key to verify the signatures.

## Running

To run the code just issue the following commands:

```shell
npm install
node index
```
