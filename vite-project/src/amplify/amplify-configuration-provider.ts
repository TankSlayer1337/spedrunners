import { Amplify } from "aws-amplify";
import configuration from "./amplify-configuration";

// modified version of this: https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#set-up-backend-resources
export function configureAmplify(): void {
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  let userPoolId: string;
  let userPoolWebClientId: string;
  let redirect: string;
  let cognitoDomain: string;
  let apiScope: string;
  if (isLocalhost) {
    userPoolId = 'eu-north-1_tGJd16X8K';
    userPoolWebClientId = '1nlukckjtfc55b62j4enf4visk';
    redirect = 'http://localhost:5173';
    cognitoDomain = 'spedrunners-dev.auth.eu-north-1.amazoncognito.com';
    apiScope = 'https://dev.spedrunners.api.cloudchaotic.com/*';
  } else {
    userPoolId = 'eu-north-1_h2PE8AZIu';
    userPoolWebClientId = '2c55tfkc2o2dr510f1df1irnae';
    redirect = 'https://spedrunners.cloudchaotic.com';
    cognitoDomain = 'spedrunners-prod.auth.eu-north-1.amazoncognito.com';
    apiScope = 'https://prod.spedrunners.api.cloudchaotic.com/*';
  }

  const updatedAwsConfig = {
    ...configuration.Auth,
    userPoolId: userPoolId,
    userPoolWebClientId: userPoolWebClientId,
    cookieStorage: {
      ...configuration.Auth.cookieStorage,
      // TODO: this might need to get updated.
      domain: isLocalhost ? 'localhost' : configuration.Auth.cookieStorage.domain,
      secure: isLocalhost ? false : configuration.Auth.cookieStorage.secure
    },
    oauth: {
      ...configuration.Auth.oauth,
      scope: [
        'email',
        'profile',
        'openid',
        apiScope
      ],
      domain: cognitoDomain,
      redirectSignIn: redirect,
      redirectSignOut: redirect,
    }
  }

  Amplify.configure(updatedAwsConfig);
}