export function withDataModelSelectors() {
  return signalStoreFeature(
    { state: type<DataModelState>() },
    withComputed(({ data, isLoading }) => ({
      products: computed(() => data().products),
      //...and so on to take more data from store
    }))
  );
}
