export type DataModelState = {
  id: number | undefined;
  data: DataModel;
  isLoading: boolean;
  errorMessage: string;
};

export const DataModelStore = signalStore(
  withState<DataModelState>({ id: undefined, returnForm: new DataModel(), isLoading: false, errorMessage: '' }),
  withDataModelSelectors(),
  withDataModelMethods(),
  dataModelWithAdditionalData(),
  withCustomLogger('AdditionalInformationAddedToLoggerAsIdOrSth'),
  withHooks({
    onInit(store) {
      const dataModelIdToLoad = store.id();
      if (dataModelIdToLoad) {
        store.loadDataModel(dataModelIdToLoad);
      } else {
        store.createNewDataModel(null);
        //store.loadDataModel(dataModelIdToLoad);
      }
      // Load installers only if needed
      store.data.additionalDataRequired ?? store.loadAdditionalData(null);
      console.log('Store initialized');
      // Use it for logging changes or just use withHubLogger()
      // effect(() => {
      //   //const loadingService = inject(LoadingService);
      //   const state = getState(store);
      //   console.log(`${name} state changed`, state);
      //   // There we can put toast service or loding service.
      // });
    },
    onDestroy: store => console.log('Store destroyed', store),
  })
);
