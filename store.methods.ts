export function withDataModelMethods() {
  return signalStoreFeature(
    { state: type<DataModelState>() },
    withMethods((store, mockupDataService = inject(ModelMockupService)) => {
      return {
        setSelectProduct: (product: ReturnFormProduct) => {
          patchState(store, returnFormSetters.setSelectProduct(store.returnForm, product)); // From helpers
        },
        loadDataModel: rxMethod<number>(
          pipe(
            distinctUntilChanged(),
            tap(() => patchState(store, { isLoading: true })),
            switchMap((id: number) =>
              // There should be real endpoint
              mockupDataService.getExample4(id).pipe(
                tapResponse({
                  next: data => {
                    console.log('Data initialized: ', data);
                    return patchState(store, setSuccessDataModel(data)); // From feature
                  },
                  error: (error: string) => {
                    console.error(error), patchState(store, setErrorDataModel(error)); // From feature
                  },
                  finalize: () => patchState(store, { isLoading: false }),
                })
              )
            )
          )
        ),
        createNewDataModel: rxMethod(
          pipe(
            distinctUntilChanged(),
            tap(() => patchState(store, { isLoading: true })),
            switchMap(() =>
              mockupDataService.createNewDataModel().pipe(
                tapResponse({
                  next: data => {
                    console.log('Data initialized: ', data);
                    return patchState(store, setSuccessDataModel(data)); // From feature
                  },
                  error: (error: string) => {
                    console.error(error), patchState(store, setErrorDataModel(error)); // From feature
                  },
                  finalize: () => patchState(store, { isLoading: false }),
                })
              )
            )
          )
        ),
      };
    })
  );
}
