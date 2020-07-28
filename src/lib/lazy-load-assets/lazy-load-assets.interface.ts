export interface AssetReference {
    uri: string;
    async?: boolean;
    defer?: boolean;
}

export interface AssetDefinition {
  path: string;
  styles?: string[];
  scripts?: Array<string|AssetReference>;
  requireParams?: string[];
  requireQueryParams?: string[];
}

export interface UrlParams {
    [paramName: string]: string;
}

export interface UrlQueryParams {
    [paramName: string]: string;
}
