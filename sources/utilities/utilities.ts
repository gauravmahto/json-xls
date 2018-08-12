/**
 * Copyright 2018 - Author gauravm.git@gmail.com
 */

/**
 * Logger instance.
 */
export const log = console;

/**
 * Interface to represent a program argument.
 */
export interface Argument {

  arg: string | undefined;
  val: string | undefined;

}

/**
 * Get the string version of the provided object.
 *
 * @param data The object.
 *
 * @return The string representing the object.
 */
export function getAsJSON(data: object): string {

  return JSON.stringify(data, null, 2);

}

/**
 * Get the arguments and it's values.
 * Usage: For e.g: The program arguments -> src=abc
 * Call: getArgKeyVal('src')
 * Returns: { arg: src, val: abc }
 *
 * @param name Name of the argument.
 * @param args The program arguments array.
 *
 * @return The Object containing arg and val properties.
 */
export function getArgKeyVal(name: string, args: string[]): Argument {

  name = (name + '=');

  const argKeyValObj: Argument = {
    arg: undefined,
    val: undefined
  };

  const argKeyVal: string | undefined = args.find((arg: string) => (arg.indexOf(name) === 0));

  if (typeof argKeyVal !== 'undefined') {

    const argKeyValArr = argKeyVal.split('=');

    if (argKeyValArr.length === 2) {

      argKeyValObj.arg = argKeyValArr[0];
      argKeyValObj.val = argKeyValArr[1];

    }

  }

  return argKeyValObj;

}
