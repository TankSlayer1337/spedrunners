import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { apexDomain, hostedZoneId, subdomainName } from './constants';

interface InfraStackProps extends cdk.StackProps {
  certificate: Certificate
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);
    
    const applicationUrl = `${subdomainName}.${apexDomain}`;

    const websiteBucket = new Bucket(this, 'WebsiteOriginBucket', {
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const hostedZone = HostedZone.fromLookup(this, hostedZoneId, {
      domainName: apexDomain
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `Origin Access Identity for ${subdomainName}.`
    });
    originAccessIdentity.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    websiteBucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, {
          originAccessIdentity: originAccessIdentity
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      domainNames: [applicationUrl],
      certificate: props.certificate,
      defaultRootObject: 'index.html'
    });

    new ARecord(this, 'CloudFrontARecord', {
      zone: hostedZone,
      recordName: subdomainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      ttl: cdk.Duration.seconds(0)  // TODO: reset to default?
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [Source.asset('../vite-project/dist')],
      destinationBucket: websiteBucket,
      distribution
    });
  }
}
