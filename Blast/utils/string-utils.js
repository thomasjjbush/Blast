const MAX_CHARACTERS = 16;
export default function truncate(string = '') {
  if (string.length > MAX_CHARACTERS) {
    return `${string.substring(0, MAX_CHARACTERS)}...`;
  }
  return string;
}
