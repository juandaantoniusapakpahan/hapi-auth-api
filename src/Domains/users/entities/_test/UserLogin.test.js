const UserLogin = require("../UserLogin");

describe("UserLogin verification payload", () => {
  it("should throw error when payload does not contain needed property", () => {
    // Arrange
    const loginPayload = {
      username: "dicoding",
    };

    // Action & Assert
    expect(() => new UserLogin(loginPayload)).toThrowError(
      "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload not meet data type specification", () => {
    // Arrange
    const loginPayload = {
      username: 123123,
      password: "dicoding",
    };

    // Actoin & Assert
    expect(() => new UserLogin(loginPayload)).toThrowError(
      "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });
  it("should create userlogin property correctly", () => {
    // Arrange
    const payload = {
      username: "dicoding",
      password: "12345",
    };

    // Action
    const userlogin = new UserLogin(payload);

    // Asser
    expect(userlogin).toBeInstanceOf(UserLogin);
    expect(userlogin.username).toEqual(payload.username);
    expect(userlogin.password).toEqual(payload.password);
  });
});
