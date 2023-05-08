const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const AuthenticationTokenManager = require("../../security/AuthenticationTokenManager");
const RefreshAuthenticationUseCase = require("../RefreshAuthenticationUseCase");

describe("RefreshAuthenticationUseCase", () => {
  it("should throw an error when payload not contain needed property", async () => {
    // Arrange
    const useCasePayload = {};
    const refreshAuthUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    await expect(
      refreshAuthUseCase.execute(useCasePayload)
    ).rejects.toThrowError(
      "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN"
    );
  });
  it("should throw an error when payload not contain data type specification", async () => {
    // Arrange
    const userCasePaylaod = {
      refreshToken: 1234,
    };
    const refreshAuthUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    expect(refreshAuthUseCase.execute(userCasePaylaod)).rejects.toThrowError(
      "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should refresh token correctly", async () => {
    // Arrange

    const useCasePayload = {
      accessToken: "access_token",
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // Mocking
    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ username: "dicoding", id: "user-123" })
      );
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve("some_new_access_token"));

    const refreshAuthUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessToken = await refreshAuthUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken
    );
    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(
      useCasePayload.refreshToken
    );
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(
      useCasePayload.refreshToken
    );
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      username: "dicoding",
      id: "user-123",
    });
    expect(accessToken).toEqual("some_new_access_token");
  });
});
