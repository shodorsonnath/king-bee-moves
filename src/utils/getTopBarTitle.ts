export function getTopBarTitle(pathname: string): string {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/total-user":
      return "Total User";
    case "/add-driver":
      return "Add Driver";
    case "/total-driver":
      return "Total Driver";
    default:
      return "Dashboard";
  }
}
