import { Module } from '@nestjs/common';
import { join } from 'path';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import {AppServerModule} from '../src/app/app.server.module'

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/recipe-book/browser')
    })
  ]
})
export class ApplicationModule {}
