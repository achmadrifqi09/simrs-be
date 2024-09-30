import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>API SIMRS UMM</h1>
      <a href="https://cloudy-trinity-513663.postman.co/workspace/RSUMM-Workspace~cbc9b459-542d-4ede-8545-fe0126129163/collection/16098658-98932e42-aa50-41f1-90a2-cc6dc5ba4ad4?action=share&creator=16098658&active-environment=16098658-b5f88b3f-c5ff-490f-90e2-952fd7e6fa7a">Postman</a>
    `;
  }
}
