export class ApiUrlProvider {
  private static apiUrl: string;

  public static getApiUrl(): string {
    return ApiUrlProvider.apiUrl ?? this.isLocalHost() ? 'https://dev.spedrunners.api.cloudchaotic.com' : 'https://prod.spedrunners.api.cloudchaotic.com';
  }

  static isLocalHost(): boolean {
    return Boolean(
      window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  }
}