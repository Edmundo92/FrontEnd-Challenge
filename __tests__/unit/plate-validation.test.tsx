import { MERCOSUL_VALIDATE_PLATE } from "../../src/validators/automobile-plate";

describe("Deve validar a expessão regular de validação", () => {
  test("A placa AAA2A33 deve retornat true", () => {
    const placa = MERCOSUL_VALIDATE_PLATE.test("AAA2A33");
    expect(placa).toBeTruthy();
  });
});
