#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { GlobalResourcesStack } from '../lib/global-resources-stack';
import { subdomainName } from '../lib/constants';

const app = new cdk.App();
const nVirginia = 'us-east-1';
const account = process.env.CDK_DEFAULT_ACCOUNT;
const globalResourcesStack = new GlobalResourcesStack(app, `${subdomainName}-global-resources-${nVirginia}`, {
  env: { region: nVirginia, account: account },
  crossRegionReferences: true
});

const stockholm = 'eu-north-1';
new InfraStack(app, `${subdomainName}-${stockholm}`, {
  env: { region: stockholm, account: account },
  certificate: globalResourcesStack.certificate,
  crossRegionReferences: true
});