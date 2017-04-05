#!/usr/bin/env bash

koralle -x
cat $( echo -e "$(schwamm --include=build/schwamm.json --output=list:lesscss)" ) | lessc - > build/less.css

mkdir -p build/templates
cp $( echo -e "$(schwamm --include=build/schwamm.json --output=list:templates)" ) build/templates/

