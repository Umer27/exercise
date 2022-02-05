import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService extends ConfigService {
  constructor() {
    super();
  }

  get PORT(): number {
    return +this.get("PORT");
  }

  get NODE_ENV(): string {
    return this.get("NODE_ENV");
  }

  get APP_NAME(): string {
    return this.get("APP_NAME");
  }

  get JWT_SECRET(): string {
    return this.get("JWT_SECRET");
  }

}
