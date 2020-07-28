import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { LazyLoadAssets } from './lazy-load-assets.core';
import { LazyLoadAssetEnum } from './lazy-load-assets.enum';

type FactoryFunction = () => Promise<boolean>;

@NgModule({})
export class LazyLoadAssetsModule {
  constructor() {}

  static forRoot(): ModuleWithProviders<LazyLoadAssetsModule> {
    return {
      ngModule: LazyLoadAssetsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: LazyLoadAssetsModule.initializer,
          multi: true,
        },
      ],
    };
  }

  static initializer(): FactoryFunction {
    return async (): Promise<boolean> => {
      await LazyLoadAssets.load(LazyLoadAssetEnum.JQuery);
      await LazyLoadAssets.load(LazyLoadAssetEnum.Leaflet);
      return Promise.resolve(true);
    };
  }
}
