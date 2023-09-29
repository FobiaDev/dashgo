import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import { faker } from '@faker-js/faker'

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models:{
      user: Model.extend<Partial<User>>({
      })
    },

    factories:{
      user: Factory.extend({
        name(index){
          return `User ${index + 1}`
        },
        email(){
          return faker.internet.email().toLowerCase();
        },
        createdAt(){
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes(){
      this.namespace = 'mirageapi';
      this.timing = 750;

      this.get("/users", function (scheema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = scheema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd= pageStart + Number(per_page);

        const users = this.serialize(scheema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(
          200,
          {'x-total-count': String(total)},
          { users }
        )
      });
      this.post("/users");

      this.namespace = "";
      this.passthrough('http://localhost:3333/**')
    }
  })

  return server
}