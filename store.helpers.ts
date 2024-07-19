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

export const setAddressToDelete = (data: DeepSignal<DataModel>, addressType: AddressTypeEnum, addressId?: number): DataModel => {
  const currentForm = data();
  return {
    ...currentForm,
    addresses: currentForm.addresses.map(address => ({
      ...address,
      delete: address.addressType === addressType && (addressId === undefined || address.id === addressId),
    })),
  };
};

export const getAddress = (returnForm: DeepSignal<DataModel>, addressType: AddressTypeEnum): DataModel | undefined =>
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
