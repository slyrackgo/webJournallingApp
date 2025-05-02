// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { provideRouter, Routes } from '@angular/router';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';  // This import should now work
import { Router } from '@angular/router'
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter(serverRoutes),
      // Pass serverRoutes here
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
