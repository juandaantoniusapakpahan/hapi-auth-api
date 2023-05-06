// Fungsi dari entitas RegisteredUser adalah untuk menampung data
// pengguna yang baru saja dimasukkan ke database.
// Data di dalamnya berupa id, username, dan fullname user

const RegisteredUser = require("../RegisteredUser.js");

describe("a RegisteredUser entities", () => {
  it("should throw error when payload did not contain neede property", () => {
    const payload = {
      username: "dicoding",
      fullname: "dicoding indonesia",
    };

    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specificatioin", () => {
    // Arrange
    const payload = {
      id: 123213,
      username: "sookaaa",
      fullname: "Dicoding Indonesia",
    };

    // Action & Assert
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should created registeredUser object correctly", () => {
    const payload = {
      id: "1234",
      username: "zoro",
      fullname: "zoro dono",
    };

    const { id, username, fullname } = new RegisteredUser(payload);
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
