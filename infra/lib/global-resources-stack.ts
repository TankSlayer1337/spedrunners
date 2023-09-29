import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { apexDomain, hostedZoneId, subdomainName } from './constants';

export class GlobalResourcesStack extends cdk.Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, hostedZoneId, {
      domainName: apexDomain
    });

    this.certificate = new Certificate(this, 'Certificate', {
      certificateName: `${subdomainName}-certificate-${this.region}`,
      domainName: `${subdomainName}.${apexDomain}`,
      validation: CertificateValidation.fromDns(hostedZone)
    });
    this.certificate.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
  }
}