/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

// Get JSON data.
export function getAsJSON(data: object): string {

  return JSON.stringify(data, null, 2);

}
