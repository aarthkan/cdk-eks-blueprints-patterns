import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { Construct } from 'constructs';
import { aws_guardduty as guardduty } from 'aws-cdk-lib';
import { aws_securityhub as securityhub } from 'aws-cdk-lib';
/**
 * Stack the creates a GuradDuty detector with auditLogs for K8s enabled
 */
export class SecurityStack extends NestedStack {

    public static builder(): blueprints.NestedStackBuilder {
        return {
            build(scope: Construct, id: string, props: NestedStackProps) {
                return new SecurityStack(scope, id, props);
            }
        };
    }

    constructor(scope: Construct, id: string, props: NestedStackProps) {
        super(scope, id, props);

        const cfnDetector = new guardduty.CfnDetector(this, 'gdCfnDetector', {
            enable: true,

            dataSources: {
                kubernetes: {
                auditLogs: {
                    enable: true,
                },
                },
            },

            tags: [{
                key: 'eks-construct-type',
                value: 'starter',
            }],
            });

        const cfnSecurityHub = new securityhub.CfnHub(this, 'MyCfnHub', {
            tags: {
                key: 'eks-construct-type',
                value: 'starter',
            }
            });
    }
}