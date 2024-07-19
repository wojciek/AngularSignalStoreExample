export function baseSetPending(): Partial<ModelStoreState> {
  return { isLoading: true };
}

export function baseSetSuccess(): Partial<ModelStoreState> {
  return { isLoading: false, errorMessage: '' };
}

export function baseSetError(error: string): Partial<ModelStoreState> {
  return { errorMessage: error, isLoading: false };
}

export function setPendingDataModel(): Partial<ModelStoreState> {
  return {...baseSetPending()}
}

export function setSuccessDataModel(data: DataModel): Partial<ModelStoreState> {
  return { ...baseSetSuccess(), data, id: data.id };
}

export function setErrorDataModel(error: string): Partial<ModelStoreState> {
  return { errorMessage: error, isLoading: false };
}
