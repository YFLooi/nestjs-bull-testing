// Ref: https://stackoverflow.com/a/68253049/10779988
export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};

export const mockedSuccessResponse = { ResData: { Response: 'OK-Success' } };
