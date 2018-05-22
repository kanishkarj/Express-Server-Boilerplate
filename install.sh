#!/bin/bash

for word in "$@";
  do yarn add -D "@types/$word" && yarn add $word;
done
