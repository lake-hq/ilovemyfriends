export function getRoutes(app: any) {
  const routes: {path: string; methods: string[]}[] = [];

  // Express 5 moves the router stack to app.router or app._router depending on initialization
  const router = (app as any).router || (app as any)._router;

  if (router && router.stack) {
    router.stack.forEach((layer: any) => {
      if (layer.route) {
        // Direct routes on app (e.g., app.get('/'))
        routes.push({
          path: layer.route.path,
          methods: Object.keys(layer.route.methods).map(m => m.toUpperCase()),
        });
      } else if (
        layer.name === "router" &&
        layer.handle &&
        layer.handle.stack
      ) {
        // Router instances (e.g., app.use('/api', router))
        layer.handle.stack.forEach((subLayer: any) => {
          if (subLayer.route) {
            routes.push({
              path: subLayer.route.path,
              methods: Object.keys(subLayer.route.methods).map(m =>
                m.toUpperCase(),
              ),
            });
          }
        });
      }
    });
  }

  return routes;
}
