/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

declare module NodeJS {

  interface Global {
    PROJECT_AFTER_BUILD_ROOT: string;
    PROJECT_DIST: string;
    PROJECT_ROOT: string;
    PROJECT_SOURCE_ROOT: string;
  }

}
