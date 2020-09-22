import { OnboardPath } from '../ChatBot';

export const findPathIndexById = (
  id: number,
  onboardPaths: OnboardPath[],
): number | never => {
  const found = onboardPaths.findIndex((path): boolean => path.id === id);
  if (found === -1) {
    throw new Error(
      `Path (id ${id}) not found in: ${JSON.stringify(onboardPaths)}`,
    );
  }

  return found;
};
