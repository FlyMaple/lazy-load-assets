import { AssetDefinition } from './lazy-load-assets.interface';
import { LazyLoadAssetEnum } from './lazy-load-assets.enum';

export const LazyLoadAsset: { [name: string]: AssetDefinition } = {
  [LazyLoadAssetEnum.Leaflet]: {
    path: 'leaflet',
    styles: ['leaflet.css'],
    scripts: ['leaflet.js'],
  },
  [LazyLoadAssetEnum.JQuery]: {
    path: 'jquery',
    styles: [],
    scripts: [
      {
        uri: 'jquery.min.js',
        async: true,
        defer: true,
      },
    ],
  },
  [LazyLoadAssetEnum.ExternalTabulator]: {
    path: '',
    styles: [
      'https://cdnjs.cloudflare.com/ajax/libs/tabulator/{version}/css/tabulator.min.css',
    ],
    scripts: [
      'https://cdnjs.cloudflare.com/ajax/libs/tabulator/{version}/js/tabulator.min.js',
    ],
    requireParams: ['version'],
    requireQueryParams: ['timestamp']
  },
  [LazyLoadAssetEnum.InternalTabulator]: {
    path: 'tabulator',
    styles: ['css/tabulator.min.css'],
    scripts: ['js/tabulator.min.js'],
  },
};
