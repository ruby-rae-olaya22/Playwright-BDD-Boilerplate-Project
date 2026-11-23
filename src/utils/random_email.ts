export function generateRandomEmail(domain: string = 'yopmail.com'): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `test_${timestamp}_${randomStr}@${domain}`;
}