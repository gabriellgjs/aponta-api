import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roles = [
  {
    name: 'Administrador',
  },
  {
    name: 'Dentista',
  },
  {
    name: 'Secretário',
  },
]

const user = {
  name: 'Gabriel José Silva',
  birthDate: new Date(2002, 5, 10),
  rg: '14.862.714-8',
  email: 'contato.gabrieljosesilva@gmail.com',
  password: '$2a$10$x.Me28CGWGlj0T/nf5AV/urvqzzTdExoU4WhPowymktXKdzRrwSFy',
  cpf: '077.862.979-10',
  maritalStatus: 'Solteiro (a)',
  gender: 'Masculino',
  hireDate: new Date(2020, 11, 16),
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
          status: 'Ativo',
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
              status: 'Ativo',
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
