
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Pruebas de integracion con servidor completo', () => {

    it('El endpoint POST /api/sessions/register debe registrar correctamente un usuario', async function () {
        const testUser = {
            first_name: 'Jorge',
            last_name: 'Jorge',
            email: 'jorge@correo.com',
            password: 'contraseña'
        }
        const response = await requester.post('/sessions/register')
            .field('first_name', testUser.first_name)
            .field('last_name', testUser.last_name)
            .field('email', testUser.email)
            .field('password', testUser.password)
            .attach('avatar', './test/OIP.jpg')
        expect(response.status).to.be.equal(200);

        const { _body } = response;
        expect(_body.message).to.be.equal('Registrado');
    })

    it('El endpoint GET /productos/ debe devolver a los videojuegos paginados', async function () {
        const response = await requester.get('/productos');
        expect(response.status).to.be.ok;

        const { _body } = response;
        console.log(_body);
        expect(_body.payload).to.be.ok;
    });


})
