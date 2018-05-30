# IOTA EcoSystem Development Fund Grant/Donation Tracker Audit

The code in this repository demonstrates how to use the audit data downloaded from the tracker.

The validation will iterate over the indexes and bundles and validates their RSA-SHA256 signatures using the [public.key](./public.key).

The documents referenced in the bundles are then downloaded from online storage and validated as well.

## Running

To run the code just issue the following command:

```shell
node index
```
