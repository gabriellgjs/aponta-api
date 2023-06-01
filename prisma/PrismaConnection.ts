import { PrismaClient } from '@prisma/client';

export default class PrismaConnection extends PrismaClient {
  constructor() {
    super();
    this.onConnectionInit();
  }

  async onConnectionInit() {
    await this.$connect();
  }
}
