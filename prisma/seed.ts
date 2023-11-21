import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roles = [
  {
    name: 'admin',
    description: 'Administrador(a)',
  },
  {
    name: 'tester',
    description: 'Testador(a)',
  },
  {
    name: 'dentist',
    description: 'Dentista',
  },
  {
    name: 'secretary',
    description: 'Secretário(a)',
  },
]

const user = {
  name: 'Gabriel José Silva',
  birthDate: '10/05/2002',
  rg: '14.862.714-8',
  email: 'contato.gabrieljosesilva1@gmail.com',
  password: '$2a$10$x.Me28CGWGlj0T/nf5AV/urvqzzTdExoU4WhPowymktXKdzRrwSFy',
  cpf: '077.862.978-10',
  maritalStatus: 'Solteiro (a)',
  gender: 'Masculino',
  hireDate: '16/11/2020',
  roleId: 1,
  address: {
    street: 'Rua Floresta',
    number: '50',
    district: 'Jardim Panorama',
    city: 'Altônia',
    postalCode: '87550-000',
    state: 'PR',
  },
  telephone: {
    telephoneNumber: '(44) 99873-9002',
  },
}

const user2 = {
  name: 'Gabriel José Silva',
  birthDate: '10/05/2002',
  rg: '14.862.714-8',
  email: 'gabriel_lisa@hotmail.com',
  password: '$2a$10$x.Me28CGWGlj0T/nf5AV/urvqzzTdExoU4WhPowymktXKdzRrwSFy',
  cpf: '077.862.977-10',
  maritalStatus: 'Solteiro (a)',
  gender: 'Masculino',
  hireDate: '16/11/2020',
  roleId: 1,
  address: {
    street: 'Rua Floresta',
    number: '50',
    district: 'Jardim Panorama',
    city: 'Altônia',
    postalCode: '87550-000',
    state: 'PR',
  },
  telephone: {
    telephoneNumber: '(44) 99873-9002',
  },
}

async function run() {
  await prisma.role.createMany({
    data: roles,
  })

  await prisma.people.create({
    data: {
      name: user.name,
      birthDate: user.birthDate,
      rg: user.rg,
      cpf: user.cpf,
      maritalStatus: user.maritalStatus,
      gender: user.gender,
      patient: {
        create: {
          status: 'ativo',
        },
      },
      address: {
        create: {
          street: user.address.street,
          number: user.address.number,
          district: user.address.district,
          city: user.address.city,
          postalCode: user.address.postalCode,
          state: user.address.state,
        },
      },
      telephone: {
        create: {
          telephoneNumber: user.telephone.telephoneNumber,
        },
      },
      employee: {
        create: {
          hireDate: user.hireDate,
          user: {
            create: {
              email: user.email,
              password: user.password,
              status: 'ativo',
              roleId: 1,
            },
          },
        },
      },
    },
  })
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
