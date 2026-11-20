const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it ("Obteniendo error 200", async () => {
        const {status} = await request(server)
        .get("/cafes")
        expect(status).toBe(200)
    })

    it ("Obteniendo un objeto", async () => {
        const {body:producto} = await request(server)
        .get("/cafes").send ();
        expect(producto).toBeInstanceOf(Object)
    })

    it("Borrando id inexistente" , async () => {
        const jwt = "token"
        const {status} =await request(server)
        .delete("/cafes/7898")
        .set("Authorization", jwt)
        .send()
        expect(status).toBe(404)
    })

    it("Agregando contenido devuelve 201", async () => {
        const producto = {"id": "78","nombre":"especiado"}
        const {status} = await request(server)
        .post("/cafes")
        .send(producto)
        expect(status).toBe(201)
    })

    it("Actualizando contenido id erroneo devuelve 400", async () => {
        const producto = {"id": "78","nombre":"especiado"}
        const {status} = await request(server)
        .put("/cafes/2")
        .send(producto)
        expect(status).toBe(400)
    })
});
