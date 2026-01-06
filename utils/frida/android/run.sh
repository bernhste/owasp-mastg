#!/bin/bash

hookPath=$1
demoPath=$(pwd)
fridaScript=$(cat "$(dirname $0)"/base_script.js)

# create temporary work folder
randomNumber=$RANDOM
workDir=/tmp/frida_$randomNumber
mkdir $workDir


# copy relevant files temporary work folder
cp $hookPath $workDir
cp -rf ../../../../utils/frida/android/* $workDir

# compile the script in the work folder
cd $workDir
frida-compile $workDir/base_script.js -o $workDir/compiled_script.js

# run the compiled script
frida -U -f org.owasp.mastestapp -l $workDir/compiled_script.js -o  $demoPath/output.json

# cleanup
rm -rf $workDir