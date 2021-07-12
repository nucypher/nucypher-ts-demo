# nucypher-ts-demo

Based on [`useDapp` example](https://github.com/EthWorks/useDapp/tree/master/packages/example). See `README.old.md` for details.

## Notes:

Fixing `yarn` not recognizing local dependencies


First, we use a copy of `nucypher-ts` so that ill-resolved dependencies that point to location of original `nucypher-ts` can be resolved locally.

Then, after `yarn install` we fix a broken link to `nucypher-ts`:
```$bash
$ la node_modules/nucypher-ts
# link is broken, remove it
$ rm -rf node_modules/nucypher-ts
# replace is with a correct link
$ ln -s /some/path/nucypher-ts  node_modules/nucypher-ts
# ln -s /home/piotr/Documents/projects/nucypher/nucypher-ts-demo/packages/nucypher-ts node_modules/nucypher-ts
```