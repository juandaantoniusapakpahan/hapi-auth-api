const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const LogoutUserUseCase = require("../LogoutUserUseCase");

// The.rejects helper works like the .resolves helper.
// If the promise is fulfilled, the test will automatically fail

describe("LogoutUserUseCase", () => {
  it("should throw error when not contain refreshToken", async () => {
    // Arrange
    const logoutUserUseCase = new LogoutUserUseCase({}); // dummy
    const payload = { accessToken: "access" };

    // Action & Assert
    await expect(logoutUserUseCase.execute(payload)).rejects.toThrowError(
      "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN"
    );
  });
  it("should throw error when payload data type is not a string", async () => {
    // Arrange
    const logoutUserUseCase = new LogoutUserUseCase({}); // dummy
    const payload = {
      refreshToken: 1123,
    };

    // Action & Assert
    await expect(logoutUserUseCase.execute(payload)).rejects.toThrowError(
      "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });
  it("should orchestrating the delete authentication action correctly", async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockAuthenticationRepository.deleteToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Action
    await logoutUserUseCase.execute(useCasePayload);

    // Assert
    expect(
      mockAuthenticationRepository.checkAvailabilityToken
    ).toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith(
      useCasePayload.refreshToken
    );
  });
});
