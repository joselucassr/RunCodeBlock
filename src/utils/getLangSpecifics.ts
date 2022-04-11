export function getRunCmd(lang: string): string | undefined {
  switch (lang) {
    case 'js':
      return 'node';
    case 'ts':
      return 'ts-node';
  }
}
