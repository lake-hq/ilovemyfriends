export function getRoutes(
  stack: any[],
  basePath = "",
): {path: string; methods: string[]}[] {
  let routes: {path: string; methods: string[]}[] = [];

  stack.forEach(layer => {
    if (layer.route) {
      routes.push({
        path: basePath + layer.route.path,
        methods: Object.keys(layer.route.methods),
      });
    } else if (layer.name === "router" && layer.handle?.stack) {
      routes = routes.concat(getRoutes(layer.handle.stack, basePath));
    }
  });

  return routes;
}
