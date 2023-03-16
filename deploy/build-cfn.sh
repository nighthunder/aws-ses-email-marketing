#!/bin/bash

toolkit_stack_name=aws-ses-email-marketing-toolkit-stack
assets_bucket_name=aws-ses-email-marketing-us-east-1
assets_bucket_domain_name=$assets_bucket_name.s3.amazonaws.com
oaf_output_file_name=oaf.json
version=1.0.0

# Deploy toolkit stack
aws cloudformation deploy --stack-name $toolkit_stack_name --template-file bootstrap.yaml --parameter-overrides StagingBucket=$assets_bucket_name StagingBucketDomainName=$assets_bucket_domain_name --disable-rollback

# Deploy to oaf account in order to generate and copy the assets files
#cd ../iac
#rm -rf cdk.out
#cdk deploy --toolkit-stack-name $toolkit_stack_name --parameters Email=mayara-morais.santos@gft.com

#cp cdk.out/MainStack.template.json ../deploy/$oaf_output_file_name