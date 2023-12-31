export type Sensor = {
  index: number;
  id: string;
};

const generateSensors = (length: number): Sensor[] => {
  return Array.from({ length }, (_, i) => {
    // Generate a number between 65 (A) and 90 (Z)
    const char = String.fromCharCode(
      Math.floor(Math.random() * (90 - 65 + 1)) + 65
    );
    const num = Math.floor(Math.random() * 100);
    return {
      index: i,
      id: `${char}${num}`,
    };
  });
};

export default generateSensors;
