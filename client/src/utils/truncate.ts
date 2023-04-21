function truncate(str: string, n = 30) {
  return str?.length > n ? str.slice(0, n - 1) + "..." : str;
}

export default truncate;
