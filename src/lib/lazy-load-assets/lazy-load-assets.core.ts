import {
  AssetDefinition,
  UrlParams,
  UrlQueryParams,
  AssetReference,
} from './lazy-load-assets.interface';
import { LazyLoadAsset } from './lazy-load-constants';
import { LazyLoadAssetEnum } from './lazy-load-assets.enum';

function attachDom(dom: any, selector: string = 'head'): Promise<any> {
  return new Promise((resolve, reject) => {
    dom.onload = dom.onreadystatechange = () => {
      const readyState = dom.readyState;
      if (!readyState || readyState === 'loaded' || readyState === 'complete') {
        dom.onreadystatechange = null;
        resolve(true);
      }
    };

    dom.onerror = reject;
    document.querySelector(selector).appendChild(dom);
  });
}

function loadCss(ref: AssetReference): Promise<any> {
  const dom = document.createElement('link');
  dom.rel = 'stylesheet';
  dom.href = ref.uri;
  return attachDom(dom);
}

function loadJs(ref: AssetReference): Promise<any> {
  const dom = document.createElement('script');
  dom.type = 'text/javascript';
  dom.src = ref.uri;
  dom.async = ref.async;
  dom.defer = ref.defer;
  return attachDom(dom, 'body');
}

class LazyLoadAssetsClass {
  private baseUrl: string;
  private assetLoaded: Map<AssetDefinition, boolean>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.assetLoaded = new Map();
  }

  private resolveUri(path: string, uri: string): string {
    return uri.includes('://') ? uri : `${this.baseUrl}/${path}/${uri}`;
  }

  private formatParamsUri(
    uri: string,
    requireParams: string[],
    params: UrlParams
  ): string {
    let fmtUri = uri;

    requireParams.forEach(
      (reqParam) => (fmtUri = fmtUri.replace(`{${reqParam}}`, params[reqParam]))
    );

    return fmtUri;
  }

  private formatQueryParamsUri(
    uri: string,
    requireQueryParams: string[],
    params: UrlQueryParams
  ): string {
    const queryParams = [];

    requireQueryParams.forEach((reqParam) =>
      queryParams.push(`${reqParam}=${params[reqParam]}`)
    );

    return `${uri}?${queryParams.join('&')}`;
  }

  private prepareUris(
    asset: AssetDefinition,
    rels: Array<string | AssetReference>,
    params: UrlParams,
    queryParams: UrlQueryParams
  ): AssetReference[] {
    return rels.map<AssetReference>((rel) => {
      const ref: AssetReference = { uri: '' };
      if (typeof rel === 'string') {
        ref.uri = this.resolveUri(asset.path, rel);
      } else {
        Object.assign(ref, rel, {
          uri: this.resolveUri(asset.path, rel.uri),
        });
      }

      if (asset.requireParams) {
        ref.uri = this.formatParamsUri(ref.uri, asset.requireParams, params);
      }

      if (asset.requireQueryParams) {
        ref.uri = this.formatQueryParamsUri(
          ref.uri,
          asset.requireQueryParams,
          queryParams
        );
      }

      return ref;
    });
  }

  async load(
    assetName: LazyLoadAssetEnum,
    urlParams: UrlParams = {},
    queryParams: UrlQueryParams = {}
  ): Promise<boolean> {
    const asset = LazyLoadAsset[assetName];

    if (this.assetLoaded.has(asset)) {
      return Promise.resolve(true);
    }

    const styles = this.prepareUris(
      asset,
      asset.styles,
      urlParams,
      queryParams
    );
    const scripts = this.prepareUris(
      asset,
      asset.scripts,
      urlParams,
      queryParams
    );

    for (const style of styles) {
      await loadCss(style);
    }

    for (const script of scripts) {
      await loadJs(script);
    }
    this.assetLoaded.set(asset, true);

    return Promise.resolve(true);
  }
}

export const LazyLoadAssets = new LazyLoadAssetsClass('/assets');
