#!/bin/bash

rm -rf node_modules/nucypher-ts rust-umbral
mkdir -p node_modules
ln -s $(realpath ../nucypher-ts) node_modules/nucypher-ts
ln -s $(realpath ../nucypher-ts/rust-umbral) rust-umbral