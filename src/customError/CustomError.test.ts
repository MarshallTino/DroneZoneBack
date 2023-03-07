import CustomError from "./CustomError";

describe("Given a CreateError class", () => {
  describe("When a new CustomError is instanced with the message 'Endpoint not found', the statusCode '404', and the publicMessage'Page not found'", () => {
    const error = new CustomError("Endpoint not found", 404, "Page not found");
    test("Then it should have the property message with the value 'Endpoint not found'", () => {
      expect(error).toHaveProperty("message", "Endpoint not found");
    });
    test("Then it should have the property statusCode with the value '404'", () => {
      expect(error).toHaveProperty("statusCode", 404);
    });
    test("Then it should have the property publciMessage with the value 'Page not found'", () => {
      expect(error).toHaveProperty("publicMessage", "Page not found");
    });
  });
});
