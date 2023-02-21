export function buildRoutePath(path) {
  const routerParamatersRegex = /:([a-zA-Z]+)/g
  
  const pathWithParams = path.replaceAll(routerParamatersRegex, '(?<$1>[a-z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}`)

  return pathRegex
}