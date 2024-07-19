// SETTERS
const setDataModel = (data: DeepSignal<DataModel>, dataPartial: Partial<DataModel>): Partial<StoreModelState> => ({
  returnForm: { ...data(), ...dataPartial },
});

// REMOVERS
const removeProduct = (data: DeepSignal<DataModel>, productId: number): Partial<StoreModelState> => ({
  returnForm: { ...data(), products: [...data().products.filter(product => product.productId !== productId)] },
});

// GETTERS
const getAddress = (data: DeepSignal<DataModel>, addressType: AddressTypeEnum): StoreModelState | undefined =>
  data().addresses.find(address => address.addressType === addressType);


// EXPORTS ---
export const returnFormSetters = {
  setDataModel,
};

export const returnFormGetters = {
  getAddress,
};

export const returnFormRemovers = {
  removeProduct,
};
