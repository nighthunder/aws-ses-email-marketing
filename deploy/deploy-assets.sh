#!/bin/bash

set -e

cd /Users/errs/Development/GFT/OAF/open-api-framework/apis

rm -rf node_modules/ build/

mkdir build

for d in */ ; do
	if [[ "$d" == *"oaf-"* ]]; then
		echo "$d"
		
		cd "$d"
		
		yarn prepare
		
		rm -rf build/ dist/ node_modules/
				
		yarn --modules-folder ../node_modules/ install --prod
		
		yarn --modules-folder ../node_modules/ run build
	  
		zip -r -q "../build/${d%*/}.zip" dist/
		
		cd /Users/errs/Development/GFT/OAF/open-api-framework/apis
  
		zip -r -q "build/${d%*/}.zip" node_modules/
		
		aws s3 cp "build/${d%*/}.zip" "s3://open-api-framework-assets/open-api-framework/1.0.0/functions/${d%*/}.zip" --acl public-read --cli-read-timeout=600 --output=text				
	
		#aws lambda  update-function-code --function-name "${d%*/}" --s3-bucket open-api-framework-assets --s3-key "open-api-framework/1.0.0/functions/${d%*/}.zip"
		
	fi

	cd /Users/errs/Development/GFT/OAF/open-api-framework/apis
done;

cd ../portals/sources/open-api-framework/ 

zip -r -q ../../../deploy/portals.zip . -x node_modules/ -x build/ -x package-lock.json -x package-lock.json

cd ../../../deploy

aws s3 cp portals.zip s3://open-api-framework-assets/open-api-framework/1.0.0/portals/portals.zip --acl public-read

