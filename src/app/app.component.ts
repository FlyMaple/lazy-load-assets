import { Component } from '@angular/core';
import {
  LazyLoadAssets,
  LazyLoadAsset,
  LazyLoadAssetEnum,
} from '../lib/lazy-load-assets';
import Tabulator from 'tabulator-tables';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly environment = environment;

  constructor() {
    console.log(environment);
  }

  async loadTabulator(target: 'external' | 'internal'): Promise<void> {
    console.warn('load asset start');
    console.time('load');
    if (target === 'external') {
      await LazyLoadAssets.load(
        LazyLoadAssetEnum.ExternalTabulator,
        { version: '4.7.2' },
        {
          timestamp: Date.now().toString(),
        }
      );
    } else if (target === 'internal') {
      await LazyLoadAssets.load(
        LazyLoadAssetEnum.InternalTabulator,
        { version: '4.7.2' },
        {
          timestamp: Date.now().toString(),
        }
      );
    }
    console.warn('load asset end');
    console.timeEnd('load');
  }
}
