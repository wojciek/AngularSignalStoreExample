export interface AdditionalDataState {
  additionalData: Array<AdditionalData>;
  isLoading: boolean;
}

export interface AdditionalDataOptions {
  reset: boolean;
}

export function dataModelWithAdditionalData(options?: AdditionalDataOptions) {
  return signalStoreFeature(
    withState<AdditionalDataState>({ additionalData: [], isLoading: false }),
    withMethods((store, mockupDataService = inject(ModelMockupService)) => {
      //const httpClient = inject(HttpClient);
      const loadAdditionalDataSync = () => mockupDataService.getInstallerExamples();
      return {
        // Example of async loading
        loadInstallers: rxMethod(
          pipe(
            distinctUntilChanged(),
            tap(() => patchState(store, { isLoading: true })),
            switchMap(() => {
              return store.additionalData().length > 0
                ? of(store.additionalData())
                : mockupDataService.getAdditionalData().pipe(
                    tapResponse({
                      next: additionalData => {
                        console.log('Additional data initialized: ', additionalData);
                        return patchState(store, { isLoading: false, additionalData });
                      },
                      error: error => console.error(error),
                      finalize: () => patchState(store, { isLoading: false }),
                    })
                  );
            })
          )
        ),
        // Example of sync loading
        loadAdditionalDataSync() {
          loadAdditionalDataSync().subscribe(data => {
            console.log('Additional dta initialized initialized: ', data);
            return patchState(store, { isLoading: false, additionalData: data });
          });
        },
        loadAdditionalDataSync() {
          patchState(store, { additionalData: [], isLoading: false });
        },
      };
    })
  );
}
